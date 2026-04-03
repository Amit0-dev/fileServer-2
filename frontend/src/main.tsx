import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import LenisReact from "lenis/react";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <LenisReact root>
                <App />
            </LenisReact>
        </BrowserRouter>
    </StrictMode>,
);
