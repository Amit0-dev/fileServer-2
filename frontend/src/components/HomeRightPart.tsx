import { Card, Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { useNavigate } from "react-router-dom";

const HomeRightPart = () => {
    const navigate = useNavigate();

    const folders = [
        {
            id: 1,
            name: "My Folder",
            createdAt: "2024-06-01",
            totalFiles: 10,
        },
        {
            id: 2,
            name: "test folder",
            createdAt: "2024-06-01",
            totalFiles: 5,
        },
    ];

    return (
        <div className="flex-1 h-full flex flex-col">
            {/* Topbar */}
            <div className="h-16 border-b border-neutral-800 flex items-center justify-between px-6">
                <input
                    type="text"
                    placeholder="Search folders..."
                    className="bg-[#1a1a1a] border border-neutral-800 rounded-md px-4 py-2 text-sm outline-none w-72 focus:border-[#14CF93]"
                />

                <Modal>
                    <Button
                        variant="ghost"
                        className="bg-[#14CF93] text-black px-5 py-2 cursor-pointer rounded-md font-medium hover:opacity-90 transition"
                    >
                        Create Folder
                    </Button>

                    <Modal.Backdrop>
                        <Modal.Container placement="auto">
                            <Modal.Dialog className="sm:max-w-md ">
                                <Modal.CloseTrigger />
                                <Modal.Header>
                                    <Modal.Heading>Create Folder</Modal.Heading>
                                    <p className="mt-1.5 text-sm leading-5 text-muted">
                                        Create a new folder in your bucket.
                                    </p>
                                </Modal.Header>
                                <Modal.Body className="p-2">
                                    <Surface variant="default">
                                        <form className="flex flex-col gap-4">
                                            <TextField className="w-full" name="name" type="text">
                                                <Label>Folder Name</Label>
                                                <Input placeholder="Enter folder name" />
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
                                        Create
                                    </Button>
                                </Modal.Footer>
                            </Modal.Dialog>
                        </Modal.Container>
                    </Modal.Backdrop>
                </Modal>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
                <h2 className="text-lg font-medium mb-4">All Folders</h2>

                <div className="flex flex-col justify-center gap-3">
                    {folders.map((folder) => (
                        <Card
                            onClick={() => navigate("/home/myFiles/f/123")}
                            key={folder.id}
                            variant="transparent"
                            className="bg-neutral-900 rounded-md px-6 cursor-pointer hover:bg-[#41967b] transition-colors duration-300 ease-in-out font-medium text-sm"
                        >
                            <Card.Header className="flex flex-row items-center justify-between">
                                <Card.Title className="text-neutral-100">{folder.name}</Card.Title>
                                <Card.Description>Created on: {folder.createdAt}</Card.Description>
                            </Card.Header>

                            <Card.Footer className="text-mauve-400 text-xs">
                                Total Files: {folder.totalFiles}
                            </Card.Footer>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomeRightPart;
