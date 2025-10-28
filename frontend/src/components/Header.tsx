import { useState } from "react";
import { Link, useLocation } from "react-router";
import NavbarCanvas from "./NavbarCanvas";
import "./Header.css";
import useAuthStore from "../stores/useAuthStore";

const routesPaths = [
    {
        path: "/",
        name: "Inicio",
    },
    {
        path: "/menus",
        name: "Menús",
    },
    {
        path: "/services",
        name: "Servicios",
    },
    {
        path: "/reviews",
        name: "Reseñas",
    },
];

function Header() {
    const [show, setShow] = useState(false);
    const { pathname } = useLocation();

    const authUserStore = useAuthStore((state) => state.user);
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
                    <Link to="/cartbuy">
                        <i className="fa-solid fa-cart-shopping"></i>
                    </Link>
                    {authUserStore ? (
                        <Link to="/perfil">{authUserStore.email}</Link>
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
                        <Link to="/cartbuy">
                            <i className="fa-solid fa-cart-shopping"></i>
                        </Link>
                        {authUserStore ? (
                            <Link to="/perfil">{authUserStore.email}</Link>
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
