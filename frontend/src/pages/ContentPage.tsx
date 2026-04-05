import { useNavigate } from "react-router-dom";
import { Container } from "../components/Container";
import NavBar from "../components/NavBar";
import { ArrowLeft } from "lucide-react";
import { Card } from "@heroui/react";

const ContentPage = () => {
    const navigate = useNavigate();

    const cardData = [
        {
            fileName: "example.txt",
            size: "1.2 MB",
            createdAt: "2024-06-01",
        },
        {
            fileName: "example2.txt",
            size: "2.5 MB",
            createdAt: "2024-06-02",
        },
        {
            fileName: "example3.txt",
            size: "500 KB",
            createdAt: "2024-06-03",
        },
        {
            fileName: "example4.txt",
            size: "750 KB",
            createdAt: "2024-06-04",
        },
        {
            fileName: "example5.txt",
            size: "1.8 MB",
            createdAt: "2024-06-05",
        },
        {
            fileName: "example6.txt",
            size: "3.2 MB",
            createdAt: "2024-06-06",
        },
        {
            fileName: "example7.txt",
            size: "900 KB",
            createdAt: "2024-06-07",
        },
    ];

    return (
        <Container>
            <div className="w-full min-h-screen h-screen">
                <NavBar />

                <div className="w-full h-[calc(100vh-4rem)] bg-[#111111] text-neutral-200">
                    <div className="w-full pt-5 h-20 flex flex-col justify-center gap-1">
                        <p
                            onClick={() => navigate("/home/myFiles")}
                            className="flex items-center gap-1 text-sm text-neutral-400 cursor-pointer"
                        >
                            {" "}
                            <ArrowLeft className="text-neutral-400 cursor-pointer" size={18} /> Back
                        </p>

                        <h4 className="font-medium text-xl ml-5">Personal Files</h4>
                    </div>

                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-10">
                        {cardData.map((card, index) => (
                            <Card
                                key={index}
                                variant="transparent"
                                className="bg-neutral-900 rounded-md mx-5 max-w-2xl w-full cursor-pointer hover:bg-[#41967b] transition-colors duration-300 ease-in-out"
                            >
                                <div className="p-4">
                                    <h5 className="font-medium text-lg">
                                        File Name: {card.fileName}
                                    </h5>
                                    <p className="text-sm text-neutral-400">Size: {card.size}</p>
                                    <p className="text-sm text-neutral-400">
                                        Created At: {card.createdAt}
                                    </p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ContentPage;
