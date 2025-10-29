import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { TabItem, TabNavbar, TabPanel, TabsContent, TabsCustom } from "../components/TabsCustom";
import useAuthStore from "../stores/AuthStore";
import ViewInfoUser from "../components/ViewInfoUser";
import Layout from "./Layout";
import "./MiPerfil.css";

function MiPerfil() {
    const navigate = useNavigate();
    const [editable, setEditable] = useState(false);

    const LogoutStore = useAuthStore((state) => state.logout);
    const userStore = useAuthStore((state) => state.user);

    const handleLogout = async () => {
        await LogoutStore();
        navigate("/login");
    };

    const handleEditable = () => {
        setEditable(!editable);
    };

    return (
        <Layout className="wrapper">
            <div className="wrapper__container">
                <h1 className="wrapper__title">Mi Perfil</h1>

                <TabsCustom defaultActiveKey="datos">
                    <TabNavbar>
                        <TabItem eventKey="datos" title="Datos" />
                        <TabItem eventKey="pedidos" title="Pedidos" />
                    </TabNavbar>
                    <TabsContent>
                        <TabPanel
                            eventKey="datos"
                            className="d-flex flex-column justify-content-center gap-2"
                        >
                            <ViewInfoUser
                                title="Correo Electrónico"
                                value={userStore?.email}
                                editable={editable}
                            />
                            <ViewInfoUser title="Nombre y Apellido" value="" editable={editable} />
                            <ViewInfoUser title="Dirección" value="" editable={editable} />
                            <ViewInfoUser title="Teléfono" value="" editable={editable} />
                            <ViewInfoUser
                                title="Fecha de Nacimiento"
                                value=""
                                editable={editable}
                            />
                            <ViewInfoUser title="País" value="" editable={editable} />
                            <div className="perfil__content__data__actions">
                                {userStore?.rol === "ADMIN" && (
                                    <Link to="/dashboard" className="btn-filled">
                                        Ir Panel de Control
                                    </Link>
                                )}
                                <button className="btn-filled" onClick={handleEditable}>
                                    {editable ? "Guardar" : "Editar Datos"}
                                </button>
                                <button className="btn-filled" onClick={handleLogout}>
                                    Cerrar Sesion
                                </button>
                            </div>
                        </TabPanel>
                        <TabPanel eventKey="pedidos">
                            <p>Pedidos</p>
                        </TabPanel>
                    </TabsContent>
                </TabsCustom>
            </div>
        </Layout>
    );
}

export default MiPerfil;
