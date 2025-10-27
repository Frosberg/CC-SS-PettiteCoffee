import { useEffect } from "react";
import { Route, Routes } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import MiPerfil from "./pages/MiPerfil";
import useAuthStore from "./stores/useAuthStore";

function App() {
    const authSetSessionStore = useAuthStore((state) => state.setSession);

    useEffect(() => {
        const session = window.localStorage.getItem("session");
        if (session) authSetSessionStore(JSON.parse(session));
    }, [authSetSessionStore]);

    return (
        <Routes>
            <Route index element={<Home />} />
            <Route path="/perfil" element={<MiPerfil />} />

            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
        </Routes>
    );
}

export default App;
