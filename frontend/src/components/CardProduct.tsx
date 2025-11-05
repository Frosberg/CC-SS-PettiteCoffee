import CartStore from "../stores/CartStore";
import "./CardProduct.css";

type Props = {
    image: string;
    title: string;
    price: number;
    codproducto: string;
};

function CardProduct({ image, title, price, codproducto }: Props) {
    const addToCart = CartStore((state) => state.addToCart);

    const handleAddToCart = () => {
        addToCart({
            codproducto,
            nombre: title,
            precioventa: price,
            imageUrl: image,
        });
    };

    return (
        <div className="card_products">
            <img className="card_products__image" src={image} alt={title} />
            <section className="card_products__content">
                <div className="card_products__price">
                    <span>Precio</span>
                    <span>S/ {price}</span>
                </div>
                <div className="card_products__title">
                    <h3>{title}</h3>
                    <button onClick={handleAddToCart}>
                        <i className="fa-solid fa-cart-shopping"></i>
                    </button>
                </div>
            </section>
        </div>
    );
}

export default CardProduct;
