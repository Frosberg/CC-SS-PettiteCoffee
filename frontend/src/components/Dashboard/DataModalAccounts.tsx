import { Modal } from "react-bootstrap";
import { useState, useEffect, type FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import "./CommonModals.css";
import ToastStore from "../../stores/ToastStore";
import { RequestChangeRole } from "../../api/AccountApi";

import CustomSelect from "./CustomSelect";

type Props = {
    state: boolean;
    onClose: () => void;
    mode: "create" | "edit";
    account?: User | null;
};

function DataModalAccounts({ state, onClose, mode, account }: Props) {
    const queryClient = useQueryClient();
    const showToast = ToastStore((state) => state.showToast);

    const [form, setForm] = useState({
        idcuenta: 0,
        rol: "",
    });

    useEffect(() => {
        if (mode === "edit" && account) {
            setForm({
                idcuenta: account.idcuenta,
                rol: account.rol,
            });
        } else {
            setForm({
                idcuenta: 0,
                rol: "",
            });
        }
    }, [mode, account]);

    const mutation = useMutation({
        mutationFn: (payload: { idcuenta: number; rol: string }) => RequestChangeRole(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["accounts"] });
            onClose();
        },
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!form.rol) {
            showToast({
                title: "Error",
                message: "Debes seleccionar un rol",
                type: "error",
            });
            return;
        }

        mutation.mutate({
            idcuenta: form.idcuenta,
            rol: form.rol,
        });
    };

    return (
        <Modal size="lg" centered show={state} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title className="modal__title">Cambiar Rol</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form noValidate onSubmit={handleSubmit} className="form__branch">
                    <CustomSelect
                        label="Rol"
                        name="rol"
                        value={form.rol}
                        onChange={(val) =>
                            setForm((prev) => ({
                                ...prev,
                                rol: val,
                            }))
                        }
                        placeholder="Seleccione un rol"
                        options={[
                            { label: "Empleador y/o Cliente", value: "CLIENTE" },
                            { label: "Administrador", value: "ADMIN" },
                        ]}
                        required
                    />

                    <div className="form__actions">
                        <button type="button" onClick={onClose}>
                            Cancelar
                        </button>

                        <button type="submit" disabled={mutation.isPending}>
                            {mutation.isPending ? "Guardando..." : "Guardar"}
                        </button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default DataModalAccounts;
