import { Button, Card, Link } from "@heroui/react";
import { Form, Input, Label, TextField } from "@heroui/react";
import { Container } from "../components/Container";

const Signup = () => {
    return (
        <Container className="w-full h-screen">
            <div className="flex items-center justify-between w-full h-full ">
                {/* LEFT SIDE */}

                <Card className="w-full max-w-md bg-[#E1E1E2]">
                    <Card.Header>
                        <Card.Title>Sign Up</Card.Title>
                        <Card.Description>Create a new account to get started</Card.Description>
                    </Card.Header>
                    <Form>
                        <Card.Content>
                            <div className="flex flex-col gap-4">
                                <TextField name="name" type="name">
                                    <Label>Full Name</Label>
                                    <Input placeholder="Enter your full name" variant="secondary" />
                                </TextField>
                                <TextField name="username" type="text">
                                    <Label>Username</Label>
                                    <Input placeholder="Enter your username" variant="secondary" />
                                </TextField>
                                <TextField name="email" type="email">
                                    <Label>Email</Label>
                                    <Input placeholder="email@example.com" variant="secondary" />
                                </TextField>
                                <TextField name="password" type="password">
                                    <Label>Password</Label>
                                    <Input placeholder="••••••••" variant="secondary" />
                                </TextField>
                            </div>
                        </Card.Content>
                        <Card.Footer className="mt-4 flex flex-col gap-2">
                            <Button className="w-full bg-[#07ba82]" type="submit">
                                Sign Up
                            </Button>

                            <p className="text-center text-xs text-neutral-500">
                                Already have an account?{" "}
                                <Link className="hover:underline" href="/login">
                                    Log in
                                </Link>
                            </p>
                        </Card.Footer>
                    </Form>
                </Card>

                {/* RIGHT SIDE */}
                <div className="">
                    <h2 className="text-xl font-semibold text-neutral-200 mb-2">
                        Why choose <span className="text-[#14CF93]">Filezy</span> ?
                    </h2>

                    <div className="flex flex-col gap-4 md:gap-6 md:py-4">
                        <Card className="flex flex-row gap-4 p-3 bg-[#1a1a1a]/80 backdrop-blur-md border border-neutral-800 w-sm">
                            <div className="h-12 w-12 rounded-xl bg-[#14CF93]/10 flex items-center justify-center text-[#14CF93] font-bold">
                                ⚡
                            </div>
                            <div className="flex flex-col justify-center">
                                <Card.Title className="text-sm text-neutral-100">
                                    Upload and Download
                                </Card.Title>
                                <Card.Description className="text-xs text-neutral-400">
                                    Fast and reliable file uploads and downloads
                                </Card.Description>
                            </div>
                        </Card>

                        <Card className="flex flex-row gap-4 p-3 bg-[#1a1a1a]/80 backdrop-blur-md border border-neutral-800 w-sm">
                            <div className="h-12 w-12 rounded-xl bg-[#14CF93]/10 flex items-center justify-center text-[#14CF93] font-bold">
                                🔐
                            </div>
                            <div className="flex flex-col justify-center">
                                <Card.Title className="text-sm text-neutral-100">
                                    1 GB Free Storage
                                </Card.Title>
                                <Card.Description className="text-xs text-neutral-400">
                                    Get started with 1GB of free storage
                                </Card.Description>
                            </div>
                        </Card>

                        <Card className="flex flex-row gap-4 p-3 bg-[#1a1a1a]/80 backdrop-blur-md border border-neutral-800 w-sm">
                            <div className="h-12 w-12 rounded-xl bg-[#14CF93]/10 flex items-center justify-center text-[#14CF93] font-bold">
                                🔗
                            </div>
                            <div className="flex flex-col justify-center">
                                <Card.Title className="text-sm text-neutral-100">
                                    Effortless Sharing
                                </Card.Title>
                                <Card.Description className="text-xs text-neutral-400">
                                    Share files instantly with simple links
                                </Card.Description>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Signup;
