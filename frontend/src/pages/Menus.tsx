import { TabItem, TabNavbar, TabPanel, TabsContent, TabsCustom } from "../components/TabsCustom";
import CardProduct from "../components/CardProduct";
import Layout from "./Layout";
import { RequestProducts } from "../api/ProductApi";
import { useQuery } from "@tanstack/react-query";
import "./Menus.css";

function Menus() {
    const { data: products, isLoading } = useQuery({
        queryKey: ["products"],
        queryFn: () => RequestProducts().then((res) => res.data),
    });

    return (
        <Layout className="wrapper">
            <div className="wrapper__container">
                <h2 className="wrapper__title">Menús - Novedosos</h2>

                <TabsCustom defaultActiveKey="cafes">
                    <TabNavbar>
                        <TabItem eventKey="novedosos" title="Novedosos" />
                        <TabItem eventKey="cafes" title="Cafes" />
                        <TabItem eventKey="tortas" title="Tortas" />
                        <TabItem eventKey="muffins" title="Muffins" />
                        <TabItem eventKey="pasteles" title="Pasteles" />
                        <TabItem eventKey="panes" title="Panes" />
                    </TabNavbar>

                    <TabsContent>
                        <TabPanel
                            eventKey="novedosos"
                            className="d-flex justify-content-center flex-wrap gap-5"
                        >
                            <p>Novedosos</p>
                        </TabPanel>

                        <TabPanel
                            eventKey="cafes"
                            className="d-flex justify-content-center flex-wrap gap-5"
                        >
                            {isLoading && <p>Cargando productos...</p>}
                            {!products || products.length === 0 ? (
                                <p>No hay productos</p>
                            ) : (
                                products.map((product) => (
                                    <CardProduct
                                        key={product.codproducto}
                                        codproducto={product.codproducto}
                                        image={product.imageUrl}
                                        title={product.nombre}
                                        price={product.precioventa}
                                    />
                                ))
                            )}
                        </TabPanel>

                        <TabPanel
                            eventKey="tortas"
                            className="d-flex justify-content-center flex-wrap gap-5"
                        >
                            <p>Tortas</p>
                        </TabPanel>

                        <TabPanel
                            eventKey="muffins"
                            className="d-flex justify-content-center flex-wrap gap-5"
                        >
                            <p>Muffins</p>
                        </TabPanel>

                        <TabPanel
                            eventKey="pasteles"
                            className="d-flex justify-content-center flex-wrap gap-5"
                        >
                            <p>Pasteles</p>
                        </TabPanel>

                        <TabPanel
                            eventKey="panes"
                            className="d-flex justify-content-center flex-wrap gap-5"
                        >
                            <p>Panes</p>
                        </TabPanel>
                    </TabsContent>
                </TabsCustom>
            </div>
        </Layout>
    );
}

export default Menus;
