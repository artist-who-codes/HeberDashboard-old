import React from 'react'
import TaskForm from '@/components/TaskForm'
type Props = {}

const page = (props: Props) => {


    return (
        <div className='w-[70vw]'>
            <h1 className='text-3xl font-bold'>Adding a New Taskie! </h1>
            <TaskForm />
        </div >
    )
}

export default page