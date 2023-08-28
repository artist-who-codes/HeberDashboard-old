import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Button } from "@nextui-org/react";
import Image from 'next/image';
import comment from "../../public/TaskCard/Chat.svg"

type Props = { comments: string[] }


const Comment = ({ comments }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleOpen = () => {
        onOpen();
    }
    return (
        <div><Button onPress={() => handleOpen()} className="bg-transparent border-2 border-[#4B50F7]/20"><Image src={comment} alt="creation" width={20}></Image>{comments.length} Comments</Button>
            <Modal
                size='md'
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Comments</ModalHeader>
                            <ModalBody >
                                <div>

                                    {comments.map((comment, key) => {
                                        return (<p key={key}>{key + 1}. {comment}</p>)
                                    })}
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onClick={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}

export default Comment