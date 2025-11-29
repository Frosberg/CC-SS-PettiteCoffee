import Layout from "./Layout";
import "./CartBuy.css";
import { Link } from "react-router";
import CartStore from "../stores/CartStore";

function CartBuy() {
    const cart = CartStore((state) => state.cart);
    const total = CartStore((state) => state.total);
    const clearCart = CartStore((state) => state.clearCart);
    const removeFromCart = CartStore((state) => state.removeFromCart);
    const decreaseQuantity = CartStore((state) => state.decreaseQuantity);
    const addToCart = CartStore((state) => state.addToCart);

    return (
        <Layout className="wrapper">
            <div className="wrapper__container">
                <h2 className="wrapper__title">Carrito de Compra</h2>

                <article className="cartbuy">
                    <section className="cartbuy__products">
                        {cart.length === 0 ? (
                            <p>No tienes nada que comprar en este carrito</p>
                        ) : (
                            <>
                                {cart.map((item) => (
                                    <div
                                        key={item.customKey ?? item.codproducto}
                                        className="cartbuy__row"
                                    >
                                        <div className="cartbuy__info">
                                            <img
                                                src={item.imageUrl}
                                                alt={item.nombre}
                                                className="cartbuy__image"
                                            />
                                            <div className="cartbuy__details">
                                                <span className="cartbuy__name">{item.nombre}</span>
                                                {item.customizations &&
                                                    item.customizations.length > 0 && (
                                                        <ul className="cartbuy__customizations">
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
                                            </div>
                                        </div>

                                        <span className="cartbuy__price">
                                            S/ {item.precioventa.toFixed(2)}
                                        </span>

                                        <div className="cartbuy__quantity">
                                            <button
                                                onClick={() =>
                                                    decreaseQuantity(
                                                        item.codproducto,
                                                        item.customKey
                                                    )
                                                }
                                            >
                                                -
                                            </button>
                                            <span>{item.quantity.toString().padStart(2, "0")}</span>
                                            <button
                                                onClick={() =>
                                                    addToCart({
                                                        idProducto: item.idProducto,
                                                        codproducto: item.codproducto,
                                                        nombre: item.nombre,
                                                        precioventa: item.precioventa,
                                                        imageUrl: item.imageUrl,
                                                        customizations: item.customizations,
                                                        customKey: item.customKey,
                                                    })
                                                }
                                            >
                                                +
                                            </button>
                                        </div>

                                        <span className="cartbuy__subtotal">
                                            S/ {(item.precioventa * item.quantity).toFixed(2)}
                                        </span>

                                        <button
                                            className="cartbuy__remove"
                                            onClick={() =>
                                                removeFromCart(item.codproducto, item.customKey)
                                            }
                                        >
                                            x
                                        </button>
                                    </div>
                                ))}

                                <div className="cartbuy__summary">
                                    <h3>Total: S/ {total().toFixed(2)}</h3>
                                    <button onClick={clearCart} className="cartbuy__clear">
                                        Vaciar carrito
                                    </button>
                                </div>
                            </>
                        )}
                    </section>

                    <section className="cartbuy__actions">
                        <Link to="/menus">CONTINUAR COMPRANDO</Link>
                        <Link
                            to={cart.length === 0 ? "#" : "/payment"}
                            onClick={(e) => {
                                if (cart.length === 0) e.preventDefault();
                            }}
                            className={cart.length === 0 ? "cartbuy__pay--disabled" : ""}
                        >
                            IR A PAGAR
                        </Link>
                    </section>
                </article>
            </div>
        </Layout>
    );
}

export default CartBuy;
