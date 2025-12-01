import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "@google/model-viewer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ToastHost from "./components/ToastHost.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <App />
                <ToastHost />
            </QueryClientProvider>
        </BrowserRouter>
    </StrictMode>
);
