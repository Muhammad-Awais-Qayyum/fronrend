import React from 'react'
import ReviewCard from './ReviewCard';

type Props = {}

export const reviews = [
    {
        name: "Mina Davidson",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        profession: "Junior Web Developer | Indonesia",
        comment:

            "SmartStudy stands out as a professional platform offering a wide array of tech courses suitable for various skill levels.The comprehensive curriculum ensures a valuable learning experience for individuals looking to advance in the tech industry.I highly recommend SmartStudy for those seeking to enhance their skills and knowledge",
    },
    {
        name: "John Davidson",
        avatar: "https://randomuser.me/api/portraits/men/5.jpg",
        profession: "Senior Web Developer | India",
        comment:

            "Your content is impressive.The lengthy videos cover everything in detail, making it accessible for beginners to complete projects.Thank you, and I look forward to more.Keep up the great work!",
    },
    {
        name: "Miller Davidson",
        avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        profession: "Junior Web Developer | Indonesia",
        comment:
            "I checked out SmartStudy, a website with diverse tech courses. Impressive selection and quality. Recommended for anyone looking to enhance their skills!",
    },
    {
        name: "Phillip Davidson",
        avatar: "https://randomuser.me/api/portraits/men/4.jpg",
        profession: "Junior Web Developer | Indonesia",
        comment:
            " SmartStudy effectively communicates concepts in a clear and concise manner, accompanied by well-selected examples. It serves as a valuable resource for beginners in programming",
    },
];
const Reviews = (props: Props) => {


    return (
        <div className=' w-full'>
            <h1 className="text-[25px]   text-black dark:text-white font-[500] font-Poppins text-center py-2 800px:!text-[45px]">
                Lets see our students
                <span className="text-gradient-light  dark:bg-gradient-to-r from-[#7e5fd8] to-[#4e88c5] text-transparent"> Reaction</span>
            </h1>
            <div className="w-[95%] 800px:w-[80%] p-2 m-auto">
                <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px]  mb-12 border-0  ">
                    {
                        reviews && reviews.map((i, index) =>
                            <ReviewCard
                                item={i}
                                key={index}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Reviews;