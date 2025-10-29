import { Link } from "react-router";
import { OverlayTrigger, Popover } from "react-bootstrap";
import AuthStore from "../../stores/AuthStore";
import NotifyCard from "./NotifyCard";
import "./DHeader.css";
import { useQuery } from "@tanstack/react-query";
import { RequestNotifys } from "../../api/NotifyApi";

type Props = {
    currentPath?: string;
};

function DHeader({ currentPath }: Props) {
    const { data: notifys, isLoading } = useQuery({
        queryKey: ["notifys"],
        queryFn: () => RequestNotifys().then((res) => res.data),
    });
    const AuthUserStore = AuthStore((state) => state.user);

    return (
        <header className="dheader">
            <h2 className="dheader__title">{currentPath}</h2>
            <section className="dheader__actions">
                <OverlayTrigger
                    trigger="click"
                    placement={"bottom"}
                    overlay={
                        <Popover>
                            <Popover.Header className="notifications__title">
                                <span>Notificaciones</span>
                            </Popover.Header>
                            <Popover.Body className="notifications__description">
                                {isLoading && <p>Cargando notificaciones...</p>}

                                {!notifys || notifys.length === 0 ? (
                                    <p>No hay notificaciones</p>
                                ) : (
                                    notifys.map((notify) => (
                                        <NotifyCard
                                            key={notify.idNotificaciones}
                                            title={notify.asunto}
                                            description={notify.descripcion}
                                            date={notify.fechaHoraEnvio}
                                        />
                                    ))
                                )}
                            </Popover.Body>
                        </Popover>
                    }
                >
                    <button className="popoper__notifications">
                        <i className="fa-solid fa-bell"></i>
                    </button>
                </OverlayTrigger>
                <Link className="dheader__perfil" to="/perfil">
                    <span></span>
                    <p>{AuthUserStore?.email}</p>
                </Link>
            </section>
        </header>
    );
}

export default DHeader;
