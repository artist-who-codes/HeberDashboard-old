import { headers } from 'next/headers'
import { DataType } from '@/types/DataType'
import TasksDisplay from '@/components/Tasks'
import NoTasks from '@/components/NoTasks'
import ProgressButton from '@/components/ProgressButton'
import Image from 'next/image'
import { ToLocalTime, getLeastDeadline } from '@/utils/utillities'
import TaskForm from '@/components/TaskForm'
import UserBar from "@/components/UserBar"



const loadDataFromServer = async (user: string) => {
    try {
        const headersList = headers();
        const referer = headersList.get('referer');

        if (!referer) {
            return (<div>Loading...</div>)
        }

        const data = await fetch(`${referer}/api`);
        return data.json();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
export default async function Page({ params }: { params: { user: string } }) {
    const user = params.user
    const userData = await loadDataFromServer(user);
    const filter = await userData.data
    const Data: DataType = await filter[0]
    const User = Data.user
    const Tasks = Data.tasks
    const date = new Date();
    const today = ToLocalTime(date)
    const Hour = today.getUTCHours()
    var greeting: string
    var deadline = getLeastDeadline(Tasks)
    console.log(deadline)

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
            <div className='w-[75vw]'>
                <h1 className='bg-[#f7f9fa] px-20 py-5 leading-8 w-[75vw] flex justify-between'>
                    <div>
                        <span className='text-4xl font-bold'>{greeting}!</span><br></br>
                        <span className='text-md font-medium text-[#a7a9d2]'>Here is your List of Tasks <span className='text-[#4B50F7]'>{User}</span></span>
                    </div>
                    <div className='flex gap-5'>
                        {/* <TaskForm /> */}
                        <ProgressButton tasks={Tasks} />
                    </div>
                </h1>
                {Tasks.length !== 0 ?
                    <div className=''>
                        <TasksDisplay args={Tasks} />
                    </div> :
                    <div><NoTasks /></div>}
            </div>
            <div>
                {deadline != undefined
                    ?
                    <UserBar date={deadline} />
                    :
                    <UserBar date={null} />
                }
            </div>
        </div>
    )

}