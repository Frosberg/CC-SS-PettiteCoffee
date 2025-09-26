import "./Footer.css";

function Footer(): React.ReactNode {
  return (
    <footer className="footer">
      <article className="footer__links">
        <section>
          <h6>Sobre nosotros</h6>
          <ul>
            <li>
              <a href="#">Misión y Visión</a>
            </li>
            <li>
              <a href="#">Reseñas</a>
            </li>
            <li>
              <a href="#">Contáctanos</a>
            </li>
          </ul>
        </section>
        <section>
          <h6>Soporte</h6>
          <ul>
            <li>
              <a href="#">Reporte</a>
            </li>
            <li>
              <a href="#">Preguntas frecuentes</a>
            </li>
          </ul>
        </section>
      </article>
      <section className="footer__copyright">
        Le Pettite Coffee @ 2025. Todos los derechos reservados
      </section>
    </footer>
  );
}

export default Footer;
