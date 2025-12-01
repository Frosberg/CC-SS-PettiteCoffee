import { Modal } from "react-bootstrap";
import { useState, useEffect, type FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RequestCreateProduct, RequestUpdateProduct } from "../../api/ProductApi";
import CustomInput from "./CustomInput";
import "./CommonModals.css";
import ToastStore from "../../stores/ToastStore";

type Props = {
    state: boolean;
    onClose: () => void;
    mode: "create" | "edit";
    product?: Product | null;
};

function DataModalProducts({ state, onClose, mode, product }: Props) {
    const queryClient = useQueryClient();
    const showToast = ToastStore((state) => state.showToast);

    const [form, setForm] = useState({
        codproducto: "",
        nombre: "",
        categoria: "",
        stock: 0,
        preciocompra: 0,
        precioventa: 0,
        fechaVencimiento: "",
        imageUrl: "",
    });

    useEffect(() => {
        if (mode === "edit" && product) {
            setForm({
                codproducto: product.codproducto,
                nombre: product.nombre,
                categoria: product.categoria,
                stock: product.stock,
                preciocompra: product.preciocompra,
                precioventa: product.precioventa,
                fechaVencimiento: product.fechaVencimiento,
                imageUrl: product.imageUrl,
            });
        } else {
            setForm({
                codproducto: "",
                nombre: "",
                categoria: "",
                stock: 0,
                preciocompra: 0,
                precioventa: 0,
                fechaVencimiento: "",
                imageUrl: "",
            });
        }
    }, [mode, product]);

    const createMutation = useMutation({
        mutationFn: (data: Product) => RequestCreateProduct(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            onClose();
        },
    });

    const updateMutation = useMutation({
        mutationFn: (data: Product) => RequestUpdateProduct(product!.id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            onClose();
        },
    });

    const handleChange = (field: keyof Product, value: string | number) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isValid = form.nombre && form.codproducto && form.categoria && form.precioventa > 0;
        if (!isValid) {
            showToast({
                title: "Error",
                message: "Completa todos los campos obligatorios",
                type: "error",
            });
            return;
        }

        if (mode === "edit" && product) updateMutation.mutate(form as Product);
        else createMutation.mutate(form as Product);
    };

    const isPending = createMutation.isPending || updateMutation.isPending;

    return (
        <Modal size="lg" centered show={state} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title className="modal__title">
                    {mode === "edit" ? "Editar Producto" : "Agregar Producto"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form noValidate onSubmit={handleSubmit} className="form__branch">
                    <div className="flex__group">
                        <CustomInput
                            label="Código"
                            name="codproducto"
                            value={form.codproducto}
                            onChange={(v) => handleChange("codproducto", v)}
                            placeholder="Ej. PROD-001"
                        />
                        <CustomInput
                            label="Nombre"
                            name="nombre"
                            value={form.nombre}
                            onChange={(v) => handleChange("nombre", v)}
                            placeholder="Ej. Café Latte"
                        />
                    </div>

                    <div className="flex__group">
                        <CustomInput
                            label="Categoría"
                            name="categoria"
                            value={form.categoria}
                            onChange={(v) => handleChange("categoria", v)}
                            placeholder="Ej. Bebidas"
                        />
                        <CustomInput
                            label="Stock"
                            name="stock"
                            type="number"
                            value={form.stock}
                            onChange={(v) => handleChange("stock", Number(v))}
                            placeholder="Ej. 50"
                        />
                    </div>

                    <div className="flex__group">
                        <CustomInput
                            label="Precio Compra"
                            name="preciocompra"
                            type="number"
                            step="0.01"
                            value={form.preciocompra}
                            onChange={(v) => handleChange("preciocompra", parseFloat(String(v)))}
                            placeholder="Ej. 6.50"
                        />
                        <CustomInput
                            label="Precio Venta"
                            name="precioventa"
                            type="number"
                            step="0.01"
                            value={form.precioventa}
                            onChange={(v) => handleChange("precioventa", parseFloat(String(v)))}
                            placeholder="Ej. 12.50"
                        />
                    </div>

                    <div className="flex__group">
                        <CustomInput
                            label="Fecha de Vencimiento"
                            name="fechaVencimiento"
                            type="date"
                            value={form.fechaVencimiento}
                            onChange={(v) => handleChange("fechaVencimiento", v)}
                        />
                        <CustomInput
                            label="Imagen URL"
                            name="imageUrl"
                            value={form.imageUrl}
                            onChange={(v) => handleChange("imageUrl", v)}
                            placeholder="https://..."
                        />
                    </div>

                    <div className="form__actions">
                        <button type="button" onClick={onClose}>
                            Cancelar
                        </button>
                        <button disabled={isPending}>
                            {isPending
                                ? mode === "edit"
                                    ? "Actualizando..."
                                    : "Creando..."
                                : mode === "edit"
                                ? "Actualizar Producto"
                                : "Crear Producto"}
                        </button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default DataModalProducts;
