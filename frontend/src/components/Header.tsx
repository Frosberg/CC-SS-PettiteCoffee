import { Link } from "react-router";
import "./Header.css";
import { Container, Nav, Navbar } from "react-bootstrap";

function Header() {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          LE PETTITE COFFEE
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Offcanvas placement="end">
          <Nav>
            <Nav.Link as={Link} to="/">
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/menus">
              Menús
            </Nav.Link>
            <Nav.Link as={Link} to="/servicios">
              Servicios
            </Nav.Link>
            <Nav.Link as={Link} to="/reseñas">
              Reseñas
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link className="nav-button" as={Link} to="/shoppingcart">
              <i className="fa-solid fa-cart-shopping"></i>
            </Nav.Link>
            <Nav.Link className="nav-button" as={Link} to="/login">
              UNIRME
            </Nav.Link>
          </Nav>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default Header;
