import { styles } from '@/app/styles/style';
import { useGetLayoutQuery } from '@/redux/features/layout/layoutApi'
import React, { useEffect, useState } from 'react'
import { HiMinus, HiPlus } from 'react-icons/hi';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md';

type Props = {}

const FAQ = (props: Props) => {
    const { data, isLoading } = useGetLayoutQuery("FAQ", {});

    const [questions, setQuestion] = useState<any[]>([]);
    const [activeQuestion, setActiveQuestion] = useState(null);
    useEffect(() => {
        if (data) {
            setQuestion(data?.layout?.faq);
        }
    }, [data])


    const toogleQuestion = (id: any) => {
        setActiveQuestion(activeQuestion === id ? null : id)
    }
    return (
        <div>
            <div className="w-[90%] 800px:w-[80%] m-auto ">
                <h1 className={`${styles.title} 800px:text-[40px]`}>
                    Frequently Asked <span className="text_animation">Questions</span>
                </h1>
                <div className="mt-12">
                    <dl className="space-y-8 ">
                        {questions &&
                            questions.map((q: any) => (
                                <div
                                    className={`${q.id !== questions[0]?._id && "border-t"
                                        } border-gray-200 pt-6`}
                                    key={q._id}
                                >
                                    <dt className="text-lg">
                                        <button
                                            className="flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none"
                                            onClick={() => toogleQuestion(q._id)}
                                        >
                                            <span
                                                className=' font-medium text-black  dark:text-white'

                                            >{q.question}</span>

                                            <span className="ml-6 flex-shink-0">
                                                {activeQuestion === q._id ? (
                                                    <HiMinus className="h-6 w-6 text-black dark:text-white" />
                                                ) : (
                                                    <HiPlus className="h-6 w-6 text-black dark:text-white" />
                                                )}
                                            </span>
                                        </button>
                                    </dt>
                                    {activeQuestion === q._id && (
                                        <dd className="mt-2 pr-12">
                                            <p className=' text-base font-Poppins text-black dark:text-white'
                                            >{q.answer}</p>

                                        </dd>
                                    )}
                                </div>
                            ))}
                    </dl>
                </div>



                <br />
                <br />

            </div>
        </div >

    );
};


export default FAQ;