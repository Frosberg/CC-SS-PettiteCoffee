import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import AuthStore from "../stores/AuthStore";
import Layout from "./Layout";
import "./Auth.css";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const isMounted = useRef(true);

    const AuthIsLoading = AuthStore((state) => state.isLoading);
    const AuthTypeLoading = AuthStore((state) => state.typeLoading);
    const AuthMessageError = AuthStore((state) => state.messageError);
    const AuthRecoveryPassword = AuthStore((state) => state.setRecoveryPassword);
    const AuthLoginStore = AuthStore((state) => state.login);
    const AuthSetLoadingStore = AuthStore((state) => state.setLoading);

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (AuthIsLoading) return;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === "") return alert("Por favor ingrese su correo");
        if (!emailRegex.test(email)) return alert("El correo no es válido");

        await AuthLoginStore(email, password);
        if (isMounted.current) AuthSetLoadingStore(false);
    };

    const handleForgotPassword = async () => {
        if (email === "") return alert("Por favor ingrese su correo");
        const success = await AuthRecoveryPassword(email);
        if (!isMounted.current) return;
        if (success) navigate("/recovery");
        else alert("No se encontró ningún usuario con ese correo");
    };

    return (
        <Layout className="auth">
            <form className="form" onSubmit={handleLogin} noValidate>
                <header className="form__header">
                    <h2>INICIAR SESION</h2>
                    <p>Por favor ingresar su correo y contraseña</p>
                </header>

                <section className="form__content">
                    <div className="form__content__inputs">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value.trim())}
                            placeholder="Correo Electrónico"
                            disabled={AuthIsLoading}
                        />
                        <div className="form__content__password">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Contraseña"
                                disabled={AuthIsLoading}
                            />
                            <button
                                type="button"
                                className="form__content__password-toggle"
                                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                            </button>
                        </div>
                    </div>

                    {AuthMessageError && <p>{AuthMessageError}</p>}

                    <button
                        className="form__content__forgot"
                        onClick={handleForgotPassword}
                        type="button"
                        disabled={AuthIsLoading}
                    >
                        {AuthIsLoading && AuthTypeLoading === "RECOVERY"
                            ? "Enviando correo..."
                            : "¿Has olvidado tu contraseña?"}
                    </button>

                    <div className="form__content__actions">
                        <button className="btn-filled" type="submit" disabled={AuthIsLoading}>
                            {AuthIsLoading && AuthTypeLoading === "LOGIN"
                                ? "INICIANDO..."
                                : "INICIAR SESIÓN"}
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
