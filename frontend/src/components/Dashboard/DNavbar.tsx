import { Link, useLocation } from "react-router";
import "./DNavbar.css";

type Route = {
    path: string;
    name: string;
    icon: string;
};

type Props = {
    routesPaths: {
        main: Route[];
        manage: Route[];
    };
};

function DNavbar({ routesPaths }: Props) {
    const { pathname } = useLocation();

    return (
        <aside className="dnavbar">
            <h1 className="dnavbar__title">
                LE PETTITE <br /> COFFEE
            </h1>
            <nav className="dnavbar__nav">
                <ul>
                    <li className="nav-title">Principal</li>
                    {routesPaths.main.map((route) => (
                        <li key={route.path}>
                            <Link
                                className={pathname === route.path ? "nav-item active" : "nav-item"}
                                to={route.path}
                            >
                                <i className={route.icon}></i>
                                {route.name}
                            </Link>
                        </li>
                    ))}
                    <li className="nav-title">Mantenimiento</li>
                    {routesPaths.manage.map((route) => (
                        <li key={route.path}>
                            <Link
                                className={pathname === route.path ? "nav-item active" : "nav-item"}
                                to={route.path}
                            >
                                <i className={route.icon}></i>
                                {route.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}

export default DNavbar;
