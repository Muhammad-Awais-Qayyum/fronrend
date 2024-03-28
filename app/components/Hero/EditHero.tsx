/* eslint-disable @next/next/no-img-element */
import { styles } from "@/app/styles/style";
import { useEditLayoutMutation, useGetLayoutQuery } from "@/redux/features/layout/layoutApi";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";

type Props = {};

const EditHero = (props: Props) => {
    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [subTitle, setSubTitle] = useState("");

    const { data, refetch } = useGetLayoutQuery("Banner", {
        refetchOnMountOrArgChange: true,
    });

    const [editLayout, { isSuccess, error, }] = useEditLayoutMutation()
    useEffect(() => {
        if (isSuccess) {
            refetch();
            toast.success("hero updated successfully")
        }

        if (error) {
            if ("data" in error) {
                const errorMessage = error as any;
                toast.error(errorMessage?.data?.message);
            }
        }
    }, [isSuccess, error, refetch]);

    useEffect(() => {
        if (data) {
            setTitle(data?.layout?.banner.title);
            setSubTitle(data?.layout?.banner.subTitle);
            setImage(data?.layout?.banner?.image?.url);
        }
    }, [data]);

    const handleUpdate = (e: any) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (e: any) => {
                if (reader.readyState === 2) {
                    setImage(e.target.result as string);
                }
            };

            reader.readAsDataURL(file);
        }

    };

    const handleEdit = async () => {
        await editLayout({
            type: 'Banner',
            image,
            title,
            subTitle
        })



    }
    return (
        <div className=" w-full  flex  flex-col h-screen  items-center  justify-center           ">
            <div
                className="       1500px:h-[500px] 1500px:w-[500px]
                md:h-[300px] md:w-[300px] sm:h-[250px] sm:w-[250px] h-[200px] w-[200px] hero_animation
                 rounded-[50%] 
            
            "
            >
                <div className=" relative  flex h-[95%] items-center justify-center">
                    <img
                        src={image}
                        alt=""
                        className=" object-contain md:max-w-[90%] sm:[77%] w-[75%] h-[auto]
                     1500px:max-w-[75%] z-[10] rounded-md     
                    "
                    />
                    <input
                        type="file"
                        name=""
                        id="banner"
                        accept="image/*"
                        onChange={handleUpdate}
                        className="hidden"
                    />
                    <label htmlFor="banner" className=" absolute bottom-0  right-50 z-20">
                        <AiOutlineCamera className=" dark:text-white text-black text-[18px] cursor-pointer" />
                    </label>
                </div>


            </div>

            <div className="  w-[80%]     900px:w-[70%]    ">
                <div className=" w-[100%]">
                    <label className=' pb-1 dark:text-white text-black'>
                        Title
                    </label>
                    <input
                        className={`${styles.input}`}
                        value={title}
                        placeholder="Enter your title here"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <br />
                <div>
                    <label className=' pb-1 dark:text-white text-black'>
                        SubTitle
                    </label>
                    <input
                        className={`${styles.input}`}
                        placeholder="Enter your sub title here"
                        value={subTitle}

                        onChange={(e) => setSubTitle(e.target.value)}
                    />
                </div>

                <br />

                <button

                    className={`
${data?.layout?.banner?.title !== title ||
                            data?.layout?.banner?.subTitle !== subTitle ||
                            data?.layout?.banner?.image?.url !== image
                            ? "w-full text-center bg-transparent dark:text-[#fff] rounded-[3px] cursor-pointer h-[40px] border text-black dark:border-[#37a39a] border-[#64b4f6]"
                            : "w-full text-center bg-transparent dark:text-[#fff] rounded-[3px]  h-[40px] border text-black dark:border-[#64b4f6]             border-[#37a39a]  cursor-not-allowed"
                        }
`}
                    onClick={
                        data?.layout?.banner?.title !== title ||
                            data?.layout?.banner?.subTitle !== subTitle ||
                            data?.layout?.banner?.image?.url !== image
                            ? handleEdit
                            : () => null
                    }
                >
                    Save
                </button>


            </div>

        </div>
    );
};
export default EditHero;
