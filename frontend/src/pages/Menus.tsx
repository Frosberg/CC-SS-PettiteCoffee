import { useState } from "react";
import { TabItem, TabNavbar, TabPanel, TabsContent, TabsCustom } from "../components/TabsCustom";
import CardProduct from "../components/CardProduct";
import Layout from "./Layout";
import { RequestProducts } from "../api/ProductApi";
import { useQuery } from "@tanstack/react-query";
import "./Menus.css";

const CATEGORY_KEYS = ["cafes", "tortas", "muffins", "pasteles", "panes"] as const;
type CategoryKey = (typeof CATEGORY_KEYS)[number] | "novedosos";

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

    const getCategoryKey = (product: Product): CategoryKey => {
        const raw = (product.categoria || "").toLowerCase();
        return CATEGORY_KEYS.includes(raw as any) ? (raw as any) : "novedosos";
    };

    const getFilteredByCategory = (category: CategoryKey) =>
        (filteredProducts || []).filter((product) => getCategoryKey(product) === category);

    const CategoryList = ({ category }: { category: CategoryKey }) => {
        if (isLoading) return <p>Cargando productos...</p>;

        if (!products || products.length === 0) return <p>No hay productos</p>;

        const categoryProducts = getFilteredByCategory(category);

        if (!categoryProducts.length) {
            if (search.trim()) return <p>No se encontraron productos para tu búsqueda.</p>;
            return <p>No hay productos en esta categoría.</p>;
        }

        return (
            <>
                {categoryProducts.map((product, index) => (
                    <CardProduct
                        key={product.codproducto}
                        codproducto={product.codproducto}
                        idProducto={product.id}
                        image={product.imageUrl}
                        title={product.nombre}
                        price={product.precioventa}
                        category={getCategoryKey(product)}
                        appearDelay={index * 100}
                    />
                ))}
            </>
        );
    };

    return (
        <Layout className="wrapper">
            <div className="wrapper__container">
                <h2 className="wrapper__title">Menús - Novedosos</h2>

                <TabsCustom defaultActiveKey="novedosos">
                    <TabNavbar>
                        <TabItem eventKey="novedosos" title="Novedosos" />
                        {/* <TabItem eventKey="cafes" title="Cafes" /> */}
                        <TabItem eventKey="tortas" title="Tortas" />
                        <TabItem eventKey="muffins" title="Muffins" />
                        {/* <TabItem eventKey="pasteles" title="Pasteles" /> */}
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
                            <CategoryList category="novedosos" />
                        </TabPanel>

                        <TabPanel
                            eventKey="cafes"
                            className="d-flex justify-content-center flex-wrap gap-5"
                        >
                            <CategoryList category="cafes" />
                        </TabPanel>

                        <TabPanel
                            eventKey="tortas"
                            className="d-flex justify-content-center flex-wrap gap-5"
                        >
                            <CategoryList category="tortas" />
                        </TabPanel>

                        <TabPanel
                            eventKey="muffins"
                            className="d-flex justify-content-center flex-wrap gap-5"
                        >
                            <CategoryList category="muffins" />
                        </TabPanel>

                        <TabPanel
                            eventKey="pasteles"
                            className="d-flex justify-content-center flex-wrap gap-5"
                        >
                            <CategoryList category="pasteles" />
                        </TabPanel>

                        <TabPanel
                            eventKey="panes"
                            className="d-flex justify-content-center flex-wrap gap-5"
                        >
                            <CategoryList category="panes" />
                        </TabPanel>
                    </TabsContent>
                </TabsCustom>
            </div>
        </Layout>
    );
}

export default Menus;
