import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import useAuthStore from "../stores/useAuthStore";
import Layout from "./Layout";
import "./Auth.css";

function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const authRegisterStore = useAuthStore((state) => state.register);
    const authUserStore = useAuthStore((state) => state.user);

    useEffect(() => {
        if (authUserStore) navigate("/perfil");
    }, [navigate, authUserStore]);

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== repeatPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        authRegisterStore(email, password);
    };

    return (
        <Layout className="auth">
            <form className="form" onSubmit={handleRegister}>
                <header className="form__header">
                    <h2>¿Una Mañana de Cafe?</h2>
                    <p>Únete a esta gran comunidad de amantes del café</p>
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
                        <input
                            type="password"
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                            placeholder="Repetir Contraseña"
                        />
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
            </form>
        </Layout>
    );
}

export default Register;
