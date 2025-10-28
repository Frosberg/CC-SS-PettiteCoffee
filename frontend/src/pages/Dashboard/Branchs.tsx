import { Table } from "react-bootstrap";
import "./CommonDashboard.css";
import useBranchStore from "../../stores/useBranchStore";
import { useState } from "react";
import AddModalBranch from "../../components/Dashboard/AddModalBranch";

function Branchs() {
    const [addModal, setAddModal] = useState(false);
    const branchs = useBranchStore((store) => store.branchs);

    if (!branchs || branchs.length === 0) return;
    const keys = Object.keys(branchs[0]) as (keyof (typeof branchs)[0])[];

    const openAddModal = () => setAddModal(true);
    const closeAddModal = () => setAddModal(false);

    return (
        <>
            <AddModalBranch state={addModal} onClose={closeAddModal} />

            <article className="commons">
                <section className="commons__header"></section>
                <section className="commons__table">
                    <Table className="table__content">
                        <thead>
                            <tr>
                                <th>#</th>
                                {keys.map((key) => (
                                    <th key={key}>{key.toUpperCase()}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {branchs.map((branch, index) => (
                                <tr key={branch.idsucursal}>
                                    <td>{index + 1}</td>
                                    {keys.map((key) => (
                                        <td key={String(key)}>{branch[key]}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </section>
                <section className="commons__pagination"></section>
                <section className="commons__actions">
                    <div>
                        <button onClick={openAddModal}>AGREGAR</button>
                        <button>EDITAR</button>
                        <button>BORRAR SELECCION</button>
                    </div>

                    <button>ACTUALIZAR</button>
                </section>
            </article>
        </>
    );
}

export default Branchs;
