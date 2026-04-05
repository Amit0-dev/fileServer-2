import { useNavigate, useParams } from "react-router-dom";
import { Container } from "../components/Container";
import HomeRightPart from "../components/HomeRightPart";
import NavBar from "../components/NavBar";
import SharedSection from "../components/SharedSection";
import InvalidPathPage from "../components/InvalidPathPage";

const Home = () => {
    const { path } = useParams();
    const navigate = useNavigate();

    const navItems = [
        { name: "My Files", path: "myFiles" },
        { name: "Shared", path: "shared" },
    ];

    return (
        <Container>
            <div className="w-full min-h-screen h-screen">
                <NavBar />

                <div className="w-full h-[calc(100vh-4rem)] flex bg-[#111111] text-neutral-200">
                    {/* LEFT SIDEBAR */}
                    <div className="w-50 h-full border-r border-neutral-800 flex flex-col px-4 py-6 md:pr-4 md:pl-0">
                        {/* Nav Items */}
                        <div className="flex flex-col gap-2">
                            {navItems.map((item, idx) => (
                                <div
                                    onClick={() => navigate(`/home/${item.path}`)}
                                    key={idx}
                                    className={`px-4 py-2 rounded-lg font-medium cursor-pointer ${path === item.path && "bg-neutral-900 text-[#14CF93]"}`}
                                >
                                    {item.name}
                                </div>
                            ))}
                        </div>

                        {/* Bottom (optional later) */}
                        <div className="mt-auto text-xs text-neutral-500">1GB free storage</div>
                    </div>

                    {path === "myFiles" ? (
                        <HomeRightPart />
                    ) : path === "shared" ? (
                        <SharedSection />
                    ) : (
                        <InvalidPathPage />
                    )}
                </div>
            </div>
        </Container>
    );
};

export default Home;
