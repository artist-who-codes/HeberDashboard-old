import React from 'react'
import Chart from '../../public/ChartGif.gif'
import Image from 'next/image'
type Props = {}

const ProgressButton = (props: Props) => {
    return (
        <div>                        <button className='bg-[#4B50F7]/10 border-1 border-[#4B50F7] rounded-lg flex  h-10 py-2 px-5 gap-2 my-3'><Image src={Chart} width={33} alt="Plus" className='-mt-1'></Image><p className="-mt-1"> Your Progress</p></button></div>
    )
}

export default ProgressButton