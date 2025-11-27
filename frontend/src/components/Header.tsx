import { useState } from "react";
import { Link, useLocation } from "react-router";
import NavbarCanvas from "./NavbarCanvas";
import AuthStore from "../stores/AuthStore";
import CartStore from "../stores/CartStore";
import "./Header.css";

const routesPaths = [
    { path: "/", name: "Inicio" },
    { path: "/menus", name: "Menús" },
    { path: "/reviews", name: "Reseñas" },
];

function Header() {
    const [show, setShow] = useState(false);
    const { pathname } = useLocation();

    const isAuth = AuthStore((state) => state.isAuth);
    const AuthUserStore = AuthStore((state) => state.user);
    const cartItems = CartStore((state) => state.cart);
    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const styleExpand = show ? "active" : "";

    return (
        <header className="header">
            <div className="header__container">
                <h1 className="header__title">
                    <Link to="/">LE PETTITE COFFEE</Link>
                </h1>

                <nav className={`header__navbar ${styleExpand}`}>
                    <ul>
                        {routesPaths.map((route) => (
                            <li
                                key={route.path}
                                className={pathname === route.path ? "active" : ""}
                            >
                                <Link to={route.path}>{route.name}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className={`header__actions ${styleExpand}`}>
                    <Link to="/cartbuy" className="header__cart">
                        <i className="fa-solid fa-cart-shopping"></i>
                        {cartCount > 0 && (
                            <span className="header__cart-badge">
                                {cartCount > 99 ? "99+" : cartCount}
                            </span>
                        )}
                    </Link>
                    {isAuth && AuthUserStore ? (
                        <Link to="/perfil">{AuthUserStore.email}</Link>
                    ) : (
                        <Link to="/login">UNIRME</Link>
                    )}
                </div>

                <div className="header__canvas">
                    <button onClick={() => setShow(true)}>
                        <i className="fa-solid fa-bars"></i>
                    </button>

                    <NavbarCanvas
                        show={show}
                        setShow={setShow}
                        routesPaths={routesPaths}
                        pathname={pathname}
                    >
                        <Link to="/cartbuy" className="header__cart">
                            <i className="fa-solid fa-cart-shopping"></i>
                            {cartCount > 0 && (
                                <span className="header__cart-badge">
                                    {cartCount > 99 ? "99+" : cartCount}
                                </span>
                            )}
                        </Link>
                        {isAuth && AuthUserStore ? (
                            <Link to="/perfil">{AuthUserStore.email}</Link>
                        ) : (
                            <Link to="/login">UNIRME</Link>
                        )}
                    </NavbarCanvas>
                </div>
            </div>
        </header>
    );
}

export default Header;
