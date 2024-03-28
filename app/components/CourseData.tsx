import React, { FC } from "react";
import { styles } from "../styles/style";
import { IoAddCircleOutline } from "react-icons/io5";
import toast from "react-hot-toast";
type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisties: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
  benefits,
  setPrerequisites,
  setBenefits,
  prerequisites,
  setActive,
  active,
}) => {
  const handleBenefitChange = (index: number, value: any) => {
    // Create a shallow copy of the benefits array
    const updatedBenefits = [...benefits];
    // Create a new object with the updated title at the specified index
    updatedBenefits[index] = { ...updatedBenefits[index], title: value };
    // Update the state with the new array
    setBenefits(updatedBenefits);
};

  const handleAddBenefits = () => {
    setBenefits([...benefits, { title: "" }]);
  };

  const handlePrerequisitesChange = (index: number, value: any) => {
    // Create a shallow copy of the prerequisites array
    const updatedPrerequisites = [...prerequisites];
    // Create a new object with the updated title at the specified index
    updatedPrerequisites[index] = { ...updatedPrerequisites[index], title: value };
    // Update the state with the new array
    setPrerequisites(updatedPrerequisites);
};

  const handleAddPrerequisites = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };

  const handleOptions = () => {
    if (
      benefits[benefits.length - 1]?.title !== "" &&
      prerequisites[prerequisites.length - 1]?.title !== ""
    ) {
      setActive(active + 1);
    } else {
      toast.error("Please fill the fields for go to next!");
    }
  };

  const handlePrevoius = () => {
    setActive(active - 1);
  };
  return (
    <>
      <div className=" w-[100%]   m-auto px-5  900px:w-[80%] mt-24   ">
        <div>
          <label className={`${styles.label}`} htmlFor="email">
            Course Benefits
          </label>
          <br />
          {benefits.map((benefit: any, index: number) => (
            <input
              type="text"
              key={index}
              name="Benefits"
              placeholder="You will be able to build a full stack LMS Platform..."
              required
              className={`${styles.input} mb-1`}
              value={benefit.title}
              onChange={(e) => handleBenefitChange(index, e.target.value)}
            />
          ))}
          <IoAddCircleOutline
            size={25}
            className=" mt-[12px] cursor-pointer dark:text-white text-black"
            onClick={handleAddBenefits}
          />
        </div>

        <div className=" mt-2">
          <label className={`${styles.label}`} htmlFor="email">
            Course Prerequisites
          </label>
          <br />
          {prerequisites.map((prerequisites: any, index: number) => (
            <input
              type="text"
              key={index}
              name="prerequisites"
              placeholder="You need basic Knowledge of MERN stack"
              required
              className={`${styles.input} mb-1`}
              value={prerequisites.title}
              onChange={(e) => handlePrerequisitesChange(index, e.target.value)}
            />
          ))}
          <IoAddCircleOutline
            size={25}
            className=" mt-[12px] cursor-pointer dark:text-white text-black"
            onClick={handleAddPrerequisites}
          />
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
            onClick={() => handleOptions()}
          >
            Next
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseData;
