'use client'

import Image from 'next/image'
import Blob from '../../public/Login/Blob.svg'
import { useState } from 'react'
import { UserType } from '@/types/UserType'
import { useRouter } from 'next/navigation'

const loadDataFromServer = async () => {
    const data = await fetch('/api')
    return data.json()
}
export default function Homepage() {
    const router = useRouter()
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [Users, setUsers] = useState<UserType[]>([])
    const users = loadDataFromServer();
    users.then(response => {
        const usersArray = response.users;
        setUsers(usersArray)
    });
    function Login(name: string, password: string) {
        const Sucess = Users.find((user) => user.user === name && user.password === password)
        console.log(Sucess)
        if (Sucess != undefined) {
            router.push(`/${name}`)
        }
        else {
            router.push(`/Fail`)
        }
    }
    async function SignUp(Name: string, Password: string) {
        const detail = { user: Name, password: Password }
        try {
            const res = await fetch('/api', {
                method: "PUT",  // Use "PUT" or "POST" depending on your API design
                body: JSON.stringify(detail),
            });
            if (res.ok) {
                console.log("Done")
            } else {
                console.log("Not Done")
            }
            Login(Name, password)
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while updating milestones");
        }
    }
    return (

        <div className="bg-cover bg-center pt-24 pb-20 px-52" style={{ backgroundImage: 'url(./Login/Bg.svg)' }}>
            <h2 className="text-4xl font-bold text-center">Welcome To <span className="text-[#4B50F7]">Taskies</span></h2>
            <div className="flex pt-12 gap-24 ">
                <div className="backdrop-blur shadow-lg border-[#ffffff]/20 border-r-2 border-b-2 bg-gradient-to-b from-[#4B50F7]/20 from-0% via-[#4B50F7]/10 to-[#4B50F7]/20 to-100% bg-gradient-to-r from-[#4B50F7]/20 from-0% via-[#4B50F7]/10 to-[#4B50F7]/20 to-100% w-[30vw] py-24 px-10 rounded-[2.5rem] text-center">
                    <h3 className="text-xl font-medium">Sign In to Continue</h3>
                    <input className="bg-[#A7A9D2]/30 rounded-lg px-4 py-2 mt-8 w-full" placeholder="Your Name" type="text" id="name" required onChange={(e) => { setName(e.target.value) }}></input>
                    <input className="bg-[#A7A9D2]/30 rounded-lg px-4 py-2 my-4 w-full" placeholder="Password" type="text" id="password" required onChange={(e) => { setPassword(e.target.value) }}></input>
                    <button className="bg-[#4B50F7] rounded-lg text-white px-6 py-2 mb-10 mx-1" type="submit" onClick={() => { Login(name, password) }}>Log In</button>
                    <button className="bg-[#4B50F7] rounded-lg text-white px-6 py-2 mb-10 mx-1" type="submit" onClick={() => { SignUp(name, password) }}>Sign Up</button>
                    <p>Lazy to create account?<span className=" text-[#4B50F7] font-medium leading-10">Look at Sample Users</span></p>
                </div>
                <Image src={Blob} width={520} alt='Login Image'></Image>
            </div>
        </div>

    )
}