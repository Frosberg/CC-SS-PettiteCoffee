import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import useAuthStore from "../stores/useAuthStore";
import Layout from "./Layout";
import "./Auth.css";

function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [idError, setIdError] = useState(0);
    const [repeatPassword, setRepeatPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const authRegisterStore = useAuthStore((state) => state.register);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) navigate("/perfil");
    }, [isAuthenticated]);

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return setIdError(3);
        if (password.length < 8) return setIdError(2);
        if (password !== repeatPassword) return setIdError(1);

        setIdError(0);
        setLoading(true);

        try {
            await authRegisterStore(email, password);
        } finally {
            setLoading(false);
        }
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
                            disabled={loading}
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Contraseña"
                            disabled={loading}
                        />
                        <input
                            type="password"
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                            placeholder="Repetir Contraseña"
                            disabled={loading}
                        />
                    </div>

                    <ul className="form__content__requisitos">
                        {idError === 1 && <li>Las contraseñas deben ser iguales</li>}
                        {idError === 2 && <li>La contraseña debe tener al menos 8 caracteres</li>}
                        {idError === 3 && <li>El correo no es válido</li>}
                    </ul>

                    <div className="form__content__actions">
                        <button className="btn-filled" disabled={loading}>
                            {loading ? "REGISTRANDO..." : "QUIERO REGISTRARME"}
                        </button>
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
