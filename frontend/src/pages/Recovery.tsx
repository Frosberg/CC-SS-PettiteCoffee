import AuthStore from "../stores/AuthStore";
import Layout from "./Layout";
import "./Auth.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function Recovery() {
    const navigate = useNavigate();
    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [localError, setLocalError] = useState("");

    const AuthIsLoading = AuthStore((state) => state.isLoading);
    const AuthTypeLoading = AuthStore((state) => state.typeLoading);
    const AuthEmailRecovery = AuthStore((state) => state.emailRecovery);
    const AuthMessageError = AuthStore((state) => state.messageError);
    const AuthSetRecoveryPassword = AuthStore((state) => state.setRecoveryPassword);
    const AuthSetChangePassword = AuthStore((state) => state.setChangePassword);

    useEffect(() => {
        if (!AuthEmailRecovery || AuthEmailRecovery === "") navigate("/login");
    }, [navigate, AuthEmailRecovery]);

    const handleRecovery = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLocalError("");
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

        if (AuthIsLoading) return;
        if (!uuidRegex.test(token)) return setLocalError("El token no es válido");
        if (password.length < 8)
            return setLocalError("La contraseña debe tener al menos 8 caracteres");
        if (password !== repeatPassword) return setLocalError("Las contraseñas no coinciden");

        const success = await AuthSetChangePassword(AuthEmailRecovery, password, token);
        if (success) navigate("/perfil");
        else setLocalError("Token inválido o expirado. Intente nuevamente.");
    };

    const handleResendRecovery = async () => {
        if (AuthIsLoading) return;
        setLocalError("");
        const success = await AuthSetRecoveryPassword(AuthEmailRecovery);
        if (!success) setLocalError("No se pudo reenviar el correo de recuperación");
    };

    return (
        <Layout className="auth">
            <form className="form" onSubmit={handleRecovery}>
                <header className="form__header">
                    <h2>RECUPERAR CONTRASEÑA</h2>
                    <p>Por favor completar los datos correspondientes</p>
                </header>

                <section className="form__content">
                    <div className="form__content__inputs">
                        <input
                            type="text"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            placeholder="Token (UUID)"
                            disabled={AuthIsLoading}
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Contraseña nueva"
                            disabled={AuthIsLoading}
                        />
                        <input
                            type="password"
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                            placeholder="Repetir contraseña"
                            disabled={AuthIsLoading}
                        />
                    </div>

                    <div className="form__content__guide">
                        <p>Puede revisar su correo para encontrar el token</p>
                        <p>
                            El token es válido por 10 minutos{" "}
                            <button
                                className="form__content__guide-link"
                                onClick={handleResendRecovery}
                                type="button"
                                disabled={AuthIsLoading}
                            >
                                {AuthIsLoading ? "Reenviando..." : "Volver a Reenviar"}
                            </button>
                        </p>
                    </div>

                    {(AuthMessageError || localError) && (
                        <p className="form__error">{AuthMessageError || localError}</p>
                    )}

                    <div className="form__content__actions">
                        <button className="btn-filled" type="submit" disabled={AuthIsLoading}>
                            {AuthIsLoading && AuthTypeLoading === "CHANGE_PASSWORD"
                                ? "CAMBIANDO..."
                                : "CAMBIAR CONTRASEÑA"}
                        </button>
                    </div>
                </section>
            </form>
        </Layout>
    );
}

export default Recovery;
