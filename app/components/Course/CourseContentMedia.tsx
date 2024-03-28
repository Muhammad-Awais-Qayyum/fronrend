import { styles } from '@/app/styles/style'
import CoursePlayer from '@/app/utils/CoursePlayer'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { AiFillStar, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineStar } from 'react-icons/ai'
import defaultAvatar from '../../../public/assests/images.png'
import toast from 'react-hot-toast'
import { useAddAnswerQuestionMutation, useAddAnswerReviewMutation, useAddNewQuestionMutation, useAddReviewInCourseMutation, useGetCourseDetailsQuery } from '@/redux/features/course/courseApi'
import { format } from 'timeago.js'
import { MdVerified } from "react-icons/md";
import { BiMessage } from 'react-icons/bi'
import Ratings from '../Ratings'
import socketio from 'socket.io-client';
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || '';
const socketid = socketio(ENDPOINT, { transports: ['websocket'] });

type Props = {
    data: any
    id: string
    userData: any
    activeVideo: number
    setActiveVideo: (activeVideo: number) => void
    refetch: any
}

const CourseContentMedia = ({ data, refetch, userData, id, activeVideo, setActiveVideo }: Props) => {
    const [activeBar, setActiveBar] = useState(0)
    const [question, setQuestion] = useState('')
    const [review, setReview] = useState('')
    const [answer, setAnswer] = useState('')
    const [questionId, setQuestionId] = useState('')
    const [reviewID, setReviewID] = useState('')
    const [rating, setRating] = useState(1)
    const [isReviewReply, setisReviewReply] = useState(false)
    const [reply, setReply] = useState('')

    const [addNewQuestion, { isLoading, error, isSuccess }] = useAddNewQuestionMutation()
    const [addAnswerQuestion, { isLoading: answerLoading, error: answerError, isSuccess: answerSuccess }] = useAddAnswerQuestionMutation()
    const [addReviewInCourse, { isLoading: reviewLoading, error: reviewError, isSuccess: reviewSuccess }] = useAddReviewInCourseMutation()
    const { data: CourseItem, refetch: courseRefetch } = useGetCourseDetailsQuery({ id }, { refetchOnMountOrArgChange: true })
    const [addAnswerReview, { isLoading: reviewAnswerLoading, error: reviewAnswerError, isSuccess: reviewAnswerSuccess }] = useAddAnswerReviewMutation()
    const CourseData = CourseItem?.course

    // check course review is exists y not
    const isReviewExists = CourseData?.reviews?.find((item: any) => item.user._id === userData._id)

    // handle Question

    const handleQuestion = () => {
        if (question.length === 0) {
            toast.error("Question can't be empty")
        } else {
            addNewQuestion({
                question,
                courseId: id,
                contentId: data[activeVideo]._id
            })

        }

    }

    // handleReply Qusetion
    const handleAnswerSubmit = () => {
        addAnswerQuestion({
            answer,
            courseId: id,
            contentId: data[activeVideo]._id,
            questionId: questionId
        })
    }

    // handel Review Submit
    const handleReviewSubmit = () => {
        if (review.length === 0) {
            toast.error("Review can't be empty")
        } else {
            addReviewInCourse({
                review,
                rating,
                courseId: id,
            })
        }
    }

    // handle Review Reply Submit

    const handleAnswerReviewSubmit = () => {
        addAnswerReview({
            comment: reply,
            courseId: id,
            reviewId: reviewID
        })
    }
    useEffect(() => {
        if (isSuccess) {
            setQuestion('')
           
            refetch()
            toast.success("Question Added Successfully!")
            socketid.emit('notification', {
                title: 'New Question Recevied',
                message: `You have a new question in ${data[activeVideo].title}`,
                userId: userData._id
            })
        }
        if (answerSuccess) {
            setAnswer('')
            refetch()
            toast.success("Question Reply Successfully!")
            if (userData.role !=='admin') {
                socketid.emit('notification', {
                    title: 'New Reply Recevied',
                    message: `You have a new question reply in ${data[activeVideo].title}`,
                    userId: userData._id
                })
            }
        }
        if (error) {
            if ("data" in error) {
                const errorMessage = error as any;
                toast.error(errorMessage.data.message)
            }
        }
        if (answerError) {
            if ("data" in answerError) {
                const errorMessage = answerError as any;
                toast.error(errorMessage.data.message)
            }
        }
        if (reviewSuccess) {
            setReview('')
            setRating(1)
            courseRefetch()
            toast.success("Review Added successfully!")
            socketid.emit('notification', {
                title: 'New Review Recevied',
                message: `You have a new question in ${data[activeVideo].title}`,
                userId: userData._id
            })

        }
        if (reviewError) {
            if ("data" in reviewError) {
                const errorMessage = reviewError as any;
                toast.error(errorMessage.data.message)
            }
        }
        if (reviewAnswerSuccess) {
            setReply('')
            courseRefetch()
            toast.success("Review Reply Added successfully!")

        }
        if (reviewAnswerError) {
            if ("data" in reviewAnswerError) {
                const errorMessage = reviewAnswerError as any;
                toast.error(errorMessage.data.message)
            }
        }
    }, [isSuccess, courseRefetch,data,refetch,userData._id,userData.role,activeVideo,error, answerError, answerSuccess, reviewError, reviewSuccess, reviewAnswerError, reviewAnswerSuccess])

    return (
        <div className='   w-[95%] 800px:w-[86%] py-4 m-auto'>
            <CoursePlayer
                title={data[activeVideo]?.title}
                videoUrl={data[activeVideo]?.videoUrl}
            />

            <div className='  w-full flex items-center justify-between my-3'>
                <div className={`${styles.button} !w-[unset] !min-h-[45px] !py-[unset] ${activeVideo === 0 && "!cursor-no-drop opacity-[.8]"
                    }`}
                    onClick={() => setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)}
                >
                    <AiOutlineArrowLeft className=' mr-2' />
                    Prev Lesson
                </div>
                <div
                    className={`${styles.button}  !w-[unset] !min-h-[45px] !py-[unset] ${activeVideo === 1 && "!cursor-no-drop opacity-[.8]"
                        }`}
                    onClick={() => setActiveVideo(data && data.length - 1 === activeVideo ? activeVideo : activeVideo + 1)}
                >
                    Next Lesson
                    <AiOutlineArrowRight className=' ml-2' />
                </div>
            </div>
            <h1 className=' pt-2 text-[25px] font-[600] dark:text-white text-black'>{data[activeVideo].title}</h1>
            <br />
            <div className=' w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20  backdrop-blur
          shadow-[bg-slate-700] rounded shadow-inner
         '>
                {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
                    <h5
                        key={index}
                        className={` 800px:text-[20px]  text-white    cursor-pointer ${activeBar === index && "   text-[#7e5fd8]"}
                       }`}
                        onClick={() => setActiveBar(index)}
                    >
                        {text}
                    </h5>
                ))}
            </div>
            <br />
            {
                activeBar === 0 && (
                    
                       <p className='  overflow-hidden  text-[12px]  sm:text-[15px] 800px:text-[18px]    whitespace-pre-line mb-3 dark:text-white text-black'>
                        {data[activeVideo]?.description}
                    </p>  
                    
                   
                )
            }

            {
                activeBar === 1 && (
                    <div>
                        {data[activeVideo]?.links.map((link: any, index: number) => (
                            <div className=' mb-5' key={index}>
                                <h2 className=' 800px:text-[20px] text-black dark:text-white 800px:inline-block'>
                                    {link.title && link.title + ":"}
                                </h2>
                                <a
                                    className=' inline-block text-[#4395c4] 800px:text-[20px] 800px:pl-2'
                                    href={link.url}>
                                    {link.url}
                                </a>
                            </div>
                        ))}
                    </div>
                )
            }

            {
                activeBar === 2 && (
                    <>
                        <div className='   flex w-full'>

                            <Image src={userData.avatar ? userData.avatar.url : defaultAvatar}
                                width={50}
                                height={50}
                                alt={''}
                                className='  w-[50px] h-[50px]  rounded-full  object-cover  '
                            />

                            <textarea
                                name=''
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                id=''
                                cols={40}
                                rows={5}
                                placeholder='Write your comment...'
                                className=' outline-none text-black dark:text-white bg-transparent ml-3 border border-black dark:border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins'
                            ></textarea>

                        </div>
                        <div className=' w-full flex justify-end'>
                            <div
                                className={`${styles.button} !w-[120px] !h-[40px] text-[18px] mt-5 ${isLoading && ' cursor-not-allowed'
                                    }`}
                                onClick={isLoading ? () => { } : handleQuestion}
                            >
                                Submit
                            </div>
                        </div>
                        <br />
                        <br />

                        <div className=' w-full h-[1px] '>
                            {/* Qusetion reply*/}
                            <div >
                                <CommentReply
                                    data={data}
                                    activeVideo={activeVideo}
                                    answer={answer}
                                    setAnswer={setAnswer}
                                    handleAnswerSubmit={handleAnswerSubmit}
                                    user={userData}
                                    setQuestionId={setQuestionId}
                                    answerLoading={answerLoading}
                                    questionId={questionId}
                                />
                            </div>
                        </div>

                    </>
                )
            }

            {
                activeBar === 3 && (
                    <div className=' w-full'>

                        {

                            !isReviewExists && (
                                <>
                                    <div className=' w-full flex '>
                                        <Image src={userData.avatar ? userData.avatar.url : defaultAvatar}
                                            width={50}
                                            height={50}
                                            alt={''}
                                            className='  w-[50px] h-[50px] rounded-full object-cover'
                                        />

                                        <div className=' w-full'>
                                            <h5 className=' pl-3 text-[20px] font-[600] dark:text-white text-black'>
                                                Give a rating <span className=' text-red-500'>☆</span>
                                            </h5>

                                            <div className=' flex w-full ml-2 pb-3'>
                                                {[1, 2, 3, 4, 5].map((i) =>
                                                    rating >= i ? (
                                                        <AiFillStar
                                                            key={i}
                                                            className=' mr-1 cursor-pointer'
                                                            color='rgb(246,186,0)'
                                                            size={25}
                                                            onClick={() => setRating(i)}
                                                        />
                                                    ) : (
                                                        <AiOutlineStar
                                                            key={i}
                                                            className=' mr-1 cursor-pointer'
                                                            color='rgb(246,186,0)'
                                                            size={25}
                                                            onClick={() => setRating(i)}
                                                        />
                                                    )
                                                )}
                                            </div>
                                            <textarea
                                                name=''
                                                value={review}
                                                onChange={(e) => setReview(e.target.value)}
                                                id=''
                                                cols={40}
                                                rows={5}
                                                placeholder='Write your comment...'
                                                className=' outline-none text-black dark:text-white bg-transparent ml-3 border border-black dark:border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins'
                                            ></textarea>
                                        </div>

                                    </div>
                                    <div className=' w-full flex justify-end'>
                                        <div
                                            className={`${styles.button} !w-[120px] !h-[40px] text-[18px] mt-5 ${reviewLoading && 'cursor-not-allowed'
                                                }`}
                                            onClick={reviewLoading ? () => { } : handleReviewSubmit}
                                        >
                                            Submit
                                        </div>
                                    </div>
                                </>

                            )


                        }
                        <br />
                        <div className=' w-full h-[1px] bg-[#ffffff3b]'>
                            <div className=' w-full pt-2'>
                                {
                                    (CourseData?.reviews && [...CourseData.reviews].reverse()).map((item: any, index: number) => (
                                        <div className=' w-full my-5' key={index}>
                                            <div className=' w-full flex'>
                                                <div>
                                                    <Image
                                                        src={item.user.avatar ? item.user.avatar.url : defaultAvatar}
                                                        width={50}
                                                        height={50}
                                                        alt={''}
                                                        className=' w-[50px] h-[50px] rounded-full object-cover'
                                                    />
                                                </div>
                                                <div className=' ml-2 dark:text-white text-black'>
                                                    <h1 className=' text-[18px]'>{item.user.name}</h1>
                                                    <Ratings rating={item.rating} />
                                                    <p>{item.review}</p>
                                                    <small className=' text-blue-500 dark:text-[#ffffff83]'>{format(item.createdAt)}</small>
                                                </div>
                                            </div>
                                            {
                                                userData.role === 'admin' && item.commentReplies === 0 && (
                                                    <span className={`${styles.label} !ml-14 cursor-pointer`}
                                                        onClick={() => {
                                                            setReviewID(item._id)
                                                            setisReviewReply(!isReviewReply)
                                                        }
                                                        }
                                                    >
                                                        Add Reply
                                                    </span>

                                                )


                                            }
                                            {
                                                isReviewReply && reviewID === item._id && (
                                                    <div className='  pb-1 w-full flex relative'>
                                                        <input type="text" name="" id="" placeholder='Enter your reply...'

                                                            value={reply}
                                                            onChange={(e) => setReply(e.target.value)}
                                                            className={` block text-black dark:text-white border-[#000]  800px:ml-12 mt-2 outline-none bg-transparent  border-b dark:border-[#fff] p-[5px] w-[95%] ${answer === '' || answerLoading && 'cursor-not-allowed'
                                                                }`}
                                                        />
                                                        <button
                                                            type='submit'
                                                            className=' absolute right-0 bottom-1'

                                                            onClick={handleAnswerReviewSubmit}
                                                            disabled={reply === '' || reviewAnswerLoading}

                                                        >
                                                            Submit
                                                        </button>
                                                    </div>
                                                )
                                            }
                                            {
                                                item.commentReplies.map((i: any, index: number) => (
                                                    <div key={index} className='  pl-12 w-full flex 800px:ml-16 my-5 text-black dark:text-white'>

                                                        <Image src={i.user.avatar ? i.user.avatar.url : defaultAvatar}
                                                            width={50}
                                                            height={50}
                                                            alt={''}
                                                            className='  w-[50px] h-[50px] rounded-full object-cover'
                                                        />
                                                        <div className=' pl-3 pb-6 dark:text-white text-black'>
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


                                    ))
                                }

                            </div>
                        </div>





                    </div>
                )
            }
        </div >
    )
};


const CommentReply = ({
    data,
    activeVideo,
    answer,
    setAnswer,
    handleAnswerSubmit,
    setQuestionId,
    answerLoading,
    questionId
}: any) => {
    return (
        <>
            <div className=' w-full my-3'>
                {
                    data[activeVideo].questions.map((item: any, index: any) => (
                        <CommentItem
                            key={index}
                            data={data}
                            activeVideo={activeVideo}
                            item={item}
                            index={index}
                            answer={answer}
                            setAnswer={setAnswer}
                            handleAnswerSubmit={handleAnswerSubmit}
                            setQuestionId={setQuestionId}
                            answerLoading={answerLoading}
                            questionId={questionId}
                        />
                    ))
                }
            </div>
        </>
    )
}

const CommentItem = ({
    item,
    answer,
    setAnswer,
    handleAnswerSubmit,
    questionId,
    answerLoading, setQuestionId,
}: any) => {
    const [replyActive, setReplyActive] = useState(false)

    return (
        <>
            <div className=' my-4'>
                <div className=' flex mb-2'>
                    <div>
                        <Image src={item.user.avatar ? item.user.avatar.url : defaultAvatar}
                            width={50}
                            height={50}
                            alt={''}
                            className='  w-[50px] h-[50px] rounded-full object-cover'
                        />
                    </div>

                    <div className=' pl-3 dark:text-white text-black'>
                        <h5 className=' text-[20px]'>{item.user.name}</h5>
                        <p>{item.question}</p>
                        <small className='  text-blue-500  dark:text-[#ffffff83]'>{format(item.createdAt)}</small>
                    </div>
                </div>
                <div className='  pb-6 w-full flex'>
                    <span
                        className=' 800px:px-16  text-[#000000b8] cursor-pointer mr-2 dark:text-[#ffffff83]'
                        onClick={() => setQuestionId(item._id) || setReplyActive(!replyActive)}
                    >
                        {!replyActive ? item.questionReplies.length !== 0 ? "All Replies" : "Add Reply" : "Hide Replies"}
                    </span>
                    <BiMessage size={20} className=' cursor-pointer text-[#000000b8] dark:text-white' />
                    <span className=' pl-1 mt-[-4px] cursor-pointer  text-[#000000b8] dark:text-[#ffffff83]'>
                        {item.questionReplies.length}
                    </span>
                </div>
                {
                    replyActive && questionId === item._id  &&(
                        <>
                            {item.questionReplies.map((item: any,index:number) => (
                                <div key={index} className='  pl-12 w-full flex 800px:ml-16 my-5 text-black dark:text-white'>

                                    <Image src={item.user.avatar ? item.user.avatar.url : defaultAvatar}
                                        width={50}
                                        height={50}
                                        alt={''}
                                        className='  w-[50px] h-[50px] rounded-full object-cover'
                                    />
                                    <div className=' pl-3 dark:text-white text-black'>
                                        <div className=' flex items-center'>
                                            <h5 className=' text-[20px]'>{item.user.name}</h5>
                                            {
                                                item.user.role === 'admin' && (
                                                    <MdVerified className=' text-[20px]  dark:text-green-500 ml-2' />
                                                )
                                            }
                                        </div>
                                        <p>{item.answer}</p>
                                        <small className='  text-blue-500  dark:text-[#ffffff83]'>{format(item.createdAt)}</small>


                                    </div>


                                </div>
                            ))}

                            <>
                                <div className=' pb-6    w-full flex relative'>
                                    <input type="text" name="" id="" placeholder='Enter your reply...'

                                        value={answer}
                                        onChange={(e) => setAnswer(e.target.value)}
                                        className={` block text-black dark:text-white  800px:ml-12 mt-2 outline-none bg-transparent border-[#00000027]  border-b dark:border-[#fff] p-[5px] w-[95%] ${answer === '' || answerLoading && 'cursor-not-allowed'
                                            }`}
                                    />
                                    <button
                                        type='submit'
                                        className=' text-black  dark:text-white absolute right-0 bottom-6'

                                        onClick={handleAnswerSubmit}
                                        disabled={answer === '' || answerLoading}

                                    >
                                        Submit
                                    </button>
                                </div>
                            </>
                        </>
                    )
                }
            </div>
        </>
    )
}

export default CourseContentMedia;