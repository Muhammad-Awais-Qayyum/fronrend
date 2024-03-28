import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useCreateLayoutMutation, useEditLayoutMutation, useGetLayoutQuery } from "@/redux/features/layout/layoutApi";
import Loader from "../Loader";
import { styles } from "@/app/styles/style";
import { IoMdAddCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";

interface Category {
    title: string | number | readonly string[] | undefined;
    _id: string;

}

const EditCategories = () => {
    const { data, isLoading, refetch } = useGetLayoutQuery("Categories", {
        refetchOnMountOrArgChange: true,
    });
    const [editLayout, { isSuccess, error }] = useEditLayoutMutation();
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        if (data) {
            setCategories(data?.layout?.categories);
        }
    }, [data]);

    useEffect(() => {
        if (isSuccess) {
            refetch();
            toast.success("Categories updated successfully");
        }
        if (error) {
            if ("data" in error) {
                const errorMessage = error.data as any;
                toast.error(errorMessage.message);
            }
        }
        
    }, [error, isSuccess,  refetch]);

    const handleCategoryChange = (id: string, value: string) => {
        setCategories(prevCategories =>
            prevCategories.map(category =>
                category._id === id ? { ...category, title: value } : category
            )
        );
    };

    const handleCategoryDelete = (id: string) => {
        setCategories(prevCategories =>
            prevCategories.filter(category => category._id !== id)
        );
       
    };

    const categoriesHandler = () => {
        // Check if categories array is empty or not initialized
    if (!categories || categories.length === 0) {
        // If no categories exist, initialize categories with a new category
        setCategories([{ title: '',_id:'' }]);
      } else {
        // If categories already exist, add a new category with an empty title
        setCategories(prevCategories => [...prevCategories, { title: '',_id:'' }]);
      }
    }
    const areQuestionsUnchanged = (
        originalCategories: any[],
        newCategories: any[]
    ) => {
        return JSON.stringify(originalCategories) === JSON.stringify(newCategories);
    };

    const isAnyQuestionEmpty = (categories: any[]) => {
        return (
            categories && categories.some((q) => q.title === "")
        );
    };


    const handleEdit = async () => {
       
   
            await editLayout({
                type: "Categories",
                categories: categories,
            }); 
        
    
           
        
    };
    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="w-[90%]  900px:w-[80%] mx-auto mt-[120px]">
                    <h1 className={styles.title}>All Categories</h1>
                    {categories?.map(category => (
                        <div className="p-3" key={category._id}>
                            <div className="flex items-center justify-center w-full">
                                <input
                                    className={`${styles.input} !w-[unset] !border-none !text-[20px]`}
                                    value={category.title}
                                    onChange={e => handleCategoryChange(category._id, e.target.value)}
                                    placeholder="Enter category title..."
                                />
                                <AiOutlineDelete
                                    className="dark:text-white text-black text-[20px] mt-3 cursor-pointer"
                                    onClick={() => handleCategoryDelete(category._id)}
                                />
                            </div>
                        </div>
                    ))}
                    <br />
                    <br />


                    <div className=" w-full flex justify-center">
                        <IoMdAddCircleOutline
                            className="dark:text-white text-black text-[20px] mt-3 cursor-pointer"
                            onClick={categoriesHandler}
                        />
                    </div>

                    <div
                        className={`${styles.button
                            }   !w-[100px] !min-h-[40px] !h-[40px] mt-10 dark:text-white text-black bg-[#cccccc34]
        ${areQuestionsUnchanged(data?.layout?.categories, categories) ||
                                isAnyQuestionEmpty(categories)
                                ? "!cursor-not-allowed"
                                : "!cursor-pointer !bg-[#42d383]"
                            }
         items-center    absolute  right-10`}
                        onClick={
            
                                 handleEdit
                        }
                    >
                        Save
                    </div>
                </div>

            )}
        </>
    );
};

export default EditCategories;


