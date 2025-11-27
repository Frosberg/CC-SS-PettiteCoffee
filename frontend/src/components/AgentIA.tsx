import { useEffect, useRef, useState, type FormEvent, type JSX } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import "./AgentIA.css";
import "@google/model-viewer";
import { RequestIAConsulta } from "../api/IAApi";
import CartStore from "../stores/CartStore";

type IAProduct = {
    codproducto: string;
    nombre: string;
    categoria?: string;
    precioventa: string | number;
    stock?: number;
};

type ChatMessage = {
    id: string;
    role: "user" | "assistant";
    content: string;
    products?: IAProduct[];
};

function getProductImage(product: IAProduct): string {
    return `http://localhost:8080/images/productos/${encodeURIComponent(product.codproducto)}.webp`;
}

function extractProductsFromAnswer(text: string): { cleanText: string; products?: IAProduct[] } {
    const regex = /```json([\s\S]*?)```/i;
    const match = text.match(regex);
    if (!match) return { cleanText: text };

    const jsonText = match[1].trim();
    try {
        const parsed = JSON.parse(jsonText);
        const arr: Product[] = Array.isArray(parsed) ? parsed : [parsed];
        const products = arr.filter(
            (p) => p && typeof p === "object" && typeof p.codproducto === "string"
        ) as IAProduct[];
        const cleanText = text.replace(match[0], "").trim();
        return { cleanText, products };
    } catch {
        return { cleanText: text };
    }
}

function renderFormattedText(text: string) {
    const parts: JSX.Element[] = [];
    const regex = /\*\*(.+?)\*\*/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    let key = 0;

    while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            parts.push(<span key={key++}>{text.slice(lastIndex, match.index)}</span>);
        }
        parts.push(<strong key={key++}>{match[1]}</strong>);
        lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
        parts.push(<span key={key++}>{text.slice(lastIndex)}</span>);
    }

    return parts;
}

function AgentIA() {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: "welcome",
            role: "assistant",
            content:
                "Hola, soy Pochi. ¿Cuentame como te encuentras? ¿En qué te gustaria que te ayude?",
        },
    ]);

    const [input, setInput] = useState("");
    const [isSending, setIsSending] = useState(false);
    const messagesRef = useRef<HTMLDivElement | null>(null);
    const muffinRef = useRef<any>(null);
    const addToCart = CartStore((state) => state.addToCart);

    useEffect(() => {
        const el = messagesRef.current;
        if (!el) return;
        el.scrollTop = el.scrollHeight;
    }, [messages]);

    useEffect(() => {
        const viewer = muffinRef.current;
        if (!viewer) return;

        function handleMouseMove(e: MouseEvent) {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;

            const baseAzimuth = 30;
            const basePolar = 100;

            const maxOffset = 35;
            const offsetAzimuth = maxOffset - x * (maxOffset * 2);
            const offsetPolar = maxOffset - y * (maxOffset * 2);

            const azimuth = baseAzimuth + offsetAzimuth;
            const polar = basePolar + offsetPolar;

            viewer.cameraOrbit = `${azimuth}deg ${polar}deg`;
        }

        window.addEventListener("mousemove", handleMouseMove as any);
        return () => window.removeEventListener("mousemove", handleMouseMove as any);
    }, []);

    const handleSend = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const text = input.trim();
        if (!text || isSending) return;

        const userMessage: ChatMessage = {
            id: `${Date.now()}-user`,
            role: "user",
            content: text,
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsSending(true);

        const res = await RequestIAConsulta(text);
        let answer = "Lo siento, no pude procesar tu consulta en este momento.";

        if (res.ok) {
            const data = res.data;
            if (typeof data === "string") answer = data;
            else if (data) answer = data.respuesta || data.answer || data.message || answer;
        }

        const { cleanText, products } = extractProductsFromAnswer(answer);

        const assistantMessage: ChatMessage = {
            id: `${Date.now()}-assistant`,
            role: "assistant",
            content: cleanText,
            products,
        };

        setMessages((prev) => [...prev, assistantMessage]);
        setIsSending(false);
    };

    const handleAddProductToCart = (product: IAProduct) => {
        const rawPrice = product.precioventa;
        const price =
            typeof rawPrice === "number"
                ? rawPrice
                : Number.parseFloat(rawPrice.replace(/[^\d.,]/g, "").replace(",", "."));

        const imageUrl = getProductImage(product);

        addToCart({
            codproducto: product.codproducto,
            nombre: product.nombre,
            precioventa: Number.isFinite(price) ? price : 0,
            imageUrl,
        });
    };

    const popover = (
        <Popover className="agentia__popover">
            <Popover.Header as="h3">Tu Querido Asistente POCHI</Popover.Header>
            <Popover.Body>
                <div className="agentia__chat">
                    <div className="agentia__messages" ref={messagesRef}>
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`agentia__bubble agentia__bubble--${msg.role}`}
                            >
                                {msg.content && <p>{renderFormattedText(msg.content)}</p>}

                                {msg.role === "assistant" &&
                                    msg.products &&
                                    msg.products.length > 0 && (
                                        <div className="agentia__products">
                                            {msg.products.map((product, index) => (
                                                <div
                                                    key={`${product.codproducto}-${index}`}
                                                    className="agentia__product-card"
                                                >
                                                    <img
                                                        src={getProductImage(product)}
                                                        alt={product.nombre}
                                                        className="agentia__product-image"
                                                    />
                                                    <div className="agentia__product-info">
                                                        <p className="agentia__product-name">
                                                            {product.nombre}
                                                        </p>
                                                        <p className="agentia__product-price">
                                                            {typeof product.precioventa === "number"
                                                                ? `S/ ${product.precioventa.toFixed(
                                                                      2
                                                                  )}`
                                                                : product.precioventa}
                                                        </p>
                                                        <button
                                                            type="button"
                                                            className="agentia__product-add"
                                                            onClick={() =>
                                                                handleAddProductToCart(product)
                                                            }
                                                        >
                                                            Agregar al carrito
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                            </div>
                        ))}
                    </div>

                    <form className="agentia__form" onSubmit={handleSend}>
                        <input
                            className="agentia__input"
                            placeholder="Escribe tu mensaje..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />

                        <button className="agentia__send" type="submit" disabled={isSending}>
                            {isSending ? "Enviando..." : "Enviar"}
                            <i className="fa-solid fa-paper-plane"></i>
                        </button>
                    </form>
                </div>
            </Popover.Body>
        </Popover>
    );

    return (
        <div className="agentia">
            <OverlayTrigger trigger="click" placement="top" overlay={popover} rootClose>
                <button className="agentia__launcher" aria-label="Abrir asistente virtual">
                    <div
                        className="agentia__model"
                        onClick={() => {
                            const el = muffinRef.current.parentElement;
                            el.classList.add("pop");
                            setTimeout(() => el.classList.remove("pop"), 180);
                        }}
                    >
                        <model-viewer
                            ref={muffinRef}
                            src="assets/Muffin.glb"
                            shadow-intensity="0"
                        ></model-viewer>
                    </div>
                </button>
            </OverlayTrigger>
        </div>
    );
}

export default AgentIA;
