'use client'
import { useUserAllCourseQuery } from '@/redux/features/course/courseApi'
import { useGetLayoutQuery } from '@/redux/features/layout/layoutApi'
import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import Heading from '../utils/Heading'
import Header from '../components/Header'
import CourseCard from '../components/Course/CourseCard'
import Footer from '../components/Footer/Footer'

type Props = {}

const Page = (props: Props) => {

    const { data, isLoading } = useUserAllCourseQuery(undefined, {})
    const [route, setRoute] = useState("Login")
    const [open, setOpen] = useState(false)
    const [course, setCourse] = useState<any>([]);

    useEffect(() => {
        setCourse(data?.course);
    }, [data]);

    return (
        <>
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <>

                        <Header open={open} setOpen={setOpen} activeItem={1} route={route} setRoute={setRoute} />

                        <div className=' w-full '>
                            <Heading
                                title={'All Courses'}
                                description='anything'
                                keywords={'LMS,REACT,MERN,NEXTJS'}
                            />
                            <br />
                            <div className="w-[95%] 800px:w-[80%] m-auto">
                                <h1 className="text-[25px] font-[500] font-Poppins text-center py-2 800px:!text-[45px] text-gradient-light  dark:bg-gradient-to-r from-[#7e5fd8] to-[#4e88c5] text-transparent ">All Courses</h1>
                                <br />
                                <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-3 xl:gap-[35px] mb-12 border-0">
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
                            <Footer/>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default Page;