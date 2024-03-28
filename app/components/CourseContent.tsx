import React, { FC, useState } from "react";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { BsLink45Deg, BsPencil } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { styles } from "../styles/style";
import toast from "react-hot-toast";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseContentData: any;
  setCourseContentData: (courseContentData: any) => void;
  handleSubmit: any;
};

const CourseContent: FC<Props> = ({
  active,
  setActive,
  courseContentData,
  setCourseContentData,
  handleSubmit: handelCourseSubmit,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData.length).fill(false)
  );

  const [activeSection, setActiveSection] = useState(1);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleCollapseToggle = (index: number) => {
    const updatedCollasped = [...isCollapsed];
    updatedCollasped[index] = !updatedCollasped[index];
    setIsCollapsed(updatedCollasped);
  };

  const handleRemoveLink = (index: number, linkIndex: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.splice(linkIndex, 1);
    setCourseContentData(updatedData);
  };

  const handleAddLink = (index: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.push({ title: "", url: "" });
    setCourseContentData(updatedData);
  };

  const newContentHandler = (item: any) => {
    if (
      item.title === "" ||
      item.description === "" ||
      item.videoUrl === "" ||
      item.links[0].title === "" ||
      item.links[0].url === ""
    ) {
      toast.error("Please fill all the fields first!");
    } else {
      let newVideoSection = "";
      if (courseContentData.length > 0) {
        const lastVideoSection =
          courseContentData[courseContentData.length - 1].videoSection;
        // use the last videoSection if available, else use user input

        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }

      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoLength: "",
        videoSection: newVideoSection,
        links: [{ title: "", url: "" }],
      };

      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const addNewSection = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill all the fields first!");
    } else {
      setActiveSection(activeSection + 1);
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: `Untitled Section ${activeSection}`,
        links: [{ title: "", url: "" }],
      };

      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const handleOptions = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill the fields for go to next!");
    } else {
      setActive(active + 1);
      handelCourseSubmit();
    }
  };

  const handlePrevoius = () => {
    setActive(active - 1);
  };
  return (
    <div className=" w-[100%]   m-auto px-5  900px:w-[80%] mt-24   ">
      <form onSubmit={handleSubmit}>
        {courseContentData?.map((item: any, index: number) => {
          // logic for new section

          const showSectionInput =
            index === 0 ||
            item.videoSection !== courseContentData[index - 1].videoSection;

          return (
            <>
              <div
                className={` w-full bg-[#cdc8c817] p-4 ${showSectionInput ? " mt-10" : "mb-0"
                  }`}
              >
                {showSectionInput && (
                  <>
                    <div className=" w-full items-center flex">
                      <input
                        type="text"
                        className={`text-[20px] ${item.videoSection === "Untitled Section"
                          ? "w-[170px]"
                          : "w-min"
                          } font-Poppins cursor-pointer dark:text-white
                     text-black bg-transparent outline-none
                    `}
                        value={item.videoSection}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].videoSection = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                      <BsPencil
                        className=" cursor-pointer dark:text-white
                     text-black
                    "
                      />
                    </div>
                    <br />
                  </>
                )}
                <div className=" flex w-full items-center justify-between my-0">
                  {isCollapsed[index] ? (
                    <>
                      {item.title ? (
                        <p className=" font-Poppins dark:text-white text-black">
                          {index + 1}. {item.title}
                        </p>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <div></div>
                  )}

                  {/* Arrow button for collasped video content*/}
                  <div className=" flex items-center">
                    <AiOutlineDelete
                      className={` dark:text-white text-[20px] mr-2 text-black ${index > 0 ? "cursor-pointer" : "cursor-no-drop"
                        }`}
                      onClick={() => {
                        if (index > 0) {
                          const updatedData = [...courseContentData];
                          updatedData.splice(index, 1);
                          setCourseContentData(updatedData);
                        }
                      }}
                    />
                    <MdOutlineKeyboardArrowDown
                      fontSize="large"
                      className=" dark:text-white text-black"
                      style={{
                        transform: isCollapsed[index]
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      }}
                      onClick={() => handleCollapseToggle(index)}
                    />
                  </div>
                </div>
                {!isCollapsed[index] && (
                  <>
                    <div className=" my-3">
                      <label className={`${styles.label}`}>Video Title</label>
                      <input
                        type="text"
                        placeholder="Project Plan..."
                        className={`${styles.input}`}
                        value={item.title}
                        onChange={(e) => {
                          const { value } = e.target;
                          setCourseContentData((prevData: any) => {
                            const updatedData = [...prevData];
                            updatedData[index] = { ...updatedData[index], title: value };
                            return updatedData;
                          });
                        }}
                      />
                    </div>
                    <div className=" mb-3">
                      <label className={`${styles.label}`}>Video Url</label>
                      <input
                        type="text"
                        placeholder="sdder"
                        className={`${styles.input}`}
                        value={item.videoUrl}
                        onChange={(e) => {
                          const { value } = e.target;
                          setCourseContentData((prevData: any) => {
                            const updatedData = [...prevData];
                            updatedData[index] = { ...updatedData[index], videoUrl: value };
                            return updatedData;
                          });
                        }}
                      />
                    </div>

                    <div className=" mb-3">
                      <label className={`${styles.label}`}>Video Length</label>
                      <input
                        type="number"
                        placeholder="20"
                        className={`${styles.input}`}
                        value={item.videoLength}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].videoLength = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>

                    <div className=" mb-3">
                      <label className={`${styles.label}`}>
                        Video Description
                      </label>
                      <textarea
                        cols={30}
                        rows={6}
                        placeholder="Project description..."
                        className={`${styles.input} !h-min p-2`}
                        value={item.description}
                        onChange={(e) => {
                          const { value } = e.target;
                          setCourseContentData((prevData: any) => {
                          const updatedData = [...prevData];
                            updatedData[index] = { ...updatedData[index], description: value };
                            return updatedData;
                        })}}
                      />
                      <br />
                    </div>
                    {item?.links.map((link: any, linkIndex: number) => (
                      <div key={linkIndex} className=" mb-2 block">
                        <div className=" w-full flex items-center justify-between">
                          <label className={`${styles.label}`}>
                            Link {linkIndex + 1}
                          </label>
                          <AiOutlineDelete
                            className={` ${linkIndex === 0
                              ? "cursor-no-drop"
                              : "cursor-pointer"
                              } text-black dark:text-white text-[20px] `}
                            onClick={() =>
                              linkIndex === 0
                                ? null
                                : handleRemoveLink(index, linkIndex)
                            }
                          />
                        </div>

                        <input
                          type="text"
                          placeholder="Source Code... (Link title)"
                          className={`${styles.input} mb-1`}
                          value={link.title}
                          onChange={(e) => {
                            const { value } = e.target;
                            setCourseContentData((prevData: any) => {
                                const updatedData = prevData.map((item: any, i: number) => {
                                    if (i === index) {
                                        // If it's the correct index, create a new object with updated link title
                                        const updatedLinks = item.links.map((linkItem: any, j: number) => {
                                            if (j === linkIndex) {
                                                return { ...linkItem, title: value }; // Update title of the specific link
                                            }
                                            return linkItem; // Return other links without modification
                                        });
                                        return { ...item, links: updatedLinks }; // Return the item with updated links
                                    }
                                    return item; // Return other items without modification
                                });
                                return updatedData; // Return the updated data
                            });
                        }}
                        />

                        <input
                          type="text"
                          placeholder="Source Code... (Link Url)"
                          className={`${styles.input}`}
                          value={link.url}
                          onChange={(e) => {
                            const { value } = e.target;
                            setCourseContentData((prevData: any) => {
                                const updatedData = prevData.map((item: any, i: number) => {
                                    if (i === index) {
                                        // If it's the correct index, create a new object with updated link URL
                                        const updatedLinks = item.links.map((linkItem: any, j: number) => {
                                            if (j === linkIndex) {
                                                return { ...linkItem, url: value }; // Update URL of the specific link
                                            }
                                            return linkItem; // Return other links without modification
                                        });
                                        return { ...item, links: updatedLinks }; // Return the item with updated links
                                    }
                                    return item; // Return other items without modification
                                });
                                return updatedData; // Return the updated data
                            });
                        }}
                        />

                      </div>
                    ))}
                    <br />

                    {/* add link button*/}
                    <div className=" inline-block mb-4">
                      <p
                        className=" flex items-center text-[18px] text-black dark:text-white cursor-pointer"
                        onClick={() => handleAddLink(index)}
                      >
                        <BsLink45Deg className=" mr-2" /> Add Link
                      </p>
                    </div>
                  </>
                )}
                <br />
                {/* add new content*/}
                {index === courseContentData.length - 1 && (
                  <div>
                    <p
                      className=" flex items-center text-[18px]
                        dark:text-white text-black cursor-pointer
                       "
                      onClick={(e: any) => newContentHandler(item)}
                    >
                      <AiOutlinePlusCircle className=" mr-2" /> Add New Content
                    </p>
                  </div>
                )}
              </div>
            </>
          );
        })}
        <br />
        <div
          onClick={() => addNewSection()}
          className=" flex items-center text-[20px] dark:text-white text-black cursor-pointer"
        >
          <AiOutlinePlusCircle className=" mr-2" /> Add New Section
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
      </form>
      <br />
      <br />
      <br />
    </div>
  );
};

export default CourseContent;
