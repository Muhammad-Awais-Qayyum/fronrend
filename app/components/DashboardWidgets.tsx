import React, { FC, useEffect, useState } from 'react'
import UsersAnalaytics from './Analaytics/UsersAnalaytics'
import { BiBorderLeft } from 'react-icons/bi'
import { PiUsersFourLight } from 'react-icons/pi'
import { Box, CircularProgress } from '@mui/material'
import OrdersAnalaytics from './Analaytics/OrdersAnalaytics'
import AllInvoices from './AllInvoices'
import { useOrderAnalyticsQuery, useUserAnalyticsQuery } from '@/redux/features/analytics/analyticsApi'


type Props = {
    open: boolean,
    value?: number
}

const CircularProgressWithLabel: FC<Props> = ({ open, value }) => {

    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress
                variant='determinate'
                value={value}
                size={45}
                color={value && value > 99 ? 'info' : 'error'}
                thickness={4}
                style={{ zIndex: open ? -1 : 1 }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%'
                }}
            >

            </Box>
        </Box>
    )
}

const DashboardWidgets: FC<Props> = ({ open }) => {
    const [isDashboard, setDashboard] = useState(true);
    const [ordersComparePercentage, setOrdersComparePercentage] = useState<any>();
    const [userComparePercentage, setuserComparePercentage] = useState<any>();

    const { data, isLoading } = useUserAnalyticsQuery({});
    const { data: ordersData, isLoading: ordersLoading } =
        useOrderAnalyticsQuery({});

    useEffect(() => {
        if (isLoading && ordersLoading) {
            return;
        } else {
            if (data && ordersData) {
                const usersLastTwoMonths = data.users.last12Months.slice(-2);
                const ordersLastTwoMonths = ordersData.order.last12Months.slice(-2);

                if (
                    usersLastTwoMonths.length === 2 &&
                    ordersLastTwoMonths.length === 2
                ) {
                    const usersCurrentMonth = usersLastTwoMonths[1].count;
                    const usersPreviousMonth = usersLastTwoMonths[0].count;
                    const ordersCurrentMonth = ordersLastTwoMonths[1].count;
                    const ordersPreviousMonth = ordersLastTwoMonths[0].count;

                    const usersPercentChange = usersPreviousMonth !== 0 ?
                        ((usersCurrentMonth - usersPreviousMonth) / usersPreviousMonth) *
                        100 : 100;

                    const ordersPercentChange = ordersPreviousMonth !== 0 ?
                        ((ordersCurrentMonth - ordersPreviousMonth) / ordersPreviousMonth) *
                        100 : 100;

                    setuserComparePercentage({
                        currentMonth: usersCurrentMonth,
                        previousMonth: usersPreviousMonth,
                        percentChange: usersPercentChange,
                    });

                    setOrdersComparePercentage({
                        currentMonth: ordersCurrentMonth,
                        previousMonth: ordersPreviousMonth,
                        percentChange: ordersPercentChange,
                    });
                }
            }
        }
    }, [isLoading, ordersLoading, data, ordersData]);

    return (
        <div className='  1100px:mt-[30px]      '>
            <div className=' grid   grid-cols-1  1100px:grid-cols-12'>
                <div className='  1100px:p-8   1100px:col-span-8'>
                    <UsersAnalaytics isUsers={false} isDashboard={isDashboard} setDashboard={setDashboard} />
                </div>


                <div className=' w-[85%] md:w-[82%] 1100px:w-full  1100px:px-0 md:flex 1100px:flex-col  mx-auto     md:space-x-5 1100px:space-x-0 1100px:pt-[80px] 1100px:col-span-4  1100px:pr-8'>
                    <div className='w-full dark:bg-[rgb(17,28,67)] rounded-sm shadow'>
                        <div className=' flex  items-center p-5 justify-between'>
                            <div>
                                <BiBorderLeft className=' dark:text-[#45CBA0]  text-[#000] text-[30px]' />
                                <h5 className=' pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]'>
                                {ordersComparePercentage?.currentMonth}
                                </h5>
                                <h5 className=' py-2 font-Poppins dark:text-[#45CBA0] text-black text-[20px] font-[400]'>
                                    Sales Obtained
                                </h5>
                            </div>
                            <div>
                                <CircularProgressWithLabel value={
                                    ordersComparePercentage?.percentChange > 0 ? 100 :0
                                } open={open} />
                                <h5 className=' text-center pt-4'>{
                                    ordersComparePercentage?.percentChange > 0 ? '+' + ordersComparePercentage?.percentChange.toFixed(2) : '-' + ordersComparePercentage?.percentChange.toFixed(2)
                                }%</h5>
                            </div>
                        </div>
                    </div>

                    <div className=' w-full dark:bg-[#111C43] rounded-sm shadow my-5 md:my-0 1100px:my-5 '>
                        <div className=' flex items-center p-5 justify-between'>
                            <div>
                                <PiUsersFourLight className=' dark:text-[#45CBA0]  text-[#000] text-[30px]' />
                                <h5 className=' pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]'>
                                    {userComparePercentage?.currentMonth}
                                </h5>
                                <h5 className=' py-2 font-Poppins dark:text-[#45CBA0] text-black text-[20px] font-[400]'>
                                    New Users
                                </h5>
                            </div>
                            <div>
                                <CircularProgressWithLabel value={
                                    userComparePercentage?.percentChange > 0 ? 100 :0
                                } open={open} />
                                <h5 className=' text-center pt-4'>{
                                    userComparePercentage?.percentChange > 0 ? '+' + userComparePercentage?.percentChange.toFixed(2) : '-' + userComparePercentage?.percentChange.toFixed(2)
                                }%</h5>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            <div className=' grid grid-cols-1   1100px:grid-cols-12 '>
                <div className=' 1100px:mt-[8px] 1100px:p-8 1100px:col-span-8'>
                    <OrdersAnalaytics isOrder={false} isDashboard={isDashboard} setDashboard={setDashboard} />
                </div>

                <div className='w-[85%] md:w-[82%] 1100px:w-full  1100px:px-0   1100px:flex-col  mx-auto      1100px:col-span-4  1100px:pr-8'>
                    <h5 className='   text-center  dark:text-[#fff] text-black text-[20px] font-[400] font-Poppins pb-3'>
                        Recent Transactions
                    </h5>
                    <AllInvoices isDashboard={true} />
                </div>

            </div>


        </div>
    )
}

export default DashboardWidgets;