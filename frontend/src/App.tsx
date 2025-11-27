import { useEffect } from "react";
import { Navigate, Outlet, Route, Routes, useLocation, useNavigate } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import MiPerfil from "./pages/MiPerfil";
import Menus from "./pages/Menus";
import Reviews from "./pages/Reviews";
import CartBuy from "./pages/CartBuy";
import AboutUs from "./pages/AboutUs";
import Recovery from "./pages/Recovery";
import Payment from "./pages/Payment";
import PaymentStatus from "./pages/PaymentStatus";
import LayoutDashboard from "./pages/Dashboard/LayoutDashboard";
import Main from "./pages/Dashboard/Main";
import Products from "./pages/Dashboard/Products";
import Branchs from "./pages/Dashboard/Branchs";
import AuthStore from "./stores/AuthStore";
import Accounts from "./pages/Dashboard/Accounts";

function ProtectedRoute() {
    const isAuth = AuthStore((state) => state.isAuth);
    const isAuthLoading = AuthStore((state) => state.isLoading);
    return isAuth || isAuthLoading ? <Outlet /> : <Navigate to="/login" />;
}

function ProtectedDashboardRoute() {
    const AuthUserStore = AuthStore((state) => state.user);
    return AuthUserStore?.rol === "ADMIN" ? <Outlet /> : <Navigate to="/login" />;
}

function App() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const isAuth = AuthStore((state) => state.isAuth);
    const AuthVerifySession = AuthStore((state) => state.verifySession);

    useEffect(() => {
        AuthVerifySession();
    }, [AuthVerifySession]);

    useEffect(() => {
        if (isAuth && ["/login", "/register"].includes(pathname)) navigate("/perfil");
    }, [isAuth, pathname, navigate]);

    const AuthPages = ["/login", "/register", "/recovery"];
    const styledHome = pathname === "/" ? "root-home" : "root-default";
    const styledAuth = AuthPages.includes(pathname) ? "root-auth" : styledHome;
    const styledDashboard = pathname.includes("/dashboard") ? "root-dashboard" : styledAuth;

    return (
        <div className={styledDashboard}>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/menus" element={<Menus />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/cartbuy" element={<CartBuy />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/payment-status" element={<PaymentStatus />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/recovery" element={<Recovery />} />

                <Route element={<ProtectedRoute />}>
                    <Route path="perfil" element={<MiPerfil />} />
                    <Route element={<ProtectedDashboardRoute />}>
                        <Route path="dashboard" element={<LayoutDashboard />}>
                            <Route index element={<Main />} />
                            <Route path="products" element={<Products />} />
                            <Route path="branchs" element={<Branchs />} />
                            <Route path="accounts" element={<Accounts />} />
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
