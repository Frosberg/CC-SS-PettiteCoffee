import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import MiPerfil from "./pages/MiPerfil";
import useAuthStore from "./stores/useAuthStore";
import Menus from "./pages/Menus";
import Reviews from "./pages/Reviews";
import CartBuy from "./pages/CartBuy";
import AboutUs from "./pages/AboutUs";
import Recovery from "./pages/Recovery";
import LayoutDashboard from "./pages/Dashboard/LayoutDashboard";
import Main from "./pages/Dashboard/Main";
import Products from "./pages/Dashboard/Products";
import Branchs from "./pages/Dashboard/Branchs";
import useProductsStore from "./stores/useProductsStore";
import useBranchStore from "./stores/useBranchStore";
import useNotifyStore from "./stores/useNotifyStore";

function App() {
    const authSetSessionStore = useAuthStore((state) => state.setSession);

    const getProducts = useProductsStore((state) => state.getProducts);
    const getBranchs = useBranchStore((state) => state.getBranchs);
    const getNotifys = useNotifyStore((state) => state.getNotifys);

    const { pathname } = useLocation();

    useEffect(() => {
        const session = window.localStorage.getItem("session");
        if (session) authSetSessionStore(JSON.parse(session));
    }, [authSetSessionStore]);

    const isAuthPage =
        pathname === "/login" || pathname === "/register" || pathname === "/recovery";
    const isHomePage = pathname === "/";

    // Load Data
    useEffect(() => {
        const promise = Promise.all([getProducts(), getBranchs(), getNotifys()]);
        promise.then(() => {
            console.log("Data Loaded!");
        });
    }, [getProducts, getBranchs, getNotifys]);

    return (
        <div className={isAuthPage ? "root-auth" : isHomePage ? "root-home" : "root-default"}>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/login" element={<Login />} />
                <Route path="/menus" element={<Menus />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/cartbuy" element={<CartBuy />} />
                <Route path="/register" element={<Register />} />

                <Route path="/recovery" element={<Recovery />} />
                <Route path="/perfil" element={<MiPerfil />} />

                <Route path="/dashboard" element={<LayoutDashboard />}>
                    <Route index element={<Main />} />
                    <Route path="products" element={<Products />} />
                    <Route path="branchs" element={<Branchs />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
