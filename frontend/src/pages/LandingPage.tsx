import { Link } from "react-router-dom";
import { Container } from "../components/Container";
import { Button } from "@heroui/react";
import NavBar from "../components/NavBar";
import HeroCard from "../components/HeroCard";

const LandingPage = () => {
    return (
        <div className="w-full h-full">
            <Container>
                <div className="w-full h-full">
                    <NavBar />

                    <div className="mt-24 w-full px-5">
                        <h1 className=" text-4xl md:text-6xl font-bold leading-16 tracking-tight">
                            From <span className="text-[#14CF93]">Upload</span> to{" "}
                            <span className="text-[#14CF93]">Access</span> <br />
                            Instant.
                        </h1>

                        <p className="text-lg text-neutral-400 mt-4">
                            Upload, store, and share your files with speed, security, and zero
                            friction.
                        </p>

                        <Button variant="tertiary" className={"text-black px-6 py-1 mt-4"}>
                            <Link to="/login">Get Started</Link>
                        </Button>
                    </div>

                    <HeroCard />
                </div>
            </Container>
        </div>
    );
};

export default LandingPage;
