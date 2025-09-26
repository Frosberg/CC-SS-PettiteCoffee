import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router";
import "./LoginRegister.css";

function Login(): React.ReactNode {
  return (
    <>
      <main>
        <Header />

        <section className="content_forms">
          <form className="form">
            <div className="form__bg"></div>
            <div className="form__content">
              <header className="form__header">
                <h2>INICIAR SESION</h2>
                <p>Por favor ingresar su correo y contraseña</p>
              </header>

              <section className="form__content">
                <div className="form__content__inputs">
                  <input type="email" placeholder="Correo Electrónico" />
                  <input type="password" placeholder="Contraseña" />
                </div>

                <a className="form__content__forgot" href="">
                  ¿Has olvidado tu contraseña?
                </a>

                <div className="form__content__actions">
                  <button className="btn-filled">INICIAR SESION</button>
                  <Link className="btn-outline" to="/register">
                    NO ESTOY REGISTRADO
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

export default Login;
