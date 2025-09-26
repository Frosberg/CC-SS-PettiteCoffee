import { Link } from "react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "./LoginRegister.css";

function Register() {
  return (
    <>
      <main>
        <Header />

        <section className="content_forms">
          <form className="form">
            <div className="form__bg"></div>
            <div className="form__content">
              <header className="form__header">
                <h2>¿Una Mañana de Cafe?</h2>
                <p>Únete a esta gran comunidad de amantes del café</p>
              </header>

              <section className="form__content">
                <div className="form__content__inputs">
                  <input type="email" placeholder="Correo Electrónico" />
                  <input type="password" placeholder="Contraseña" />
                  <input type="password" placeholder="Repetir Contraseña" />
                </div>

                <ul className="form__content__requisitos">
                  <li>Mínimo 8 caracteres</li>
                  <li>Mayúsculas y Minúsculas</li>
                  <li>Símbolos y Números</li>
                </ul>

                <div className="form__content__actions">
                  <button className="btn-filled">QUIERO REGISTRARME</button>
                  <Link className="btn-outline" to="/login">
                    ESTOY REGISTRADO
                  </Link>
                </div>
              </section>
            </div>
          </form>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Register;
