import { Offcanvas } from "react-bootstrap";
import { Link } from "react-router";
import "./NavbarCanvas.css";

type Props = {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    routesPaths: Array<{ path: string; name: string }>;
    pathname: string;
    children?: React.ReactNode;
};

function NavbarCanvas({ show, setShow, routesPaths, pathname, children }: Props) {
    return (
        <Offcanvas placement="end" show={show} onHide={() => setShow(false)}>
            <Offcanvas.Header className="nb-canvas" closeButton>
                <Offcanvas.Title className="nb-canvas__title">
                    Delicia, Encanto y Especialidad
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="nb-canvas">
                <ul>
                    {routesPaths.map((route) => (
                        <li key={route.path} className={pathname === route.path ? "active" : ""}>
                            <Link to={route.path}>{route.name}</Link>
                        </li>
                    ))}
                </ul>

                <div className="nb-canvas__actions">{children}</div>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default NavbarCanvas;
