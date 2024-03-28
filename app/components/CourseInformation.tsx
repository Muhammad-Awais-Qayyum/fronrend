import React, { FC, useEffect, useState } from "react";
import { styles } from "../styles/style";
import EditCategories from "./Categories/EditCategories";
import { useGetLayoutQuery } from "@/redux/features/layout/layoutApi";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
};

const CourseInformation: FC<Props> = ({
  active,
  setActive,
  courseInfo,
  setCourseInfo,
}) => {

  const { data, isLoading, refetch } = useGetLayoutQuery("Categories", {
    refetchOnMountOrArgChange: true,
  });
  const [category, setCategories] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setCategories(data?.layout?.categories );
    }
  }, [data]);
  const [dragging, setDragging] = useState(false);

  // Handle Submit
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };

  // image Handler
  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // handleDragOver
  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  // handleDragLeave
  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  // handle Drop

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      };

      reader.readAsDataURL(file);
    }
  };


  return (
    <div className=" w-[100%] px-5  900px:w-[80%] mt-24 m-auto ">
      <form onSubmit={handleSubmit}>
        <div>
          <label className={`${styles.label}`}>Cousre Name</label>

          <input
            type="name"
            name=""
            required
            value={courseInfo.name}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            id="name"
            placeholder="Mern stack LMS platform with Next 14"
            className={`${styles.input}`}
          />
        </div>
        <br />

        <div className=" mb-5">
          <label className={`${styles.label}`}>Cousre Description</label>
          <textarea
            name=""
            id=""
            cols={30}
            rows={6}
            placeholder="Write something amazing..."
            className={`${styles.input} !h-min !py-2`}
            value={courseInfo.description}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
          ></textarea>
        </div>
        <br />

        <div className=" w-full flex justify-between">
          <div className=" w-[45%]">
            <label className={`${styles.label}`}>Cousre Price</label>

            <input
              type="number"
              name=""
              required
              value={courseInfo.price}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
              id="price"
              placeholder="29"
              className={`${styles.input}`}
            />
          </div>
          <div className=" w-[50%]">
            <label className={`${styles.label}`}>Estimated Price</label>

            <input
              type="number"
              name=""
              required
              value={courseInfo.estimatedPrice}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
              }
              id="price"
              placeholder="79"
              className={`${styles.input}`}
            />
          </div>
        </div>
        <br />

        <div className=" w-full flex justify-between">
          <div className=" w-[45%]">
            <label className={`${styles.label}`}>Course Tags</label>
            <input
              type="text"
              required
              name=""
              value={courseInfo.tags}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, tags: e.target.value })
              }
              id="tags"
              placeholder="Mern,Next 14, Socket io,LMS,Mern"
              className={`${styles.input}`}
            />
          </div>
          <div className=" w-[50%]">
            <label className={`${styles.label}`}>Categories</label>

            <select name="" id="" className={`${styles.input} dark:!bg-black`}
              value={courseInfo.categories}
              onChange={(e: any) => setCourseInfo({ ...courseInfo, categories: e.target.value })}
            >
              <option value="">Select Category</option>
              {
                category?.map((category: any) => (
                  <option value={category.title} key={category._id}>
                    {category.title}
                  </option>
                ))
              }
            </select>
          </div>
        </div>
        <br />

        <div className=" w-full flex justify-between">
          <div className=" w-[45%]">
            <label className={`${styles.label}`}>Cousre Level</label>

            <input
              type="text"
              name=""
              required
              value={courseInfo.level}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
              id="level"
              placeholder="Beginner/Intermediate/Expert"
              className={`${styles.input}`}
            />
          </div>
          <div className=" w-[50%]">
            <label className={`${styles.label}`}>Demo Url</label>

            <input
              type="text"
              name=""
              required
              value={courseInfo.demoUrl}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
              }
              id="demoUrl"
              placeholder="eer74fd"
              className={`${styles.input}`}
            />
          </div>
        </div>
        <br />
        <div className=" w-full">
          <input
            type="file"
            accept="image/*"
            id="file"
            className=" hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file"
            className={` w-full min-h-[10vh]
           dark:border-white border-[#00000026] p-3 border
            flex  items-center justify-center ${dragging ? " bg-blue-500" : " bg-transparent"
              }
          
          `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {courseInfo.thumbnail ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={courseInfo.thumbnail}
                alt=""
                className=" w-full min-h-full object-cover"
              />
            ) : (
              <span className=" text-black dark:text-white">
                Drag and drop your thumbnail here or click to browse
              </span>
            )}
          </label>
        </div>
        <br />
        <div className=" w-full flex items-center justify-end">
          <input
            type="submit"
            value="Next"
            className=" w-full 800px:w-[180px]  h-[40px]
bg-[#37a39a] text-center text-[#fff]   rounded
mt-8 cursor-pointer
"
          />
        </div>
        <br />
      </form>
    </div>
  );
};

export default CourseInformation;
