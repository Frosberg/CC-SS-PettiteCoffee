import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import CartStore from "../stores/CartStore";
import "./CardProduct.css";

type Props = {
    image: string;
    title: string;
    price: number;
    codproducto: string;
    idProducto: number;
    category?: string;
};

type CustomizationField = {
    id: string;
    label: string;
    options: { label: string; value: string }[];
};

type CustomizationSelections = Record<string, string>;

const CUSTOMIZATION_FIELDS: Record<string, CustomizationField[]> = {
    novedosos: [
        {
            id: "sugarLevel",
            label: "Nivel de azúcar",
            options: [
                { value: "Sin azúcar", label: "Sin azúcar" },
                { value: "Ligero", label: "Poco dulce" },
                { value: "Balanceado", label: "Dulzor medio" },
                { value: "Intenso", label: "Extra dulce" },
            ],
        },
        {
            id: "coffeeIntensity",
            label: "Intensidad del café",
            options: [
                { value: "Suave", label: "Suave" },
                { value: "Medio", label: "Medio" },
                { value: "Fuerte", label: "Fuerte" },
            ],
        },
    ],
    cafes: [
        {
            id: "milkType",
            label: "Tipo de leche",
            options: [
                { value: "Entera", label: "Entera" },
                { value: "Deslactosada", label: "Deslactosada" },
                { value: "Vegetal", label: "Vegetal" },
            ],
        },
        {
            id: "temperature",
            label: "Temperatura",
            options: [
                { value: "Caliente", label: "Caliente" },
                { value: "Tibia", label: "Tibia" },
                { value: "Fría", label: "Fría" },
            ],
        },
    ],
    tortas: [
        {
            id: "portion",
            label: "Tamaño de porción",
            options: [
                { value: "Personal", label: "Personal" },
                { value: "Mediana", label: "Mediana" },
                { value: "Familiar", label: "Familiar" },
            ],
        },
        {
            id: "topping",
            label: "Topping favorito",
            options: [
                { value: "Frutos rojos", label: "Frutos rojos" },
                { value: "Chocolate", label: "Chocolate" },
                { value: "Sin topping", label: "Sin topping" },
            ],
        },
    ],
    muffins: [
        {
            id: "glaze",
            label: "Glaseado",
            options: [
                { value: "Vainilla", label: "Vainilla" },
                { value: "Caramelo", label: "Caramelo" },
                { value: "Sin glaseado", label: "Sin glaseado" },
            ],
        },
        {
            id: "texture",
            label: "Textura deseada",
            options: [
                { value: "Recién horneado", label: "Recién horneado" },
                { value: "Tostado", label: "Tostado" },
                { value: "Suave", label: "Suave" },
            ],
        },
    ],
    pasteles: [
        {
            id: "filling",
            label: "Relleno",
            options: [
                { value: "Crema pastelera", label: "Crema pastelera" },
                { value: "Manjar", label: "Manjar" },
                { value: "Frutas", label: "Frutas" },
            ],
        },
        {
            id: "decor",
            label: "Decoración",
            options: [
                { value: "Merengue", label: "Merengue" },
                { value: "Cacao", label: "Cacao" },
                { value: "Azúcar glass", label: "Azúcar glass" },
            ],
        },
    ],
    panes: [
        {
            id: "toastLevel",
            label: "Nivel de tostado",
            options: [
                { value: "Suave", label: "Suave" },
                { value: "Medio", label: "Medio" },
                { value: "Crujiente", label: "Crujiente" },
            ],
        },
        {
            id: "fillingOption",
            label: "Acompañamiento",
            options: [
                { value: "Mantequilla", label: "Mantequilla" },
                { value: "Mermelada", label: "Mermelada" },
                { value: "Jamón y queso", label: "Jamón y queso" },
            ],
        },
    ],
    default: [
        {
            id: "size",
            label: "Tamaño",
            options: [
                { value: "Personal", label: "Personal" },
                { value: "Compartir", label: "Para compartir" },
            ],
        },
        {
            id: "presentation",
            label: "Presentación",
            options: [
                { value: "Clásica", label: "Clásica" },
                { value: "Premium", label: "Premium" },
            ],
        },
    ],
};

