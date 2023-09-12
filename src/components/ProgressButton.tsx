'use client'
import React from 'react'
import Chart from '../../public/ChartGif.gif'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Button, CircularProgress } from "@nextui-org/react";
import Image from 'next/image'
import { Tooltip } from "@nextui-org/react";
import { TaskType } from '@/types/TaskType';
import { getProgress } from '@/utils/utillities';

type Props = { tasks: TaskType[] }

const ProgressButton = ({ tasks }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleOpen = () => {
        onOpen();
    }
    function extractProgress(tasks: TaskType[]) {
        const advices = ['Don\'t wait for dealines. Try to finish it two days before the deadline.',
            'Hmm... You can perform better than that. Try to Speed yourself up a bit',
            'That\'s close to become a punctual person! Don\'t Give up easily now!',
            'Whoa. Thats Enough to be a Successful Person. Maintain that pace of yours!']
        const perform: number[] = [];
        var totalPerformance
        var advice
        var sum = 0
        tasks.map((task) => {
            const num = getProgress(task.milestones)
            if (num == 100) {
                const completion = new Date(task.completion);
                const deadline = new Date(task.deadline);

                const daysDifference = (completion.getTime() - deadline.getTime()) / (1000 * 3600 * 24);

                if (daysDifference <= 0) {
                    perform.push(100);
                } else if (daysDifference <= 2) {
                    perform.push(50);
                } else if (daysDifference <= 3) {
                    perform.push(25);
                } else {
                    perform.push(0);
                }
            }
            totalPerformance = perform.reduce((sum, value) => sum + value, 0) / perform.length;
            if (totalPerformance < 25) {
                advice = advices[0];
            }
            else if (totalPerformance >= 25 && totalPerformance < 55) {
                advice = advices[1];
            }
            else if (totalPerformance >= 55 && totalPerformance < 85) {
                advice = advices[2];
            }
            else {
                advice = advices[3];
            }
            sum += num
            console.log(perform)
        })

        const totalProgress = sum / tasks.length
        const result = { progress: totalProgress, performance: totalPerformance, advice: advice }
        return result;
    }
    const progress = extractProgress(tasks)

    return (
        <div>
            <Button onPress={() => handleOpen()} className='bg-[#4B50F7]/10 border-1 border-[#4B50F7] rounded-lg flex  h-10 py-2 px-5 gap-2 my-3' ><Image src={Chart} width={33} alt="Plus" className='-mt-1'></Image><p className="mt-0.5"> Your Progress</p></Button>
            <Modal
                size='md'
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-xl">Your Progress</ModalHeader>
                            <div className='m-5'>
                                <ModalBody>
                                    <div className='flex justify-center gap-5'>
                                        <Tooltip placement='left-start' content={
                                            <div className="px-1 py-2">
                                                <div className="text-small font-bold">Progress</div>
                                                <div className="text-tiny">This is average progress of all the tasks current tasks</div>
                                            </div>
                                        }>
                                            <CircularProgress
                                                label="Progress"
                                                value={progress.progress}
                                                classNames={{
                                                    svg: "w-36 h-36 drop-shadow-md",
                                                    indicator: "stroke-indigo-500",
                                                    track: "stroke-indigo-500/10",
                                                    value: "text-2xl font-semibold text-[#4B50F7]",
                                                    label: "font-medium text-xl"
                                                }}
                                                showValueLabel={true}
                                            />
                                        </Tooltip>
                                        <Tooltip placement='right-start' content={
                                            <div className="px-1 py-2">
                                                <div className="text-small font-bold">Performace</div>
                                                <div className="text-tiny">This is calculated based on your past completion of tasks</div>
                                            </div>
                                        }>
                                            <CircularProgress
                                                label="Performance"
                                                value={progress.performance}
                                                classNames={{
                                                    svg: "w-36 h-36 drop-shadow-md",
                                                    indicator: "stroke-indigo-500",
                                                    track: "stroke-indigo-500/10",
                                                    value: "text-2xl font-semibold text-[#4B50F7]",
                                                    label: "font-medium text-xl"
                                                }}
                                                showValueLabel={true}
                                            />
                                        </Tooltip>
                                        <p></p>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <p className='text-lg font-medium text-center'>{progress.advice}</p>
                                </ModalFooter>
                            </div>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}

export default ProgressButton