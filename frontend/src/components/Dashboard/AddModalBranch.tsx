import { Modal } from "react-bootstrap";
import { useState, type FormEvent } from "react";
import CustomInput from "./CustomInput";
import useBranchStore from "../../stores/useBranchStore";
import "./AddModalBranch.css";

type Props = {
    state: boolean;
    onClose: () => void;
};

function AddModalBranch({ state, onClose }: Props) {
    const [name, setName] = useState("");
    const [direction, setDirection] = useState("");

    const createBranch = useBranchStore((state) => state.createBranch);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (name.trim() === "" || direction.trim() === "") return;
        await createBranch({ direccion: direction, nombre: name });
        onClose();
    };

    return (
        <Modal size="lg" centered show={state}>
            <Modal.Header>
                <Modal.Title className="modal__title">Agregar Sucursal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form noValidate onSubmit={handleSubmit} className="form__branch">
                    <div className="flex__group">
                        <CustomInput
                            label="Nombre"
                            name="name"
                            value={name}
                            onChange={setName}
                            placeholder="Ej. Sucursal de Juan Pablo"
                        />

                        <CustomInput
                            value={direction}
                            onChange={setDirection}
                            label="Dirección"
                            name="direction"
                            placeholder="Ej. Av. del gran Papa"
                        />
                    </div>
                    <div className="form__actions">
                        <button type="button" onClick={onClose}>
                            Cancelar
                        </button>
                        <button>Crear Sucursal</button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default AddModalBranch;
