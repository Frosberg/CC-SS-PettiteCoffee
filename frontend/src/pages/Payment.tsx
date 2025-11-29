import { type FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";
import Layout from "./Layout";
import "./Payment.css";
import CartStore from "../stores/CartStore";
import AuthStore from "../stores/AuthStore";
import { RequestNewPurchase } from "../api/PurchasesApi";

type PaymentState = "idle" | "processing";

type PaymentItem = {
    name: string;
    quantity: number;
    unitPrice: number;
};

type PaymentResult = {
    status: "approved" | "rejected";
    message: string;
    reference?: string | null;
    total: number;
    email?: string;
    address?: string;
    city?: string;
    items: PaymentItem[];
};

const createReference = () => `LEP-${Math.floor(Math.random() * 900000 + 100000)}`;

function Payment() {
    const navigate = useNavigate();
    const cart = CartStore((state) => state.cart);
    const total = CartStore((state) => state.total);
    const clearCart = CartStore((state) => state.clearCart);
    const isAuth = AuthStore((state) => state.isAuth);

    const [holder, setHolder] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState<PaymentState>("idle");

    const orderTotal = useMemo(() => total(), [total]);
    const serviceFee = useMemo(() => (orderTotal > 0 ? 2.5 : 0), [orderTotal]);
    const grandTotal = useMemo(() => orderTotal + serviceFee, [orderTotal, serviceFee]);

    const formatCardNumber = (value: string) =>
        value
            .replace(/\D/g, "")
            .slice(0, 16)
            .replace(/(\d{4})(?=\d)/g, "$1 ");

    const hasCheckedCartRef = useRef(false);

    useEffect(() => {
        if (hasCheckedCartRef.current) return;
        hasCheckedCartRef.current = true;

        if (!cart.length) {
            const payload: PaymentResult = {
                status: "rejected",
                message: "Tu carrito está vacío. Agrega algo delicioso antes de pagar.",
                reference: null,
                total: 0,
                email,
                address,
                city,
                items: [],
            };
            navigate("/payment-status", { state: payload, replace: true });
        }
    }, [cart.length, navigate, email, address, city]);

    const goToStatus = (payload: PaymentResult) => {
        navigate("/payment-status", { state: payload, replace: true });
    };

    const handlePay = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setState("processing");

        const delay = 1250 + Math.random() * 800;

        setTimeout(async () => {
            const items: PaymentItem[] = cart.map((item) => ({
                name: item.nombre,
                quantity: item.quantity,
                unitPrice: item.precioventa,
            }));

            let payload: PaymentResult;

            if (!cart.length) {
                payload = {
                    status: "rejected",
                    message: "Tu carrito está vacío. Agrega algo delicioso antes de pagar.",
                    reference: null,
                    total: grandTotal,
                    email,
                    address,
                    city,
                    items,
                };
            } else if (
                !holder ||
                cardNumber.replace(/\s/g, "").length < 16 ||
                !expiry ||
                cvv.length < 3
            ) {
                payload = {
                    status: "rejected",
                    message: "Revisa los datos de la tarjeta. Faltan completar algunos campos.",
                    reference: null,
                    total: grandTotal,
                    email,
                    address,
                    city,
                    items,
                };
            } else {
                payload = {
                    status: "approved",
                    message: "Pago aprobado. Tu pedido está por comenzar a tomar vida!",
                    reference: createReference(),
                    total: grandTotal,
                    email,
                    address,
                    city,
                    items,
                };

                if (isAuth) {
                    try {
                        await RequestNewPurchase({
                            montoProcesado: grandTotal,
                            productos: cart.map((item) => ({
                                idProducto:
                                    item.idProducto ?? Number.parseInt(item.codproducto, 10),
                                quantity: item.quantity,
                            })),
                            cityDelivery: city,
                            addressDelivery: address,
                        });
                    } catch {}
                }

                clearCart();
            }

            setState("idle");
            goToStatus(payload);
        }, delay);
    };

    return (
        <Layout className="wrapper payment">
            <div className="wrapper__container payment__grid">
                <div className="payment__intro">
                    <h2 className="wrapper__title payment__title">Completa tu pago</h2>
                    <p className="payment__copy">
                        En Le Pettite Coffee queremos que tu experiencia sea tan agradable como un
                        café recién servido. Aquí podrás completar el proceso y ver cómo se arma tu
                        pedido paso a paso.
                    </p>
                </div>

                <div className="payment__content">
                    <form className="payment__form" onSubmit={handlePay}>
                        <div className="payment__field">
                            <label htmlFor="holder">Nombre en la tarjeta</label>
                            <input
                                id="holder"
                                name="holder"
                                value={holder}
                                onChange={(e) => setHolder(e.target.value)}
                                placeholder="Como aparece en la tarjeta"
                                autoComplete="cc-name"
                            />
                        </div>

                        <div className="payment__field">
                            <label htmlFor="card">Número de tarjeta</label>
                            <input
                                id="card"
                                name="card"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                                placeholder="0000 0000 0000 0000"
                                inputMode="numeric"
                                autoComplete="cc-number"
                            />
                        </div>

                        <div className="payment__inline">
                            <div className="payment__field">
                                <label htmlFor="expiry">Vencimiento</label>
                                <input
                                    id="expiry"
                                    name="expiry"
                                    value={expiry}
                                    onChange={(e) => setExpiry(e.target.value.slice(0, 5))}
                                    placeholder="MM/AA"
                                    autoComplete="cc-exp"
                                />
                            </div>

                            <div className="payment__field">
                                <label htmlFor="cvv">CVV</label>
                                <input
                                    id="cvv"
                                    name="cvv"
                                    value={cvv}
                                    onChange={(e) =>
                                        setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
                                    }
                                    placeholder="***"
                                    inputMode="numeric"
                                    autoComplete="cc-csc"
                                />
                            </div>
                        </div>

                        <div className="payment__field">
                            <label htmlFor="address">Dirección de entrega</label>
                            <input
                                id="address"
                                name="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Calle, número, referencia"
                                autoComplete="street-address"
                            />
                        </div>

                        <div className="payment__field">
                            <label htmlFor="city">Ciudad</label>
                            <input
                                id="city"
                                name="city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder="Ciudad / Distrito"
                                autoComplete="address-level2"
                            />
                        </div>

                        <div className="payment__field">
                            <label htmlFor="email">Correo de comprobante</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="teavisamos@lepetite.pe"
                                autoComplete="email"
                            />
                        </div>

                        <div className="payment__actions">
                            <button
                                type="button"
                                className="payment__ghost"
                                onClick={() =>
                                    navigate("/payment-status", {
                                        state: {
                                            status: "rejected",
                                            message:
                                                "Has cancelado el proceso de pago. Puedes revisar tu carrito antes de continuar.",
                                            reference: null,
                                            total: grandTotal,
                                            email,
                                            address,
                                            city,
                                            items: cart.map((item) => ({
                                                name: item.nombre,
                                                quantity: item.quantity,
                                                unitPrice: item.precioventa,
                                            })),
                                        } as PaymentResult,
                                    })
                                }
                                disabled={state === "processing"}
                            >
                                Volver al carrito
                            </button>
                            <button type="submit" disabled={state === "processing"}>
                                {state === "processing" ? "Procesando..." : "Pagar ahora"}
                            </button>
                        </div>
                    </form>

                    <aside className="payment__summary">
                        <header className="payment__summary__header">
                            <p>Resumen del pedido</p>
                            <span>{cart.length} Comestibles</span>
                        </header>

                        <div className="payment__summary__items">
                            {cart.length === 0 ? (
                                <p className="payment__empty">Tu carrito está vacío.</p>
                            ) : (
                                cart.map((item) => (
                                    <div
                                        key={item.customKey ?? item.codproducto}
                                        className="payment__summary__item"
                                    >
                                        <div>
                                            <img
                                                className="payment__summary__image"
                                                src={item.imageUrl}
                                                alt={item.nombre}
                                            />
                                            <div>
                                                <p className="payment__summary__title">
                                                    {item.nombre}
                                                </p>
                                                {item.customizations &&
                                                    item.customizations.length > 0 && (
                                                        <ul className="payment__summary__customizations">
                                                            {item.customizations.map((custom) => (
                                                                <li
                                                                    key={`${item.codproducto}-${custom.id}`}
                                                                >
                                                                    <span>
                                                                        <strong>
                                                                            {custom.label}:{" "}
                                                                        </strong>
                                                                        {custom.value}
                                                                    </span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                <span className="payment__summary__meta">
                                                    x{item.quantity.toString().padStart(2, "0")}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="payment__summary__price">
                                            S/ {(item.precioventa * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="payment__summary__totals">
                            <div>
                                <span>Subtotal</span>
                                <span>S/ {orderTotal.toFixed(2)}</span>
                            </div>
                            <div>
                                <span>Tarifa de servicio</span>
                                <span>S/ {serviceFee.toFixed(2)}</span>
                            </div>
                            <div className="payment__summary__grand">
                                <span>Total</span>
                                <span>S/ {grandTotal.toFixed(2)}</span>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </Layout>
    );
}

export default Payment;
