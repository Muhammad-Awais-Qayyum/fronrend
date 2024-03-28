import React, { FC } from "react";
import CoursePlayer from "../utils/CoursePlayer";
import { styles } from "../styles/style";
import Ratings from "./Ratings";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseData: any;
  handleCourseCreate: any;
  isEdit?: boolean;
};

const CoursePreview: FC<Props> = ({
  active,
  setActive,
  courseData,
  handleCourseCreate,
  isEdit
}) => {
  const discountPercentage =
    ((courseData?.estimatedPrice - courseData?.price) /
      courseData?.estimatedPrice) *
    100;

  const discountPercentagePrice = discountPercentage.toFixed(0);
  const handlePrevoius = () => {
    setActive(active - 1);
  };

  const createCourse = () => {
    handleCourseCreate();
  };
  return (
    <div className=" w-[80%]  m-auto py-5 mb-5">
      <div className=" w-full relative">
        <div className=" w-full mt-16 900px:mt-10">
          <CoursePlayer
            videoUrl={courseData?.demoUrl}
            title={courseData?.title}
          />
        </div>
        <div className=" flex items-center">
          <h1 className=" pt-5 text-[14px]  sm:text-[25px] dark:text-white">
            {courseData?.price === 0 ? "Free" : courseData?.price + "$"}
          </h1>
          <h5 className=" pl-3 text-[14px]  sm:text-[20px] dark:text-white mt-2 line-through opacity-50">
            {courseData?.estimatedPrice}$
          </h5>

          <h4 className=" pl-5 pt-4 text-[14px] sm:text-[22px] dark:text-white">
            {discountPercentagePrice}% Off
          </h4>
        </div>

        <div className=" flex items-center">
          <div
            className={`${styles.button} text-[8px] sm:text-lg !w-[110px] sm:!w-[180px] my-3
           font-Poppins  
           !bg-yellow-500     text-white  cursor-not-allowed
          `}
          >
            Buy Now {courseData?.price}$
          </div>
        </div>

        <div className=" flex items-center">
          <input
            type="text"
            name=""
            id=""
            placeholder="Discount code..."
            className={`${styles.input} !w-[60%] ml-2 !mt-0`}
          />
          <div
            className={`${styles.button} text-[10px]  !w-[110px] sm:text-lg sm:!w-[120px] my-3 ml-4 font-Poppins cursor-pointer`}
          >
            Apply
          </div>
        </div>

        <ul className=" text-[15px] md:text-[18px]  list-disc dark:text-white">
          <li>Source code included</li>
          <li>Full lifetime access</li>
          <li>Certificate of completion</li>
          <li>Premium Support</li>
        </ul>
      </div>

      <div className=" w-full ">
        <div className=" w-full 900px:pr-5">
          <h1 className=" text-[20px] mt-1  sm:text-[25px] dark:text-white  font-Poppins font-[600]">
            {courseData?.name}
          </h1>
          <div className=" flex items-center  justify-between pt-3">
            <div className=" flex items-center">
              <Ratings rating={0} />
              <h5 className=" dark:text-white text-[10px] sm:text-[20px]">
                0 Reviews
              </h5>
            </div>
            <h5 className=" dark:text-white text-[10px] sm:text-[20px]">
              0 Students
            </h5>
          </div>
          <br />
          <h1 className=" dark:text-white text-[12px] sm:text-[25px] font-Poppins font-[600]">
            What you will learn from this course?
          </h1>
        </div>
        {courseData?.benefits?.map((item: any, index: number) => (
          <div
            className=" dark:text-white w-full flex 900px:item-center py-2"
            key={index}
          >
            <div className=" w-[15px] mr-1">
              <IoCheckmarkDoneOutline size={20} />
            </div>
            <p className=" pl-2  text-[12px] sm:text-[16px]">{item.title}</p>
          </div>
        ))}
        <br />
        <br />
        <h1 className=" dark:text-white text-[12px] sm:text-[25px] font-Poppins font-[600]">
          What are the prerequisite for this course?
        </h1>

        {courseData?.prerequisites?.map((item: any, index: number) => (
          <div
            className=" dark:text-white w-full flex items-center py-2"
            key={index}
          >
            <div className="w-[15px] mr-1">
              <IoCheckmarkDoneOutline size={20} />
            </div>
            <p className="pl-2  text-[12px] sm:text-[16px]">{item.title}</p>
          </div>
        ))}
        <br />
        <br />
        {/* Course Description*/}
        <div className="  dark:text-white w-full">
          <h1 className="  text-[20px] sm:text-[25px] font-Poppins font-[600]">
            Course Details
          </h1>
          <p className=" text-[12px] mt-[20px] whitespace-pre-line w-full overflow-hidden sm:text-[16px]">
            {courseData?.description}
          </p>
        </div>
        <br />
        <br />
      </div>

      <div className=" w-full space-x-5 800px:space-x-0 flex items-center justify-between">
        <div
          className="w-full flex items-center justify-center 800px:w-[180px]  h-[40px]
          bg-[#37a39a] text-center text-[#fff]   rounded
          mt-8 cursor-pointer"
          onClick={() => handlePrevoius()}
        >
          Prev
        </div>
        <div
          className="w-full flex items-center justify-center 800px:w-[180px]  h-[40px]
          bg-[#37a39a] text-center text-[#fff]   rounded
          mt-8 cursor-pointer"
          onClick={() => createCourse()}
        >
          {
            isEdit ? 'Update' : 'Create'
          }
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
