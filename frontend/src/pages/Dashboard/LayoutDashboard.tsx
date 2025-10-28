import { Outlet, useLocation, useNavigate } from "react-router";
import DHeader from "../../components/Dashboard/DHeader";
import DNavbar from "../../components/Dashboard/DNavbar";
import "./LayoutDashboard.css";
import useAuthStore from "../../stores/useAuthStore";
import { useEffect } from "react";

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
    ],
    manage: [
        {
            path: "/dashboard/manage/configuration",
            name: "Configuracion",
            icon: "fa-solid fa-gear",
        },
        {
            path: "/dashboard/manage/reports",
            name: "Reportes",
            icon: "fa-solid fa-book",
        },
    ],
};

function LayoutDashboard() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const isAuthenticated = useAuthStore((store) => store.isAuthenticated);

    useEffect(() => {
        if (!isAuthenticated) navigate("/login");
    }, [isAuthenticated]);

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
