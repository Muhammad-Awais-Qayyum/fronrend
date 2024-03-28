import Image from 'next/image'
import React, { FC } from 'react'
import Ratings from '../Ratings'

type Props = {
    item: any
}

const ReviewCard: FC<Props> = ({ item }) => {
    return (
        <div className=' w-full min-h-[35vh] dark:bg-slate-500 dark:bg-opacity-20
        backdrop-blur border dark:border-[#ffffff1d] border-[#00000015]
dark:shadow-[bg-slate-700] rounded-lg p-3 shadow-sm  dark:shadow-inner'>
            <div className=' flex w-full'>
                <Image
                    src={item.avatar}
                    alt='avatar'
                    width={50}
                    height={50}
                    className=' w-[50px] h-[50px] rounded-full object-cover'
                />
                <div className=' 900px:flex justify-between w-full hidden'>
                    <div className=' pl-4'>
                        <h5 className=' text-[20px]  text-black dark:text-white'>
                            {item.name}
                        </h5>
                        <h6 className=' text-[16px] text-[#000] dark:text-[#ffffffab]'>
                            {item.profession}
                        </h6>
                    </div>
                    <Ratings rating={item.ratings} />
                </div>
                {/* For Mobile*/}
                <div className=' 900px:hidden justify-between w-full  flex flex-col'>
                    <div className=' pl-4'>
                        <h5 className=' text-[20px]  text-black dark:text-white'>
                            {item.name}
                        </h5>
                        <h6 className=' text-[16px] text-[#000] dark:text-[#ffffffab]'>
                            {item.profession}
                        </h6>
                    </div>
                    <Ratings rating={item.ratings} />
                </div>
            </div>

            <p className=' pt-2 px-2 font-Poppins text-black dark:text-white'>
                {item.comment}
            </p>
        </div>
    )
}

export default ReviewCard;