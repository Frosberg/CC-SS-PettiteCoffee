import { OverlayTrigger, Popover } from "react-bootstrap";
import "./DHeader.css";
import useAuthStore from "../../stores/useAuthStore";
import { Link } from "react-router";
import useNotifyStore from "../../stores/useNotifyStore";
import NotifyCard from "./NotifyCard";

type Props = {
    currentPath?: string;
};

function DHeader({ currentPath }: Props) {
    const authUserStore = useAuthStore((state) => state.user);
    const notifys = useNotifyStore((state) => state.notifys);

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
                                {notifys &&
                                    notifys.map((notify) => (
                                        <NotifyCard
                                            key={notify.idNotificaciones}
                                            title={notify.asunto}
                                            description={notify.descripcion}
                                            date={notify.fechaHoraEnvio}
                                        />
                                    ))}

                                {!notifys && <p>No hay notificaciones</p>}
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
                    <p>{authUserStore?.email}</p>
                </Link>
            </section>
        </header>
    );
}

export default DHeader;
