import NoData from '../../public/NoData.svg'
import Image from 'next/image'
import TaskForm from './TaskForm'
export default function NoTasks() {
    return (

        <div className='flex flex-col w-[70vw] items-center my-10 text-[#a7a9d2] font-medium'>
            <Image src={NoData} width={400} className='opacity-80' alt="Nodata.svg"></Image>
            No Tasks Found
            <TaskForm />
        </div>
    )
}