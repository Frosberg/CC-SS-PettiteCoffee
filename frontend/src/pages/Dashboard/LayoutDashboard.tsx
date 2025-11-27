import { Outlet, useLocation } from "react-router";
import DHeader from "../../components/Dashboard/DHeader";
import DNavbar from "../../components/Dashboard/DNavbar";
import "./LayoutDashboard.css";

const routesPaths = {
    main: [
        {
            path: "/dashboard",
            name: "Inicio",
            icon: "fa-solid fa-house",
        },
        {
            path: "/dashboard/products",
            name: "Productos",
            icon: "fa-solid fa-boxes-stacked",
        },
        {
            path: "/dashboard/branchs",
            name: "Sucursales",
            icon: "fa-solid fa-layer-group",
        },
        {
            path: "/dashboard/accounts",
            name: "Usuarios",
            icon: "fa-solid fa-user-group",
        },
    ],
    manage: [
        {
            path: "/dashboard/manage/reports",
            name: "Reportes",
            icon: "fa-solid fa-book",
        },
    ],
};

function LayoutDashboard() {
    const { pathname } = useLocation();
    const searchMain = routesPaths.main.find((route) => route.path === pathname)?.name;
    const searchManage = routesPaths.manage.find((route) => route.path === pathname)?.name;
    const currentPath = searchMain || searchManage;

    return (
        <>
            <main className="dashboard">
                <DNavbar routesPaths={routesPaths} />
                <section className="dashboard__content">
                    <DHeader currentPath={currentPath} />
                    <div className="dashboard__box">
                        <Outlet />
                    </div>
                </section>
            </main>
        </>
    );
}

export default LayoutDashboard;
