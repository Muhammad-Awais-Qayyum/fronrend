import { useCourseAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Label,
    LabelList,
    ResponsiveContainer,
} from "recharts";
import Loader from "../Loader";
import { styles } from "@/app/styles/style";
type Props = {};

const CourseAnalaytics = (props: Props) => {
    const { data, isLoading, } = useCourseAnalyticsQuery({})



    const analyticsData: any = []

    data && data.course.last12Months.forEach((item: any) => {
        analyticsData.push({ name: item.month, uv: item.count })
    });

    return <>
        {
            isLoading ? (
                <Loader />
            ) : (
                <div className="  h-screen">
                    <div className="  h-[37%] justify-center  flex flex-col  items-center  ">
                        <h1 className={`${styles.title}  `}>
                            Courses Analytics
                        </h1>
                        <p className={`${styles.label}   `}>
                            Last 12 months analytics data{""}
                        </p>
                    </div>


                    <div className=" w-full   h-[63%] flex  lg:justify-center  items-center ">

                        <ResponsiveContainer width="90%" height="70%">
                            <BarChart width={150} height={300} data={analyticsData}>
                                <XAxis dataKey="name">
                                    <Label offset={0} position="insideBottom" />
                                </XAxis>
                                <YAxis />

                                <Bar dataKey='uv' fill="#3faf82">
                                    <LabelList dataKey='uv' position='top' />
                                </Bar>


                            </BarChart>
                        </ResponsiveContainer>

                    </div>
                </div >
            )
        }
    </>;
};

export default CourseAnalaytics;
