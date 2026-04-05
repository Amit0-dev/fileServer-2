import { Button, Avatar, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { Link } from "react-router-dom";

const NavBar = () => {
    const isLoggedIn = true; // Replace with actual authentication logic

    return (
        <nav className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-[#14CF93] flex items-center justify-center text-black font-bold">
                    F
                </div>
                <h1 className="text-lg font-semibold text-[#14CF93]">Filezy</h1>
            </div>

            {isLoggedIn ? (
                <Modal>
                    <Button variant="ghost" className={"hover:bg-transparent bg-transparent"}>
                        <Avatar variant="soft" color="success" className="cursor-pointer">
                            <Avatar.Fallback>AG</Avatar.Fallback>
                        </Avatar>
                    </Button>
                    <Modal.Backdrop>
                        <Modal.Container placement="auto">
                            <Modal.Dialog className="sm:max-w-md ">
                                <Modal.CloseTrigger />
                                <Modal.Header>
                                    <Modal.Heading>Update Profile</Modal.Heading>
                                    <p className="mt-1.5 text-sm leading-5 text-muted">
                                        Update your profile information.
                                    </p>
                                </Modal.Header>
                                <Modal.Body className="p-2">
                                    <Surface variant="default">
                                        <form className="flex flex-col gap-4">
                                            <TextField className="w-full" name="name" type="text">
                                                <Label>Name</Label>
                                                <Input placeholder="Enter your name" />
                                            </TextField>
                                            <TextField className="w-full" name="email" type="email">
                                                <Label>Email</Label>
                                                <Input placeholder="Enter your email" />
                                            </TextField>
                                            <TextField
                                                className="w-full"
                                                name="username"
                                                type="text"
                                            >
                                                <Label>Username</Label>
                                                <Input readOnly value={"amitx"} />
                                            </TextField>
                                            <TextField className="w-full" name="folder">
                                                <Label>Your Bucket Folder</Label>
                                                <Input readOnly value={"amitx-bucket"} />
                                            </TextField>
                                            <TextField className="w-full" name="verified">
                                                <Label>Verified</Label>
                                                <Input readOnly value={"Yes"} />
                                            </TextField>
                                        </form>
                                    </Surface>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button
                                        slot="close"
                                        variant="secondary"
                                        className={"text-[#07ba82]"}
                                    >
                                        Cancel
                                    </Button>
                                    <Button slot="close" className={"bg-[#07ba82]"}>
                                        Update
                                    </Button>
                                </Modal.Footer>
                            </Modal.Dialog>
                        </Modal.Container>
                    </Modal.Backdrop>
                </Modal>
            ) : (
                <Button variant="tertiary" className={"text-black px-6 py-1"}>
                    <Link to="/login" className="text-sm font-medium">
                        Login
                    </Link>
                </Button>
            )}
        </nav>
    );
};

export default NavBar;
