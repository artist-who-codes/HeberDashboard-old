import NoData from '../../public/NoData.svg'
import Image from 'next/image'
export default function NoTasks() {
    return (

        <div className='flex flex-col w-[70vw] items-center my-10 text-[#a7a9d2] font-medium'>
            <Image src={NoData} width={400} className='opacity-80' alt="Nodata.svg"></Image>
            No Tasks Found
            <button className='bg-[#4B50F7] rounded-lg text-white px-6 py-2 my-5'>+ Add Task</button>
        </div>
    )
}