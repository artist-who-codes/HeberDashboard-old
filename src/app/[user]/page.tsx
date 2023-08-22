import { headers } from 'next/headers'
import { DataType } from '@/types/DataType'
import TasksDisplay from '@/components/Tasks'
import NoTasks from '@/components/NoTasks'
import ProgressButton from '@/components/ProgressButton'
import Image from 'next/image'
import { ToLocalTime, getLeastDeadline } from '@/utils/utillities'
import Plus from "../../../public/plus.svg"
import UserBar from "@/components/UserBar"



const loadDataFromServer = async (user: string) => {
    'use server'
    const headersList = headers()
    const referer = headersList.get('referer')
    const data = await fetch(`${referer}/api`)
    return data.json()
}
export default async function Page({ params }: { params: { user: string } }) {
    const user = params.user
    const userData = await loadDataFromServer(user);
    const Data: DataType = userData.data[0]
    const User = Data.user
    const Tasks = Data.tasks
    const date = new Date();
    const today = ToLocalTime(date)
    const Hour = today.getUTCHours()
    var greeting: string
    var deadline = getLeastDeadline(Tasks)

    if (Hour >= 0 && Hour < 12) {
        greeting = "Good Morning";
    }
    else if (Hour > 12 && Hour < 17) {
        greeting = "Good Afternoon";
    }
    else {
        greeting = "Good Evening";
    }
    return (
        <div className='flex'>
            <div>
                <h1 className='bg-[#f7f9fa] px-10 py-5 leading-8 w-[70vw] flex justify-between'>
                    <div>
                        <span className='text-4xl font-bold'>{greeting}!</span><br></br>
                        <span className='text-md font-medium text-[#a7a9d2]'>Here is your List of Taskies {User}</span>
                    </div>
                    <div className='flex gap-5'>
                        <a href={`${User}/TaskForm`}> <button className='bg-[#4B50F7]/10 border-1 border-[#4B50F7] rounded-lg flex w-40 h-10 py-2 px-5 gap-2 my-3'><Image src={Plus} width={20} alt="Plus"></Image><p className="-mt-1"> Add Taskies</p></button></a>
                        <ProgressButton />
                    </div>
                </h1>
                {Tasks.length !== 0 ?
                    <div>
                        <TasksDisplay args={Tasks} />
                    </div> :
                    <div><NoTasks /></div>}
            </div>
            <div>
                {deadline != undefined
                    ?
                    <UserBar date={deadline} />
                    :
                    <div></div>
                }
            </div>
        </div>
    )

}