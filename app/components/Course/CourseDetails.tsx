import React, { useState } from "react";
import { useSelector } from "react-redux";
import Ratings from "../Ratings";
import { IoCheckboxOutline, IoCheckmarkDone, IoCheckmarkDoneOutline, IoCloseOutline, IoTelescope } from "react-icons/io5";
import NavItem from "../NavItem";
import defaultAvatar from '../../../public/assests/images.png'
import { format } from "timeago.js";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Link from "next/link";
import { styles } from "@/app/styles/style";
import CourseContentList from "./CourseContentList";
import { Elements } from '@stripe/react-stripe-js'
import PaymentForm from "../Payment/PaymentForm";
import Image from "next/image";
import { MdVerified } from "react-icons/md";
type Props = {
    data: any;
    stripePromise: any;
    clientSecret: string;
    setRoute:any,
    setOpen:any
};

const CourseDetails = ({ data, stripePromise, clientSecret,setOpen:AuthModelOpen,setRoute }: Props) => {

    const { user } = useSelector((state: any) => state.auth);
    const [open, setOpen] = useState(false)


    const discountPercentage =
        ((data?.estimatedPrice - data.price) / data?.estimatedPrice) * 100;

    const discountPercentagePrice = discountPercentage.toFixed(0);

    const isPurchased =
        user && user?.courses?.find((item: any) => item._id === data._id);

    const handleOrder = () => {
        if (user) {
            setOpen(true)
        }else{
            setRoute('Login')
            AuthModelOpen(true)
        }
    }




    return (
        <div>
            <div className=" w-[90%] 800px:w-[90%] m-auto py-5">
                <div className=" w-full flex flex-col-reverse 800px:flex-row">
                    <div className=" w-full 800px:w-[65%] 800px:pr-5">
                        <h1 className=" text-[25px] font-Poppins font-[600] text-black dark:text-white">
                            {data.name}
                        </h1>
                        <div className=" flex items-center justify-between pt-3">
                            {
                                data.reviews.map((i: any,index:number) => (
                                    <div key={index} className=" flex items-center">

                                        <Ratings rating={i.rating} />
                                        <h5 className=" text-black dark:text-white">
                                            {data.reviews?.length} Reviews
                                        </h5>
                                    </div>
                                ))
                            }

                            <h5 className=" text-black dark:text-white">{data.purchased} Students</h5>
                        </div>
                        <br />

                        <h1 className="  text-[16px] sm:text-[20px] text-black  900px:text-[25px] font-Poppins font-[600]   dark:text-white">
                            What you will learn from this course?
                        </h1>

                        <div>
                            {data.benefits?.map((item: any, index: number) => (
                                <div
                                    className="w-full flex items-center py-2"

                                    key={index}
                                >
                                    <div className="w-5 mr-1">
                                        <IoCheckmarkDoneOutline size={20} className="text-black dark:text-white" />
                                    </div>
                                    <p className="text-black dark:text-white pl-2">{item.title}</p>
                                </div>
                            ))}
                            <br />
                            <br />
                        </div>
                        <h1 className="  text-[16px] text-black sm:text-[20px]  900px:text-[25px] font-Poppins font-[600] text-balance dark:text-white">
                            What are Prerequisites for  this course?
                        </h1>
                        {data.prerequisites?.map((item: any, index: number) => (
                            <div
                                className="w-full flex items-center py-2"

                                key={index}
                            >
                                <div className="w-5 mr-1">
                                    <IoCheckmarkDoneOutline size={20} className="text-black dark:text-white" />
                                </div>
                                <p className="text-black dark:text-white pl-2">{item.title}</p>
                            </div>
                        ))}
                        <br />
                        <br />
                        <div>
                            <h1 className="  text-[16px] text-black sm:text-[20px]  900px:text-[25px] font-Poppins font-[600] text-balance dark:text-white">
                                Course Overview
                            </h1>
                            {/* Course Content List*/}
                            <CourseContentList isDemo={true} data={data?.courseData} />
                        </div>
                        <br />
                        <br />
                        {/* Course Description*/}
                        <div className=" w-full">
                            <h1 className="  text-[16px] text-black sm:text-[20px]  900px:text-[25px] font-Poppins font-[600] text-balance dark:text-white">
                                Course Details
                            </h1>
                            <p className=" text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden  text-black dark:text-white">
                                {data.description}
                            </p>
                        </div>
                        <br />
                        <br />

                        <div className=" w-full">
                            <div className=" 800px:flex  flex-col   justify-center ">
                                {
                                    data.reviews.map((i: any,index:number) => (
                                        <div key={index} className=" flex  items-center ">
                                            <Ratings rating={i.rating} />
                                            <div className="  mt-1 800px:mt-0 800px:mb-[unset]">
                                                <h5 className="text-[12px] sm:text-[20px] text-black  900px:text-[25px] font-Poppins font-[600] text-balance dark:text-white">
                                                    {i.rating !== undefined
                                                        ? Number.isInteger(i.rating)
                                                            ? i.rating.toFixed(1)
                                                            : i.rating.toFixed(2)
                                                        : "N/A"}{" "}
                                                    Course Rating • {data?.reviews?.length} Reviews
                                                </h5>
                                            </div>
                                        </div>
                                    ))
                                }



                                <br />
                                {data.reviews && [...data.reviews].reverse().map((review: any, index: number) => (
                                    <div key={index} className="w-full pb-4">
                                        <div className="flex ">
                                            <div className="w-[50px] h-[50px]">
                                                <Image src={review.user.avatar ? review.user.avatar.url : defaultAvatar}
                                                    width={50}
                                                    height={50}
                                                    alt={''}
                                                    className='  w-[50px] h-[50px] rounded-full object-cover'
                                                />
                                            </div>


                                            <div className="hidden 800px:block pl-2">
                                                <div className="flex items-center">
                                                    <h5 className="text-[18px] pr-2 text-black dark:text-white">
                                                        {review.user && review.user.name ? review.user.name : ''}
                                                    </h5>
                                                    <Ratings rating={review.rating} />
                                                </div>
                                                <p className=" text-black dark:text-white">{review.review}</p>
                                                <small className=" text-[#000000d1] dark:text-[#ffffff83]">
                                                    {format(review.createdAt)}
                                                </small>
                                            </div>

                                            <div className=" pl-2 flex flex-col 800px:hidden ">
                                                <div className=" flex">
                                                    <h5 className=" text-[18px] pr-2 text-black dark:text-white">{review.user.name}</h5>
                                                    <Ratings rating={review.rating} />
                                                </div>

                                                <p className=" text-black dark:text-white">{review.review}</p>

                                            </div>
                                        </div>
                                        {
                                            review.commentReplies.map((i: any, index: number) => (
                                                <div key={index} className=' w-full  pl-10 flex 800px:pl-16 my-5 text-black dark:text-white'>

                                                    <Image src={i.user.avatar ? i.user.avatar.url : defaultAvatar}
                                                        width={50}
                                                        height={50}
                                                        alt={''}
                                                        className='  w-[50px] h-[50px] rounded-full object-cover'
                                                    />
                                                    <div className=' pl-3 dark:text-white text-black'>
                                                        <div className=' flex items-center'>
                                                            <h5 className=' text-[20px]'>{i.user.name}</h5>
                                                            {
                                                                i.user.role === 'admin' && (
                                                                    <MdVerified className=' text-[20px]  dark:text-green-500 ml-2' />
                                                                )
                                                            }
                                                        </div>
                                                        <p>{i.comment}</p>
                                                        <small className='  text-blue-500  dark:text-[#ffffff83]'>{format(i.createdAt)}</small>


                                                    </div>


                                                </div>
                                            ))
                                        }
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className=" w-full 800px:w-[35%]  relative">
                        <div className=" sticky top-[100px] left-0 z-50 w-full">
                            <CoursePlayer title={data?.title} videoUrl={data?.demoUrl}
                            />
                            <div className=" flex items-center">
                                <h1 className=" pt-5 text-[25px] text-black dark:text-white">
                                    {data.price === 0 ? 'Free' : data.price + '$'}
                                </h1>
                                <h5 className=" pl-3 text-[20px] mt-2 line-through opacity-80 text-black dark:text-white">
                                    {data.estimatedPrice}
                                </h5>
                                <h4 className=" pl-5 pt-4 text-[22px] text-black dark:text-white">
                                    {discountPercentagePrice}% Off
                                </h4>
                            </div>
                            <div className=" flex items-center">
                                {
                                    isPurchased ? (
                                        <Link
                                            className={`${styles.button} !w-[180px] my-3 font-Poppins cursor-pointer !bg-yellow-500     text-white`}
                                            href={`/course-access/${data._id}`}>
                                            Enter to Course
                                        </Link>
                                    ) : (
                                        <div
                                            className={`${styles.button} !w-[180px] my-3 font-Poppins cursor-pointer !bg-yellow-500     text-white`}

                                            onClick={handleOrder}
                                        >
                                            Buy Now {data.price}$
                                        </div>
                                    )
                                }
                            </div>
                            <br />
                            <p className=" pb-1 text-black dark:text-white">• Source code included</p>
                            <p className=" pb-1 text-black dark:text-white">• Full lifetime access</p>
                            <p className=" pb-1 text-black dark:text-white">• Premium Support</p>
                            <p className=" pb-2 text-black dark:text-white">• Certificate of  completion</p>
                        </div>
                    </div>
                </div>


            </div>
            <>
                {
                    open && (
                        <div className=" w-full  h-screen items-center justify-center
                      fixed top-0 left-0 z-50 flex
                     ">
                            <div className=" w-[500px] min-h-[400px] bg-white rounded-xl shadow p-3">
                                <div className=" w-full flex justify-end">
                                    <IoCloseOutline
                                        size={40}
                                        className=" text-black  cursor-pointer"
                                        onClick={() => setOpen(false)}
                                    />
                                </div>
                                <div className=" w-full">
                                    {
                                        stripePromise && clientSecret && (
                                            <Elements stripe={stripePromise} options={{ clientSecret }}>

                                                <PaymentForm user={user} data={data} setOpen={setOpen} />

                                            </Elements>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }
            </>
        </div>
    );
};

export default CourseDetails;
