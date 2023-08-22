import React from 'react'
import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";
import Redglass from "../../public/TaskCard/Red.svg"
import Greenglass from "../../public/TaskCard/Green.svg"
import Image from 'next/image';
import { GetDay, FormatDate } from '@/utils/utillities';
type Props = { date: Date }

const Deadline = ({ date }: Props) => {
    const deadline: string = GetDay(date)
    const Fdate = FormatDate(date)
    return (
        <div><Popover placement="right">
            <PopoverTrigger>
                <Button className="flex gap-2 border-2 bg-transparent border-[#4B50F7]/20 rounded-lg">
                    <Image src={deadline === "Today" || deadline === "Crossed Deadline" ? Redglass : Greenglass} alt="creation" width={15}></Image>
                    <p >{deadline}</p></Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className="px-1 py-2">
                    <div className="text-small font-bold">Deadline</div>
                    <div className="text-tiny">{Fdate}</div>
                </div>
            </PopoverContent>
        </Popover></div>
    )
}

export default Deadline