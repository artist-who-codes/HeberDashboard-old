import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Button } from "@nextui-org/react";
import { TaskType } from '@/types/TaskType';
import { MilestoneType } from '@/types/MilestoneType';
import { Checkbox } from '@nextui-org/react';
import { ToObject } from '@/utils/TimeDifference';
import { usePathname } from 'next/navigation'


type Props = { task: TaskType }

const UpdateTask = ({ task }: Props) => {
    const milestones = task.milestones
    const pathname = usePathname()
    const { isOpen, onOpen, onClose } = useDisclosure();
    const today = new Date()


    const handleOpen = () => {
        onOpen();
    }
    const keys = Object.keys(milestones);
    const values = Object.values(milestones);
    var newMilestones: MilestoneType
    const handleChange = (event: any) => {
        console.log(values)
        event.preventDefault()
        const key = event.target.value
        const index = keys.indexOf(key)
        const value = values[index]
        const newValue = !value
        values.splice(index, 1, newValue)
        console.log(values)
        newMilestones = ToObject(keys, values)
    }
    async function handleSubmit() {
        const Name = task.name;
        console.log(today)
        const data = { milestones: newMilestones, name: Name, completion: today };
        try {
            const res = await fetch(`${pathname}/api`, {
                method: "POST",  // Use "PUT" or "POST" depending on your API design
                body: JSON.stringify(data),
                next: { revalidate: 1 }
            });

            if (res.ok) {
                console.log("Done")
            } else {
                console.log("Not Done")
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while updating milestones");
        }
        onClose()
    }

    return (
        <div>
            <Button onPress={() => handleOpen()} className="bg-[#6466F1] rounded-lg text-white py-2 text-sm w-full">Update Task</Button>
            <Modal
                size='md'
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Milestones</ModalHeader>
                            <ModalBody>
                                <div>
                                    <h1 className='text-lg font-bold'>Update What You've Completed!</h1>
                                    <div className='mx-10 my-5'>{keys.map((Key, key) => { return (<div key={key}><Checkbox value={Key} defaultSelected={values[key]} onChange={handleChange}>{Key}</Checkbox><br></br></div>) })}</div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onPress={handleSubmit}>
                                    Submit
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}

export default UpdateTask