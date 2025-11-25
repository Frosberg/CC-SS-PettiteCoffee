import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import NavbarCanvas from "./NavbarCanvas";
import AuthStore from "../stores/AuthStore";
import "./Header.css";

const routesPaths = [
    { path: "/", name: "Inicio" },
    { path: "/menus", name: "Menús" },
    { path: "/reviews", name: "Reseñas" },
];

function Header() {
    const [show, setShow] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { pathname } = useLocation();

    const isAuth = AuthStore((state) => state.isAuth);
    const AuthUserStore = AuthStore((state) => state.user);
    const styleExpand = show ? "active" : "";

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`header ${isScrolled ? "scrolled" : ""}`}>
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
                        <Link to="/cartbuy">
                            <i className="fa-solid fa-cart-shopping"></i>
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
