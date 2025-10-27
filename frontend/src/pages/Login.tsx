import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import useAuthStore from "../stores/useAuthStore";
import Layout from "./Layout";
import "./Auth.css";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingRecovery, setLoadingRecovery] = useState(false);
    const isMounted = useRef(true);

    const authUserStore = useAuthStore((state) => state.user);
    const authErrorStore = useAuthStore((state) => state.error);
    const authSetLoginStore = useAuthStore((state) => state.login);
    const authSetRecoveryStore = useAuthStore((state) => state.setRecovery);

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        if (authUserStore) navigate("/perfil");
    }, [navigate, authUserStore]);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (loadingRecovery) return;
        setLoading(true);
        await authSetLoginStore(email.trim(), password);
        if (isMounted.current) setLoading(false);
    };

    const handleForgotPassword = async () => {
        if (email.trim() === "") return alert("Por favor ingrese su correo");
        setLoadingRecovery(true);
        const success = await authSetRecoveryStore({ email: email.trim() });
        setLoadingRecovery(false);
        if (!isMounted.current) return;
        if (success) navigate("/recovery");
        else alert("No se encontró ningún usuario con ese correo");
    };

    return (
        <Layout className="auth">
            <form className="form" onSubmit={handleLogin}>
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
                            disabled={loadingRecovery}
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Contraseña"
                            disabled={loadingRecovery}
                        />
                    </div>

                    {authErrorStore && <p>{authErrorStore}</p>}

                    <button
                        className="form__content__forgot"
                        onClick={handleForgotPassword}
                        type="button"
                        disabled={loadingRecovery || loading}
                    >
                        {loadingRecovery ? "Enviando correo..." : "¿Has olvidado tu contraseña?"}
                    </button>

                    <div className="form__content__actions">
                        <button
                            className="btn-filled"
                            type="submit"
                            disabled={loading || loadingRecovery}
                        >
                            {loading ? "INICIANDO..." : "INICIAR SESIÓN"}
                        </button>
                        <Link className="btn-outline" to="/register">
                            NO ESTOY REGISTRADO
                        </Link>
                    </div>
                </section>
            </form>
        </Layout>
    );
}

export default Login;
