import Logo from "../../public/SideBar/Logo.svg"
import Home from "../../public/SideBar/Home.svg"
import Analytics from "../../public/SideBar/Chart.svg"
import Tasks from "../../public/SideBar/Tasks.svg"
import Settings from "../../public/SideBar/carbon_settings.svg"
import Image from "next/image"
import Link from "next/link"

export default function SideBar() {
    return (
        <>
            <div className="flex flex-col bg-[#f3f4f8] p-6 justify-between h-[100vh]">
                <div>
                    <Image src={Logo} alt="logo" width={35}></Image>
                </div>
                <div className="flex flex-col gap-10">
                    <Link href="/"><Image src={Home} alt="Menu" width={25}></Image></Link>
                    <Link href="/"><Image src={Analytics} alt="Menu" width={25}></Image></Link>
                    <Link href="/"><Image src={Tasks} alt="Menu" width={25}></Image></Link>
                    <Link href="/"><Image src={Settings} alt="Menu" width={25}></Image></Link>
                </div>
            </div>
        </>
    )
}