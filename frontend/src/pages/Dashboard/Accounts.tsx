import { useState } from "react";
import { Table } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { RequestAccounts, RequestExportAccounts } from "../../api/AccountApi";
import ToastStore from "../../stores/ToastStore";
import "./CommonDashboard.css";

function Accounts() {
    const [selected, setSelected] = useState<number | null>(null);
    const [search, setSearch] = useState("");

    const showToast = ToastStore((state) => state.showToast);

    const {
        data: accounts = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["accounts"],
        queryFn: () => RequestAccounts().then((res) => res.data),
    });

    const handleSelected = (account: User) =>
        setSelected(selected === account.idcuenta ? null : account.idcuenta);

    const handleClearSelection = () => setSelected(null);

    const handleExport = async () => {
        try {
            await RequestExportAccounts();
        } catch (err) {
            console.error(err);
            showToast({
                title: "Error",
                message: "Error al descargar el archivo de cuentas",
                type: "error",
            });
        }
    };

    const keys = accounts.length ? (Object.keys(accounts[0]) as (keyof User)[]) : [];

    const filteredAccounts = accounts.filter((a) =>
        Object.values(a).some((val) => String(val).toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <article className="commons">
            <section className="commons__header">
                <div className="search__container">
                    <div className="search__box">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input
                            type="text"
                            placeholder="Buscar por nombre o email..."
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
                    <p>Cargando usuarios...</p>
                ) : filteredAccounts.length === 0 ? (
                    <p>No hay usuarios para mostrar</p>
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
                            {filteredAccounts.map((account) => (
                                <tr
                                    key={account.idcuenta}
                                    onClick={() => handleSelected(account)}
                                    className={selected === account.idcuenta ? "selected" : ""}
                                >
                                    {keys.map((key) => (
                                        <td key={String(key)}>{account[key]}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </section>

            <section className="commons__actions">
                <div>
                    <button onClick={handleClearSelection} disabled={!selected}>
                        LIMPIAR SELECCIÓN
                    </button>
                    <button onClick={handleExport}>EXPORTAR</button>
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
    );
}

export default Accounts;
