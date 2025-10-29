import { Modal } from "react-bootstrap";
import { useState, useEffect, type FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RequestCreateBranch, RequestUpdateBranch } from "../../api/BranchApi";
import CustomInput from "./CustomInput";
import "./CommonModals.css";

type Props = {
    state: boolean;
    onClose: () => void;
    mode: "create" | "edit";
    branch?: Branch | null;
};

function DateModalBranch({ state, onClose, mode, branch }: Props) {
    const queryClient = useQueryClient();

    const [form, setForm] = useState({
        nombre: "",
        direccion: "",
    });

    useEffect(() => {
        if (mode === "edit" && branch) {
            setForm({ nombre: branch.nombre, direccion: branch.direccion });
        } else {
            setForm({ nombre: "", direccion: "" });
        }
    }, [mode, branch]);

    const createMutation = useMutation({
        mutationFn: (data: Branch) => RequestCreateBranch(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["branchs"] });
            onClose();
        },
    });

    const updateMutation = useMutation({
        mutationFn: (data: Branch) => RequestUpdateBranch(branch!.idsucursal!, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["branchs"] });
            onClose();
        },
    });

    const handleChange = (field: keyof Branch, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!form.nombre.trim() || !form.direccion.trim()) return;

        if (mode === "edit" && branch) updateMutation.mutate(form);
        else createMutation.mutate(form);
    };

    const isPending = createMutation.isPending || updateMutation.isPending;

    return (
        <Modal size="lg" centered show={state} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title className="modal__title">
                    {mode === "edit" ? "Editar Sucursal" : "Agregar Sucursal"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form noValidate onSubmit={handleSubmit} className="form__branch">
                    <div className="flex__group">
                        <CustomInput
                            label="Nombre"
                            name="nombre"
                            value={form.nombre}
                            onChange={(v) => handleChange("nombre", v)}
                            placeholder="Ej. Sucursal de Juan Pablo"
                        />
                        <CustomInput
                            label="Dirección"
                            name="direccion"
                            value={form.direccion}
                            onChange={(v) => handleChange("direccion", v)}
                            placeholder="Ej. Av. del gran Papa"
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
                                ? "Actualizar Sucursal"
                                : "Crear Sucursal"}
                        </button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default DateModalBranch;
