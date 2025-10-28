import Layout from "./Layout";
import "./CartBuy.css";
import { Link } from "react-router";

function CartBuy() {
    return (
        <Layout className="wrapper">
            <div className="wrapper__container">
                <h2 className="wrapper__title">Carrito de Compra</h2>

                <article className="cartbuy">
                    <section className="cartbuy__products">
                        <p>No tienes nada que comprar en este carrito</p>
                    </section>
                    <section className="cartbuy__actions">
                        <Link to="/menus">CONTINUAR COMPRANDO</Link>
                        <Link to="/login">IR A PAGAR</Link>
                    </section>
                </article>
            </div>
        </Layout>
    );
}

export default CartBuy;
