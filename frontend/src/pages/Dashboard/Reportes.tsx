import {
    RequestReportAccount,
    RequestReportBranch,
    RequestReportProduct,
} from "../../api/ReportsApi";
import "./Reportes.css";

const reports = [
    {
        name: "accounts",
        icon: "fa-solid fa-user",
        title: "Cuentas de usuario",
        description: "Reportes de cuentas de usuario",
    },
    {
        name: "sucursales",
        icon: "fa-solid fa-code-branch",
        title: "Sucursales",
        description: "Reportes de sucursales",
    },
    {
        name: "products",
        icon: "fa-solid fa-box",
        title: "Productos",
        description: "Reportes de productos",
    },
];

const downloadBlob = (blob: Blob, fileName: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
};

function Reportes() {
    const handleDownload = async (report: string) => {
        if (report === "accounts") {
            const res = await RequestReportAccount();
            if (!res.ok) return alert("Error al exportar cuentas");
            if (res.data) downloadBlob(res.data, "reporte_cuentas.pdf");
        } else if (report === "sucursales") {
            const res = await RequestReportBranch();
            if (!res.ok) return alert("Error al exportar sucursales");
            if (res.data) downloadBlob(res.data, "reporte_sucursales.pdf");
        } else if (report === "products") {
            const res = await RequestReportProduct();
            if (!res.ok) return alert("Error al exportar productos");
            if (res.data) downloadBlob(res.data, "reporte_productos.pdf");
        }
    };

    return (
        <article className="report__content">
            {reports.map((report) => (
                <section key={report.name} className="report__card">
                    <i className={report.icon}></i>
                    <div className="report__card__content">
                        <div>
                            <strong>{report.title}</strong>
                            <p>{report.description}</p>
                        </div>
                        <button onClick={() => handleDownload(report.name)}>Descargar</button>
                    </div>
                </section>
            ))}
        </article>
    );
}

export default Reportes;
