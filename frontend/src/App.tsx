import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";

const App = () => {
    return (
        <div className="w-full min-h-screen h-full bg-[#111111] text-neutral-200 ">
            <Routes>
                <Route path="/" element={<LandingPage />} />
            </Routes>
        </div>
    );
};

export default App;
