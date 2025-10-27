import { Link } from "react-router";
import "./Footer.css";

function Footer(): React.ReactNode {
    return (
        <footer className="footer">
            <div className="footer__container">
                <article className="footer__links">
                    <section>
                        <h6>Sobre nosotros</h6>
                        <ul>
                            <li>
                                <Link to="/aboutus#mission">Misión y Visión</Link>
                            </li>
                            <li>
                                <Link to="/reviews">Reseñas</Link>
                            </li>
                            <li>
                                <Link to="/aboutus#contact">Contáctanos</Link>
                            </li>
                        </ul>
                    </section>
                    <section>
                        <h6>Soporte</h6>
                        <ul>
                            <li>
                                <Link to="/aboutus#support">Reporte</Link>
                            </li>
                            <li>
                                <Link to="/#faq">Preguntas frecuentes</Link>
                            </li>
                        </ul>
                    </section>
                </article>
                <section className="footer__copyright">
                    Le Pettite Coffee @ 2025. Todos los derechos reservados
                </section>
            </div>
        </footer>
    );
}

export default Footer;
