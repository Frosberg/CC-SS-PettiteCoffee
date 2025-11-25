import { useLocation, useNavigate } from "react-router";
import Layout from "./Layout";
import "./PaymentStatus.css";
import AuthStore from "../stores/AuthStore";

type PaymentItem = {
    name: string;
    quantity: number;
    unitPrice: number;
};

type PaymentResult = {
    status: "approved" | "rejected";
    message: string;
    reference?: string | null;
    total: number;
    email?: string;
    address?: string;
    city?: string;
    items: PaymentItem[];
};

function PaymentStatus() {
    const navigate = useNavigate();
    const location = useLocation();
    const isAuth = AuthStore((state) => state.isAuth);
    const result = (location.state as PaymentResult | undefined) ?? null;

    const status: PaymentResult["status"] = result?.status ?? "rejected";
    const message = result?.message ?? "No encontramos un pago procesado recientemente.";
    const reference = result?.reference ?? null;
    const total = result?.total ?? 0;
    const email = result?.email;
    const address = result?.address;
    const city = result?.city;
    const items = result?.items ?? [];

    const isApproved = status === "approved";

    const handleDownloadReceipt = () => {
        const receiptReference = reference ?? "SIN-REFERENCIA";
        const statusLabel = isApproved ? "PAGO APROBADO" : "PAGO RECHAZADO";
        const qrData = `REF:${receiptReference}|MONTO:${total.toFixed(2)}|ESTADO:${statusLabel}`;
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
            qrData
        )}`;

        const html = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <title>Comprobante ${receiptReference}</title>
    <style>
        body { font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; padding: 24px; background:#f8f5f0; color:#2b2114; }
        .card { max-width: 480px; margin: 0 auto; background:#fff; border-radius: 16px; padding: 24px; box-shadow: 0 16px 32px rgba(0,0,0,0.08); }
        h1 { font-size: 1.4rem; margin: 0 0 16px; }
        .status { font-weight: 700; margin-bottom: 12px; }
        .status--ok { color: #2f8f5b; }
        .status--error { color: #c75252; }
        .row { display: flex; justify-content: space-between; margin-bottom: 8px; }
        .label { font-weight: 600; }
        .qr { text-align: center; margin-top: 20px; }
        small { display:block; margin-top:8px; color:#6b5a43; }
        .items { margin-top: 18px; border-top: 1px solid #e5d7c5; padding-top: 12px; }
        .items h2 { font-size: 1rem; margin: 0 0 8px; }
        .items ul { list-style: none; padding: 0; margin: 0; }
        .items li { display: flex; justify-content: space-between; margin-bottom: 4px; font-size: 0.9rem; }
        .items span:first-child { max-width: 70%; }
    </style>
</head>
<body>
    <div class="card">
        <h1>Comprobante de pago</h1>
        <div class="status ${isApproved ? "status--ok" : "status--error"}">${statusLabel}</div>
        <div class="row"><span class="label">Referencia:</span><span>${receiptReference}</span></div>
        <div class="row"><span class="label">Monto:</span><span>S/ ${total.toFixed(2)}</span></div>
        ${
            address
                ? `<div class="row"><span class="label">Dirección:</span><span>${address}${
                      city ? `, ${city}` : ""
                  }</span></div>`
                : ""
        }
        ${
            email
                ? `<div class="row"><span class="label">Correo:</span><span>${email}</span></div>`
                : ""
        }
        ${
            items.length
                ? `<div class="items">
            <h2>Detalle de productos</h2>
            <ul>
                ${items
                    .map(
                        (item) =>
                            `<li><span>${item.quantity} x ${item.name}</span><span>S/ ${(
                                item.unitPrice * item.quantity
                            ).toFixed(2)}</span></li>`
                    )
                    .join("")}
            </ul>
        </div>`
                : ""
        }
        <div class="qr">
            <img src="${qrUrl}" alt="Código QR del pago" />
            <small>Escanea este código para validar tu comprobante.</small>
        </div>
    </div>
</body>
</html>`;

        const blob = new Blob([html], { type: "text/html;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `comprobante-${receiptReference}.html`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <Layout className="wrapper payment-status">
            <div className="wrapper__container payment-status__container">
                <div className="payment-status__card">
                    <span
                        className={
                            isApproved
                                ? "status__badge status__badge--ok"
                                : "status__badge status__badge--error"
                        }
                    >
                        {isApproved ? "Pago aprobado" : "Pago rechazado"}
                    </span>
                    <h2 className="wrapper__title">
                        {isApproved ? "Listo, orden en marcha" : "No pudimos procesar el pago"}
                    </h2>
                    <p className="payment-status__message">{message}</p>

                    <div className="payment-status__info">
                        <div>
                            <span>Referencia</span>
                            <strong>{reference ?? "No generada"}</strong>
                        </div>
                        <div>
                            <span>Monto procesado</span>
                            <strong>S/ {total.toFixed(2)}</strong>
                        </div>
                        {address && (
                            <div>
                                <span>Dirección de entrega</span>
                                <strong>
                                    {address}
                                    {city ? `, ${city}` : ""}
                                </strong>
                            </div>
                        )}
                        {email && (
                            <div>
                                <span>Enviaremos el comprobante a</span>
                                <strong>{email}</strong>
                            </div>
                        )}
                    </div>

                    <div className="payment-status__actions">
                        {isApproved ? (
                            <>
                                <button onClick={() => navigate("/menus")}>Seguir comprando</button>
                                {isAuth ? (
                                    <button className="ghost" onClick={() => navigate("/perfil")}>
                                        Ir a perfil
                                    </button>
                                ) : (
                                    <button className="ghost" onClick={handleDownloadReceipt}>
                                        Descargar comprobante
                                    </button>
                                )}
                            </>
                        ) : (
                            <>
                                <button onClick={() => navigate("/payment")}>
                                    Reintentar pago
                                </button>
                                <button className="ghost" onClick={() => navigate("/cartbuy")}>
                                    Volver al carrito
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default PaymentStatus;
