import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import ContentPage from "./pages/ContentPage";

const App = () => {
    return (
        <div className="w-full min-h-screen h-full bg-[#111111] text-neutral-200 ">
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/home/:path">
                    <Route index element={<Home />} />
                    <Route path="f/:id" element={<ContentPage />} />
                </Route>
            </Routes>
        </div>
    );
};

export default App;
