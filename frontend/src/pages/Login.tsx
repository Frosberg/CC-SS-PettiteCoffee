import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useAuthStore from "../stores/useAuthStore";
import "./LoginRegister.css";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const authLoginStore = useAuthStore((state) => state.login);
    const authUserStore = useAuthStore((state) => state.user);
    const authErrorStore = useAuthStore((state) => state.error);

    useEffect(() => {
        if (authUserStore) navigate("/perfil");
    }, [navigate, authUserStore]);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        authLoginStore(email, password);
    };

    return (
        <>
            <main className="main__auth__hero">
                <Header />

                <section className="content_forms">
                    <form className="form" onSubmit={handleLogin}>
                        <div className="form__bg"></div>
                        <div className="form__content">
                            <header className="form__header">
                                <h2>INICIAR SESION</h2>
                                <p>Por favor ingresar su correo y contraseña</p>
                            </header>

                            <section className="form__content">
                                <div className="form__content__inputs">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Correo Electrónico"
                                    />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Contraseña"
                                    />
                                </div>

                                {authErrorStore && <p>{authErrorStore}</p>}

                                <a className="form__content__forgot" href="">
                                    ¿Has olvidado tu contraseña?
                                </a>

                                <div className="form__content__actions">
                                    <button className="btn-filled" type="submit">
                                        INICIAR SESIÓN
                                    </button>
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
