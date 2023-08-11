import { headers } from "next/headers"

const loadDataFromServer = async () => {
    const headersList = headers()
    const referer = headersList.get('referer')
    const data = await fetch(`${referer}api`)
    return data.json()
}
export default async function Homepage() {
    const userTasks = await loadDataFromServer();
    console.log(userTasks.tasks)
    return (
        <>
            home
        </>
    )
}