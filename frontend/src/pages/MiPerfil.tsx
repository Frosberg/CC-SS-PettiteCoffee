import { useEffect } from "react";
import { useNavigate } from "react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import useAuthStore from "../stores/useAuthStore";
import ViewInfoUser from "../components/ViewInfoUser";
import "./MiPerfil.css";

function MiPerfil() {
    const navigate = useNavigate();
    const authLogoutStore = useAuthStore((state) => state.logout);
    const authUserStore = useAuthStore((state) => state.user);

    useEffect(() => {
        if (!authUserStore) navigate("/login");
    }, [navigate, authUserStore]);

    const handleLogout = () => {
        authLogoutStore();
        navigate("/login");
    };

    return (
        <>
            <Header />
            <main className="main__section">
                <h1 className="main__title">Mi Perfil</h1>
                <article className="container py-2">
                    <ul className="nav nav-tabs tabs-custom justify-content-center">
                        <li className="nav-item">
                            <button
                                className="nav-link active"
                                data-bs-toggle="tab"
                                data-bs-target="#datos"
                                type="button"
                                role="tab"
                            >
                                Datos
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className="nav-link"
                                data-bs-toggle="tab"
                                data-bs-target="#pedidos"
                                type="button"
                                role="tab"
                            >
                                Mis Pedidos
                            </button>
                        </li>
                    </ul>

                    <section className="tab-content pt-4">
                        <div className="tab-pane fade show active" id="datos" role="tabpanel">
                            <div className="perfil__content__data">
                                <ViewInfoUser title="Correo Electrónico" value={authUserStore} />
                                <ViewInfoUser title="Nombre y Apellido" value="" />
                                <ViewInfoUser title="Dirección" value="" />
                                <ViewInfoUser title="Teléfono" value="" />
                                <ViewInfoUser title="Fecha de Nacimiento" value="" />
                                <ViewInfoUser title="País" value="" />
                                <div className="perfil__content__data__actions">
                                    <button className="btn-filled">Editar Datos</button>
                                    <button className="btn-filled" onClick={handleLogout}>
                                        Cerrar Sesion
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="pedidos" role="tabpanel"></div>
                    </section>
                </article>
            </main>
            <Footer />
        </>
    );
}

export default MiPerfil;
