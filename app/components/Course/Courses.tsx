import { useUserAllCourseQuery } from "@/redux/features/course/courseApi";
import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";

type Props = {};

const Courses = (props: Props) => {
    const { data } = useUserAllCourseQuery({});

    const [course, setCourse] = useState<any>([]);

    useEffect(() => {
        setCourse(data?.course);
    }, [data]);

    return (
        <div className="w-[90%] 900px:w-[80%] m-auto">
            <h1 className="text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white 800px:!leading-[60px] text-black font-extrabold tracking-tight">
                Unlock Your Potential with

                <span className="text-gradient-light  dark:bg-gradient-to-r from-[#7e5fd8] to-[#4e88c5] text-transparent"> Comprehensive</span>
                <br />
                <span className="text-gradient-light  dark:bg-gradient-to-r from-[#7e5fd8] to-[#4e88c5] text-transparent">Project-Based </span>
                Courses for Career Growth
            </h1>
            <br />
            <br />

            <div className=" grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4
             1500px:gap-[35px] mb-12  border-0
            ">

                {
                    course &&
                    course.map((item: any, index: number) => (
                        <CourseCard
                            item={item}
                            key={index}
                        />
                    ))
                }


            </div>
        </div>
    );
};

export default Courses;
