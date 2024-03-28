import React, { useState } from 'react';
import { useGetCourseContentQuery } from '@/redux/features/course/courseApi';
import Loader from '../Loader';
import Heading from '@/app/utils/Heading';
import CourseContentMedia from './CourseContentMedia';
import Header from '../Header';
import CourseContentList from './CourseContentList';

type Props = {
    id: string;
    data: any;
};

const CourseAccess = ({ id, data: UserData }: Props) => {
    const { data, isLoading, refetch } = useGetCourseContentQuery(id, {
        refetchOnMountOrArgChange: true,
    });
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(false)
    const [route, setRoute] = useState('Login');
    const content = data?.content;
    const [activeVideo, setActiveVideo] = useState(0);
    if (typeof window !== "undefined") {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 2) {
                setActive(true);
            } else {
                setActive(false);
            }
        });
    }

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="course-container ">
                    <Heading
                        title={content[activeVideo]?.title}
                        description="anything"
                        keywords={content[activeVideo]?.tags}
                    />
                    


                        <Header
                            open={open}
                            setOpen={setOpen}
                            activeItem={1}
                            route={route}
                            setRoute={setRoute}
                        />
                    <div className="w-full     grid grid-cols-1 gap-6 1000px:grid-cols-10">
                        <div className="col-span-1 800px:col-span-7 ">
                            <CourseContentMedia
                                data={content}
                                userData={UserData}
                                id={id}
                                refetch={refetch}
                                activeVideo={activeVideo}
                                setActiveVideo={setActiveVideo}
                            />
                        </div>
                        <div className="hidden 1000px:block 1000px:col-span-3 ">
                            <CourseContentList
                                data={content}
                                activeVideo={activeVideo}
                                setActiveVideo={setActiveVideo}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CourseAccess;
