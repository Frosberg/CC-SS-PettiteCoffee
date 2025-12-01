import { useState } from "react";
import { Table } from "react-bootstrap";
import "./CommonDashboard.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { RequestBranches, RequestDeleteBranch } from "../../api/BranchApi";
import DateModalBranch from "../../components/Dashboard/DateModalBranch";
import ToastStore from "../../stores/ToastStore";

function Branchs() {
    const [selected, setSelected] = useState<number | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState<"create" | "edit">("create");
    const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
    const [search, setSearch] = useState("");

    const showToast = ToastStore((state) => state.showToast);
    const queryClient = useQueryClient();

    const {
        data: branchs = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["branchs"],
        queryFn: () => RequestBranches().then((res) => res.data),
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => RequestDeleteBranch(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["branchs"] });
            setSelected(null);
            showToast({
                title: "Éxito",
                message: "Sucursal eliminada correctamente",
                type: "success",
            });
        },
        onError: () => {
            showToast({
                title: "Error",
                message: "No se pudo eliminar la sucursal",
                type: "error",
            });
        },
    });

    const handleAdd = () => {
        setEditMode("create");
        setEditingBranch(null);
        setShowModal(true);
    };

    const handleEdit = () => {
        if (!selected) {
            showToast({
                title: "Error",
                message: "Selecciona una sucursal para editar",
                type: "error",
            });
            return;
        }
        const branchToEdit = branchs.find((b) => b.idsucursal === selected);
        if (!branchToEdit) return;
        setEditMode("edit");
        setEditingBranch(branchToEdit);
        setShowModal(true);
    };

    const handleDelete = () => {
        if (!selected) {
            showToast({
                title: "Error",
                message: "Selecciona una sucursal para borrar",
                type: "error",
            });
            return;
        }
        if (window.confirm("¿Seguro que deseas eliminar esta sucursal?")) {
            deleteMutation.mutate(selected);
        }
    };

    const handleSelected = (branch: Branch) =>
        setSelected(selected === branch.idsucursal ? null : branch.idsucursal || null);

    const handleClearSelection = () => setSelected(null);

    const keys = branchs.length ? (Object.keys(branchs[0]) as (keyof Branch)[]) : [];

    const filteredBranches = branchs.filter((b) =>
        Object.values(b).some((val) => String(val).toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <>
            <DateModalBranch
                state={showModal}
                onClose={() => {
                    setShowModal(false);
                    setSelected(null);
                }}
                mode={editMode}
                branch={editingBranch}
            />

            <article className="commons">
                <section className="commons__header">
                    <div className="search__container">
                        <div className="search__box">
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <input
                                type="text"
                                placeholder="Buscar por nombre o dirección..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <button
                            className="search__button"
                            onClick={() => {
                                refetch();
                                setSelected(null);
                            }}
                        >
                            BUSCAR
                        </button>
                    </div>
                </section>

                <section className="commons__table">
                    {isLoading ? (
                        <p>Cargando sucursales...</p>
                    ) : filteredBranches.length === 0 ? (
                        <p>No hay sucursales para mostrar</p>
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
                                {filteredBranches.map((branch) => (
                                    <tr
                                        key={branch.idsucursal}
                                        onClick={() => handleSelected(branch)}
                                        className={selected === branch.idsucursal ? "selected" : ""}
                                    >
                                        {keys.map((key) => (
                                            <td key={String(key)}>{branch[key]}</td>
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
                        <button onClick={handleEdit} disabled={!selected}>
                            EDITAR
                        </button>
                        <button onClick={handleDelete} disabled={!selected}>
                            BORRAR SELECCIÓN
                        </button>
                        <button onClick={handleClearSelection} disabled={!selected}>
                            LIMPIAR SELECCIÓN
                        </button>
                    </div>
                    <button
                        onClick={() => {
                            refetch();
                            setSelected(null);
                        }}
                    >
                        ACTUALIZAR
                    </button>
                </section>
            </article>
        </>
    );
}

export default Branchs;
