import { useState } from "react";
import { TabItem, TabNavbar, TabPanel, TabsContent, TabsCustom } from "../components/TabsCustom";
import CardProduct from "../components/CardProduct";
import Layout from "./Layout";
import { RequestProducts } from "../api/ProductApi";
import { useQuery } from "@tanstack/react-query";
import "./Menus.css";

function Menus() {
    const [search, setSearch] = useState("");

    const { data: products, isLoading } = useQuery({
        queryKey: ["products"],
        queryFn: () => RequestProducts().then((res) => res.data),
    });

    const filteredProducts =
        !products || !search.trim()
            ? products
            : products.filter((product) => {
                  const term = search.toLowerCase();
                  return (
                      product.nombre.toLowerCase().includes(term) ||
                      product.categoria.toLowerCase().includes(term) ||
                      product.codproducto.toLowerCase().includes(term)
                  );
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

                    <div className="menus__search">
                        <div className="menus__search-input">
                            <input
                                id="menus-search"
                                type="text"
                                placeholder="Ej. Capuccino, Muffin, CAF003..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

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
                            {!isLoading && (!products || products.length === 0) ? (
                                <p>No hay productos</p>
                            ) : null}

                            {!isLoading &&
                                products &&
                                products.length > 0 &&
                                filteredProducts &&
                                filteredProducts.length === 0 &&
                                search.trim() && (
                                    <p>No se encontraron productos para tu búsqueda.</p>
                                )}

                            {!isLoading &&
                                filteredProducts &&
                                filteredProducts.length > 0 &&
                                filteredProducts.map((product) => (
                                    <CardProduct
                                        key={product.codproducto}
                                        codproducto={product.codproducto}
                                        idProducto={product.id}
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
