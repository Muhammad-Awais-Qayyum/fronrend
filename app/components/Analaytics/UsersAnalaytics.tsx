import { useUserAnalyticsQuery } from '@/redux/features/analytics/analyticsApi'
import React, { FC, useEffect, useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Loader from '../Loader';
import { styles } from '@/app/styles/style';

type Props = {
    isDashboard: boolean
    setDashboard: (isDashboard: boolean) => void
    isUsers: boolean
}

const UsersAnalaytics: FC<Props> = ({ isDashboard, setDashboard, isUsers }) => {
    const { data, isLoading, } = useUserAnalyticsQuery({})

    const analyticsData: any = []

    data && data.users.last12Months.forEach((item: any) => {
        analyticsData.push({ name: item.month, uv: item.count })
    });

    const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 1100);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (isSmallScreen) {
        setDashboard(false);
    } else {
        if (isUsers) {
            setDashboard(false);
        } else {
            setDashboard(true);
        }

    }

    return (
        <>
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <div className={`${!isDashboard
                        ? " h-screen"
                        : "    mx-3 mt-[50px]  p-2 dark:bg-[#111c43] shadow-sm pb-5 rounded-sm"
                        }`}>
                        <div className={`${isDashboard ? " !ml-[8px] mb-5" : " h-[37%] justify-center  flex flex-col  items-center"} `}>
                            <h1 className={`${styles.title}  `}>
                                Users Analytics
                            </h1>


                        </div>


                        <div className={` w-full ${isDashboard ? 'h-[40vh]  flex items-center justify-center' : '   h-[63%] flex  lg:justify-center  items-start lg:items-center'}`}>

                            <ResponsiveContainer width={isDashboard ? "100%" : "90%"}
                                height={isDashboard ? "100%" : "70%"}>

                                <AreaChart width={150} height={300} data={analyticsData}

                                >


                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="uv" stackId="1" stroke="#3faf82" fill="#3faf82" />
                                </AreaChart>

                            </ResponsiveContainer>

                        </div>
                    </div >
                )
            }
        </>
    )
}

export default UsersAnalaytics;
