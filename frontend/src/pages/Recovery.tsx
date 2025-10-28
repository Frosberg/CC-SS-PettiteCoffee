import useAuthStore from "../stores/useAuthStore";
import Layout from "./Layout";
import "./Auth.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function Recovery() {
    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingResend, setLoadingResend] = useState(false);
    const [localError, setLocalError] = useState("");

    const navigate = useNavigate();

    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const authEmailStore = useAuthStore((state) => state.email);
    const authErrorStore = useAuthStore((state) => state.error);
    const authSetRecoveryStore = useAuthStore((state) => state.setRecovery);
    const authSetChangePassword = useAuthStore((state) => state.setChangePassword);

    useEffect(() => {
        if (!isAuthenticated || !authEmailStore || authEmailStore.trim() === "") navigate("/login");
    }, [navigate, isAuthenticated, authEmailStore]);

    const handleRecovery = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (loadingResend) return;

        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        setLocalError("");

        if (!uuidRegex.test(token)) return setLocalError("El token no es válido");
        if (password.length < 8)
            return setLocalError("La contraseña debe tener al menos 8 caracteres");
        if (password !== repeatPassword) return setLocalError("Las contraseñas no coinciden");

        setLoading(true);
        const success = await authSetChangePassword({ password, token });
        setLoading(false);

        if (success) navigate("/login");
        else setLocalError("Token inválido o expirado. Intente nuevamente.");
    };

    const handleResendRecovery = async () => {
        if (loading) return;
        setLocalError("");
        setLoadingResend(true);
        const success = await authSetRecoveryStore({ email: authEmailStore });
        setLoadingResend(false);

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
                            disabled={loading || loadingResend}
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Contraseña nueva"
                            disabled={loading || loadingResend}
                        />
                        <input
                            type="password"
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                            placeholder="Repetir contraseña"
                            disabled={loading || loadingResend}
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
                                disabled={loading || loadingResend}
                            >
                                {loadingResend ? "Reenviando..." : "Volver a Reenviar"}
                            </button>
                        </p>
                    </div>

                    {(authErrorStore || localError) && (
                        <p className="form__error">{authErrorStore || localError}</p>
                    )}

                    <div className="form__content__actions">
                        <button
                            className="btn-filled"
                            type="submit"
                            disabled={loading || loadingResend}
                        >
                            {loading ? "Cambiando..." : "CAMBIAR CONTRASEÑA"}
                        </button>
                    </div>
                </section>
            </form>
        </Layout>
    );
}

export default Recovery;
