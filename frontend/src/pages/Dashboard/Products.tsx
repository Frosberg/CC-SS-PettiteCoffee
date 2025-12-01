import { useState } from "react";
import { Table } from "react-bootstrap";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { RequestProducts, RequestDeleteProduct } from "../../api/ProductApi";
import DataModalProducts from "../../components/Dashboard/DataModalProducts";
import ToastStore from "../../stores/ToastStore";
import "./CommonDashboard.css";

function Products() {
    const [selected, setSelected] = useState<number | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState<"create" | "edit">("create");
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [search, setSearch] = useState("");

    const showToast = ToastStore((state) => state.showToast);
    const queryClient = useQueryClient();

    const {
        data: products = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["products"],
        queryFn: () => RequestProducts().then((res) => res.data),
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => RequestDeleteProduct(id).then((res) => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            setSelected(null);
            showToast({
                title: "Éxito",
                message: "Producto eliminado correctamente",
                type: "success",
            });
        },
        onError: () => {
            showToast({
                title: "Error",
                message: "No se pudo eliminar el producto",
                type: "error",
            });
        },
    });

    const handleAdd = () => {
        setEditMode("create");
        setEditingProduct(null);
        setShowModal(true);
    };

    const handleUpdate = () => {
        if (!selected) {
            showToast({
                title: "Error",
                message: "Selecciona un producto para editar",
                type: "error",
            });
            return;
        }
        const productToEdit = products.find((p) => p.id === selected);
        if (!productToEdit) return;
        setEditMode("edit");
        setEditingProduct(productToEdit);
        setShowModal(true);
    };

    const handleDelete = () => {
        if (!selected) {
            showToast({
                title: "Error",
                message: "Selecciona un producto para borrar",
                type: "error",
            });
            return;
        }
        if (window.confirm("¿Seguro que deseas eliminar este producto?")) {
            deleteMutation.mutate(selected);
        }
    };

    const handleSelected = (product: Product) =>
        setSelected(selected === product.id ? null : product.id);

    const handleClearSelection = () => setSelected(null);

    const keys = products.length ? (Object.keys(products[0]) as (keyof Product)[]) : [];

    const filteredProducts = products.filter((p) =>
        Object.values(p).some((val) => String(val).toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <article className="commons">
            <section className="commons__header">
                <div className="search__container">
                    <div className="search__box">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input
                            type="text"
                            placeholder="Buscar por código o nombre..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <button className="search__button" onClick={() => refetch()}>
                        BUSCAR
                    </button>
                </div>
            </section>

            <section className="commons__table">
                {isLoading ? (
                    <p>Cargando productos...</p>
                ) : filteredProducts.length === 0 ? (
                    <p>No hay productos para mostrar</p>
                ) : (
                    <Table className="table__content" hover>
                        <thead>
                            <tr>
                                {keys.map((key) => (
                                    <th key={key}>{key.toUpperCase()}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((product) => (
                                <tr
                                    key={product.id}
                                    onClick={() => handleSelected(product)}
                                    className={selected === product.id ? "selected" : ""}
                                >
                                    {keys.map((key) => (
                                        <td key={String(key)}>{product[key]}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </section>

            <section className="commons__actions">
                <div>
                    <button onClick={handleAdd}>AGREGAR</button>
                    <button onClick={handleUpdate} disabled={!selected}>
                        EDITAR
                    </button>
                    <button onClick={handleDelete} disabled={!selected}>
                        BORRAR SELECCIÓN
                    </button>
                    <button onClick={handleClearSelection} disabled={!selected}>
                        LIMPIAR SELECCIÓN
                    </button>
                </div>
                <button onClick={() => refetch()}>ACTUALIZAR</button>
            </section>

            {showModal && (
                <DataModalProducts
                    state={showModal}
                    onClose={() => setShowModal(false)}
                    mode={editMode}
                    product={editingProduct}
                />
            )}
        </article>
    );
}

export default Products;
