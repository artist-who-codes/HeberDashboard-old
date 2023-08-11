import { headers } from 'next/headers'

const loadDataFromServer = async (user: string) => {
    const headersList = headers()
    const referer = headersList.get('referer')
    const data = await fetch(`${referer}/api`)
    return data.json()
}
export default async function Page({ params }: { params: { user: string } }) {
    const user = params.user
    const userData = await loadDataFromServer(user);
    const Tasks = userData.tasks[0]
    return (
        <>
            {Tasks.user}
        </>
    )

}