import { TaskType } from '@/types/TaskType'
import { Button } from '@nextui-org/react'
import { usePathname } from 'next/navigation'


type Props = { task: TaskType }

const DeleteTask = ({ task }: Props) => {
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
            <Button className="bg-[#6466F1] rounded-lg text-white py-2 text-sm w-full" onClick={() => { Deletetask(task.name) }}>Delete Task</Button>
        </div>
    )
}

export default DeleteTask