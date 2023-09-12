import { TaskType } from '@/types/TaskType'
import { usePathname } from 'next/navigation'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Button } from "@nextui-org/react";

type Props = { task: TaskType }

const DeleteTask = ({ task }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleOpen = () => {
        onOpen();
    }
    const pathname = usePathname()
    async function Deletetask(name: string) {
        const res = await fetch(`${pathname}/api`, {
            method: "DELETE",
            body: JSON.stringify(name),
        })
        if (res.ok) {
            console.log("DONE")
        }
        else {
            console.log("NOT DONE")
        }

    }
    return (
        <div>
            <Button onPress={() => handleOpen()} className="bg-[#6466F1] rounded-lg text-white py-2 text-sm w-full" >Delete Task</Button>
            <Modal
                size='md'
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Confirm!</ModalHeader>
                            <ModalBody>
                                If you deleted the task, it will get deleted from your database and there by no contribution of your performance in this Task. Are you sure about deleting it?
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={() => { onClose }}>
                                    Cancel
                                </Button>
                                <Button color="primary" onPress={() => { Deletetask(task.name); onClose }}>
                                    Delete Task
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}

export default DeleteTask