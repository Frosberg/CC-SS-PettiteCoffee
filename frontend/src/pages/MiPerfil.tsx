import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { TabItem, TabNavbar, TabPanel, TabsContent, TabsCustom } from "../components/TabsCustom";
import useAuthStore from "../stores/AuthStore";
import ViewInfoUser from "../components/ViewInfoUser";
import Layout from "./Layout";
import "./MiPerfil.css";
import { RequestPurchases } from "../api/PurchasesApi";
import { RequestProducts } from "../api/ProductApi";
import { useQuery } from "@tanstack/react-query";

function MiPerfil() {
    const navigate = useNavigate();
    const [editable, setEditable] = useState(false);

    const LogoutStore = useAuthStore((state) => state.logout);
    const userStore = useAuthStore((state) => state.user);

    const { data: products } = useQuery({
        queryKey: ["products"],
        queryFn: () => RequestProducts().then((res) => res.data),
    });

    const [purchases, setPurchases] = useState<Purchase[]>([]);
    const [isLoadingPurchases, setIsLoadingPurchases] = useState(false);

    useEffect(() => {
        if (!userStore) return;

        const load = async () => {
            setIsLoadingPurchases(true);
            const res = await RequestPurchases();
            if (res.ok && res.data) setPurchases(res.data as Purchase[]);
            setIsLoadingPurchases(false);
        };

        void load();
    }, [userStore]);

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
                            {isLoadingPurchases && <p>Cargando historial de compras...</p>}

                            {!isLoadingPurchases && purchases.length === 0 && (
                                <p>No tienes compras registradas aún.</p>
                            )}

                            {!isLoadingPurchases && purchases.length > 0 && (
                                <div className="perfil__orders__list">
                                    {purchases.map((purchase) => {
                                        const itemsCount = purchase.detalles.reduce(
                                            (acc, item) => acc + item.quantity,
                                            0
                                        );

                                        const totalFormatted = Number(purchase.total).toFixed(2);

                                        return (
                                            <article
                                                key={
                                                    purchase.id ?? `${purchase.total}-${itemsCount}`
                                                }
                                                className="perfil__orders__item"
                                            >
                                                <div className="perfil__orders__header">
                                                    <div>
                                                        <p className="perfil__orders__total">
                                                            Total: S/ {totalFormatted}
                                                        </p>
                                                        <p className="perfil__orders__meta">
                                                            {itemsCount} productos
                                                        </p>
                                                    </div>
                                                    <p className="perfil__orders__address">
                                                        Entrega en {purchase.addressDelivery}
                                                        {purchase.cityDelivery
                                                            ? `, ${purchase.cityDelivery}`
                                                            : ""}
                                                    </p>
                                                </div>

                                                {purchase.detalles.map((item) => (
                                                    <div
                                                        key={item.productId}
                                                        className="payment__summary__item"
                                                    >
                                                        <div>
                                                            <img
                                                                className="payment__summary__image"
                                                                src={
                                                                    products?.find(
                                                                        (x) =>
                                                                            x.id === item.productId
                                                                    )?.imageUrl
                                                                }
                                                                alt={item.productName}
                                                            />
                                                            <div>
                                                                <p className="payment__summary__title">
                                                                    {item.productName}
                                                                </p>
                                                                <span className="payment__summary__meta">
                                                                    x
                                                                    {item.quantity
                                                                        .toString()
                                                                        .padStart(2, "0")}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <p className="payment__summary__price">
                                                            S/{" "}
                                                            {(item.price * item.quantity).toFixed(
                                                                2
                                                            )}
                                                        </p>
                                                    </div>
                                                ))}
                                            </article>
                                        );
                                    })}
                                </div>
                            )}
                        </TabPanel>
                    </TabsContent>
                </TabsCustom>
            </div>
        </Layout>
    );
}

export default MiPerfil;