const buildEmptySelections = (fields: CustomizationField[]) =>
    fields.reduce<CustomizationSelections>((acc, field) => {
        acc[field.id] = "";
        return acc;
    }, {});

function CardProduct({ image, title, price, codproducto, idProducto, category }: Props) {
    const addToCart = CartStore((state) => state.addToCart);
    const normalizedCategory = (category || "novedosos").toLowerCase();
    const customizationFields = useMemo(
        () => CUSTOMIZATION_FIELDS[normalizedCategory] || CUSTOMIZATION_FIELDS.default,
        [normalizedCategory]
    );

    const [customValues, setCustomValues] = useState<CustomizationSelections>(() =>
        buildEmptySelections(customizationFields)
    );
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setCustomValues(buildEmptySelections(customizationFields));
    }, [customizationFields]);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCustomValues(buildEmptySelections(customizationFields));
    };

    const handleSelectionChange = (fieldId: string, value: string) => {
        setCustomValues((prev) => ({ ...prev, [fieldId]: value }));
    };

    const handleAddToCart = () => {
        const missing = customizationFields.filter((field) => !customValues[field.id]);

        if (missing.length > 0) {
            alert("Por favor, selecciona todos los adicionales para continuar.");
            return;
        }

        addToCart({
            idProducto,
            codproducto,
            nombre: title,
            precioventa: price,
            imageUrl: image,
            customizations: customizationFields.map((field) => ({
                id: field.id,
                label: field.label,
                value: customValues[field.id],
            })),
        });

        handleCloseModal();
    };

    const categoryLabel =
        normalizedCategory.charAt(0).toUpperCase() + normalizedCategory.slice(1).replace(/-/g, " ");

    const modalContent = (
        <div className="card_products__modal-backdrop" onClick={handleCloseModal}>
            <div
                className="card_products__modal"
                onClick={(event) => event.stopPropagation()}
                role="dialog"
                aria-modal="true"
            >
                <button
                    type="button"
                    className="card_products__modal-close"
                    aria-label="Cerrar personalización"
                    onClick={handleCloseModal}
                >
                    <i className="fa-solid fa-xmark"></i>
                </button>
                <h4 className="card_products__modal-title">Personaliza tu {categoryLabel}</h4>
                <p className="card_products__modal-subtitle">
                    Elige los adicionales para <strong>{title}</strong> antes de enviarlo al
                    carrito.
                </p>

                <div className="card_products__modal-fields">
                    {customizationFields.map((field) => (
                        <div key={field.id} className="card_products__modal-field">
                            <span>{field.label}</span>
                            <div className="card_products__modal-options" role="radiogroup">
                                {field.options.map((option) => {
                                    const isActive = customValues[field.id] === option.value;
                                    return (
                                        <label
                                            key={option.value}
                                            className={`card_products__modal-option${
                                                isActive ? " is-active" : ""
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                name={`custom-${field.id}-${codproducto}`}
                                                value={option.value}
                                                checked={isActive}
                                                onChange={() =>
                                                    handleSelectionChange(field.id, option.value)
                                                }
                                            />
                                            <span>{option.label}</span>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="card_products__modal-actions">
                    <button
                        type="button"
                        className="card_products__modal-btn card_products__modal-btn--ghost"
                        onClick={handleCloseModal}
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        className="card_products__modal-btn card_products__modal-btn--confirm"
                        onClick={handleAddToCart}
                    >
                        Agregar al carrito
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <div className="card_products">
                <img className="card_products__image" src={image} alt={title} />
                <section className="card_products__content">
                    <div className="card_products__price">
                        <span>Precio</span>
                        <span>S/ {price}</span>
                    </div>
                    <div className="card_products__title">
                        <h3>{title}</h3>
                        <button
                            type="button"
                            onClick={handleOpenModal}
                            aria-label="Personalizar pedido"
                        >
                            <i className="fa-solid fa-plus"></i>
                        </button>
                    </div>
                </section>
            </div>

            {isModalOpen &&
                (typeof document !== "undefined"
                    ? createPortal(modalContent, document.body)
                    : modalContent)}
        </>
    );
}

export default CardProduct;
