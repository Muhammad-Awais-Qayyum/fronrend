import React, { FC, useEffect, useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import {
    useGetAllAdminCousreQuery, useUpdateCourseMutation,
} from "@/redux/features/course/courseApi";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";



type Props = {
    id: string;
};

const EditCourse: FC<Props> = ({ id }) => {
    const { isLoading, data, refetch } = useGetAllAdminCousreQuery(
        {},
        { refetchOnMountOrArgChange: true }
    );

    const [UpdateCourse, { isLoading: UpdateLoading, isSuccess, error }] = useUpdateCourseMutation({})
    const courseFilter = data && data.course.find((i: any) => i._id === id);





    useEffect(() => {
        if (isSuccess) {
            toast.success("Course updated successfully");
            redirect("/admin/courses");
        }
        if (error) {
            if ("data" in error) {
                const errorMessage = error as any;
                toast.error(errorMessage.data.message);
            }
        }
    }, [error, isSuccess]);



    useEffect(() => {
        if (courseFilter) {
            setCourseInfo({
                name: courseFilter.name,
                description: courseFilter.description,
                estimatedPrice: courseFilter.estimatedPrice,
                categories: courseFilter.categories,
                tags: courseFilter.tags,
                level: courseFilter.level,
                demoUrl: courseFilter.demoUrl,
                thumbnail: courseFilter?.thumbnail?.url,
                price: courseFilter?.price
            })
            setBenefits(courseFilter.benefits);
            setPrerequisites(courseFilter.prerequisites);
            setCourseContentData(courseFilter.courseData);
        }
    }, [courseFilter]);
    const [active, setActive] = useState(0);
    const [courseInfo, setCourseInfo] = useState({
        name: "",
        description: "",
        price: "",
        categories: "",
        estimatedPrice: "",
        tags: "",
        level: "",
        demoUrl: "",
        thumbnail: "",
    });
    const [benefits, setBenefits] = useState([{ title: "" }]);
    const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
    const [courseContentData, setCourseContentData] = useState([
        {
            videoUrl: "",
            title: "",
            description: "",
            videoSection: "Untitled Section",
            videoLength: "",
            links: [
                {
                    title: "",
                    url: "",
                },
            ],
            suggestion: "",
        },
    ]);

    const [courseData, setCourseData] = useState({});

    const handleSubmit = async () => {
        // Format Benefits array bcz one data object is store in backened

        const formatBenefits = benefits.map((benefit) => ({
            title: benefit.title,
        }));

        // Format prerequisites

        const formatPrerequisites = prerequisites.map((prerequisite) => ({
            title: prerequisite.title,
        }));

        // Format course content array

        const formatCourseContentData = courseContentData.map((courseContent) => ({
            videoUrl: courseContent.videoUrl,
            videoLength: courseContent.videoLength,
            title: courseContent.title,
            links: courseContent.links.map((link) => ({
                title: link.title,
                url: link.url,
            })),
            videoSection: courseContent.videoSection,
            description: courseContent.description,
            suggestion: courseContent.suggestion,
        }));

        // prepare our data

        const data = {
            name: courseInfo.name,
            description: courseInfo.description,
            price: courseInfo.price,
            estimatedPrice: courseInfo.estimatedPrice,
            level: courseInfo.level,
            categories: courseInfo.categories,
            tags: courseInfo.tags,
            demoUrl: courseInfo.demoUrl,
            totalVideos: courseContentData.length,
            thumbnail: courseInfo.thumbnail,
            benefits: formatBenefits,
            prerequisites: formatPrerequisites,
            courseData: formatCourseContentData,
        };

        setCourseData(data);
    };


    const handleCourseCreate = async (e: any) => {
        const data = courseData;

        await UpdateCourse({ id: courseFilter._id, data });

    };




    return (
        <div className=" min-h-screen w-full flex">
            <div className="  w-full  1000px:px-0 1100px:w-[80%]">
                {active === 0 && (
                    <CourseInformation
                        active={active}
                        setActive={setActive}
                        courseInfo={courseInfo}
                        setCourseInfo={setCourseInfo}
                    />
                )}
                {active === 1 && (
                    <CourseData
                        active={active}
                        setActive={setActive}
                        prerequisites={prerequisites}
                        setPrerequisites={setPrerequisites}
                        benefits={benefits}
                        setBenefits={setBenefits}
                    />
                )}

                {active === 2 && (
                    <CourseContent
                        active={active}
                        setActive={setActive}
                        courseContentData={courseContentData}
                        setCourseContentData={setCourseContentData}
                        handleSubmit={handleSubmit}
                    />
                )}

                {active === 3 && (
                    <CoursePreview
                        active={active}
                        setActive={setActive}
                        courseData={courseData}
                        handleCourseCreate={handleCourseCreate}
                        isEdit={true}
                    />
                )}
            </div>
            <div className=" w-[20%] mt-[100px] h-screen fixed z-[-1] top-16 right-0">
                <CourseOptions active={active} setActive={setActive} />
            </div>
        </div>
    );
};

export default EditCourse;
