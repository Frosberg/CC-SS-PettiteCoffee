import CardProduct from "../components/CardProduct";
import { TabItem, TabNavbar, TabPanel, TabsContent, TabsCustom } from "../components/TabsCustom";
import useProductsStore from "../stores/useProductsStore";
import Layout from "./Layout";
import "./Menus.css";

function Menus() {
    const products = useProductsStore((state) => state.products);

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
                            {products.map((product) => (
                                <CardProduct
                                    key={product.codproducto}
                                    image={product.imageUrl}
                                    title={product.nombre}
                                    price={product.precioventa}
                                />
                            ))}
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
