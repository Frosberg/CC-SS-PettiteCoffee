import { Link } from "react-router";
import "./Header.css";

function Header(): React.ReactNode {
  return (
    <header className="header">
      <div className="header__logo">
        <h1 className="m-0">LE PETTITE COFFEE</h1>
      </div>
      <nav className="header__nav">
        <ul>
          <li>
            <Link to="/inicio">Inicio</Link>
          </li>
          <li>
            <Link to="/menus">Menús</Link>
          </li>
          <li>
            <Link to="/servicios">Servicios</Link>
          </li>
          <li>
            <Link to="/reseñas">Reseñas</Link>
          </li>
        </ul>
      </nav>
      <section className="header__actions">
        <Link className="link-outline" to="/shoppingcart">
          <i className="fa-solid fa-cart-shopping"></i>
        </Link>
        <Link className="link-outline" to="/login">
          UNIRME
        </Link>
      </section>
    </header>
  );
}

export default Header;
