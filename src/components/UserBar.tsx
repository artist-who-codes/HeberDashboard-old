import Completed from "../../public/Completed.svg"
import Image from "next/image"
import Calendar from "./Calandar"
import Quotes from "../data/Quotes"
import Link from "next/link"
import { FormatDate } from "@/utils/utillities"
type Props = { date: Date }

const UserBar = ({ date }: Props) => {
    const FormattedDate = FormatDate(date)
    const index = Math.floor(Math.random() * 50);
    return (
        <div className="w-[25vw] h-[100vh] bg-[#f3f4f8] p-7 flex flex-col gap-5">
            <div>
                <Image src={Completed} alt="svg" width={300}></Image>
            </div>
            <div>
                <Calendar date1={date} />
                <div className="py-2 ">Next Task Deadline : <b>{FormattedDate}</b></div>
            </div>
            <div>
                <hr className="border-t-2 border-[#6466F1]/20"></hr>
                <div className="my-5 h-[14vh]">
                    <p className="text-xl font-medium">Daily dose of Motivation &#128521;</p>
                    <p>{Quotes[index]}</p>
                </div>
                <hr className="border-t-2 border-[#6466F1]/20"></hr>
            </div>
            <div className="flex justify-center">

                <button className="bg-[#6466F1] rounded-lg text-white py-2 text-sm w-[15vh]"><Link href="/">Log Out</Link></button>
            </div>
        </div>
    )
}
export default UserBar