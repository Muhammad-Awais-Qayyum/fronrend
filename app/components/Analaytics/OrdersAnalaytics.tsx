import { useOrderAnalyticsQuery } from '@/redux/features/analytics/analyticsApi'
import React, { FC, useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Loader from '../Loader';
import { styles } from '@/app/styles/style';

type Props = {
    isDashboard: boolean
    setDashboard: (isDashboard: boolean) => void
    isOrder: boolean
}

const OrdersAnalaytics: FC<Props> = ({ isDashboard, setDashboard, isOrder }) => {
    const { data, isLoading, } = useOrderAnalyticsQuery({})



    const analyticsData: any = []

    data && data.order.last12Months.forEach((item: any) => {
        analyticsData.push({ name: item.month, Count: item.count })
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
        if (isOrder) {
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
                    <div className={`${isDashboard ? '   mx-3    p-2 dark:bg-[#111c43] shadow-sm pb-5 rounded-sm' : ' h-screen'
                        } `}>
                        <div className={` ${isDashboard ? "!ml-[8px] mb-5" : "h-[37%] justify-center  flex flex-col  items-center"}  `}>
                            <h1 className={`${styles.title}  `}>
                                Orders Analytics
                            </h1>

                        </div>


                        <div className={` w-full ${isDashboard ? 'h-[42vh]  flex items-center justify-center' : '   h-[63%] flex  lg:justify-center  items-start lg:items-center'}`}>

                            <ResponsiveContainer
                                width={isDashboard ? "100%" : "90%"}
                                height={isDashboard ? "100%" : "72%"}
                            >
                                <LineChart width={150} height={300} data={analyticsData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />

                                    <Legend />
                                    <Line type="monotone" dataKey="Count" stroke="#3faf82" />


                                </LineChart>
                            </ResponsiveContainer>

                        </div>
                    </div >
                )
            }
        </>
    )
}

export default OrdersAnalaytics;