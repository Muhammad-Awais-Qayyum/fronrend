import { useGetAllOrderQuery } from '@/redux/features/Order/orderApi'
import { useGetAllAdminCousreQuery } from '@/redux/features/course/courseApi'
import { useGetAllUsersQuery } from '@/redux/features/user/userApi'
import { useTheme } from 'next-themes'
import React, { FC, useEffect, useState } from 'react'
import { AiOutlineMail } from 'react-icons/ai'
import { formatDate } from '../utils/FormatDate'
import { DataGrid } from '@mui/x-data-grid'
import Loader from './Loader'
import { Box } from '@mui/material'

type Props = {
    isDashboard?: boolean
}

const AllInvoices: FC<Props> = ({ isDashboard }) => {
    const { theme, setTheme } = useTheme()
    const { isLoading, data } = useGetAllOrderQuery({});
    const { data: usersData } = useGetAllUsersQuery({});
    const { data: courseData } = useGetAllAdminCousreQuery({});

    const [orderData, setOrderData] = useState<any>([]);


    useEffect(() => {
        if (data) {
            const temp = data.orders.map((item: any) => {

                const user = usersData?.users.find((user: any) => user._id === item.userId);



                const course = courseData?.course.find((course: any) => course._id === item.courseId)
                return {
                    ...item,
                    name: user?.name,
                    email: user?.email,
                    title: course?.name,
                    price: "$" + course?.price,

                }


            })
            setOrderData(temp)
        }
    }, [courseData, data, usersData])

    const columns: any = [
        
        
        ...(isDashboard
            ? [
                { field: "Name", headName: "Name", flex: isDashboard ? 0.6 : 0.8 },
            ]
            : [
                { field: "id", headName: "ID", flex: 0.8 },
                { field: "Name", headName: "Name", flex: isDashboard ? 0.6 : 0.8 },
                { field: "Email", headName: "Email", flex: 0.8 },
                { field: "Title", headName: "Title", flex: 0.8 },
            ]),
        { field: "Price", headName: "Price", flex: 0.5 },
        ...(isDashboard
            ? [{ field: "created_at", headName: "Created At", flex: 0.5 }]
            : [
                {
                    field: " Mail ",
                    headName: "Mail",
                    flex: 0.3,
                    renderCell: (params: any) => {
                        return (
                            <a href={`mailto:${params.row.Email}`}>
                                <AiOutlineMail
                                    size={20}
                                    className="dark:text-white text-black"
                                />
                            </a>
                        );
                    },
                },
            ]),
    ];

    const rows: any = [];

    orderData &&
        orderData.forEach((item: any) => {
            rows.push({
                id: item._id,
                Name: item.name,
                Email: item.email,
                Title: item.title,
                Price: item.price,
                created_at: formatDate(item.createdAt),
            });
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
    return (
        <>
            <div
                className={`${isDashboard ? '   h-[57vh]      overflow-hidden     ' : 'flex flex-col  justify-center h-screen pt-10  w-[90%]  m-auto 900px:w-[85%]'}`}
            >
                {isLoading ? (
                    <Loader />
                ) : (
                    <Box >


                        <Box
                            m="0 0 0 0"
                            height={`${isDashboard ? '60vh' : '70vh'}`}
                            sx={{
                                "& .MuiDataGrid-root": {
                                    border: "none",
                                    outline: "none",
                                },
                                "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                                    color: theme === "dark" ? "#fff" : "#000",
                                },

                                "& .MuiDataGrid-sortIcon": {
                                    color: theme === "dark" ? "#fff" : "#000",
                                },
                                "& .MuiDataGrid-row": {
                                    color: theme === "dark" ? "#fff" : "#000",
                                    borderBottom:
                                        theme === "dark"
                                            ? "1px solid #ffffff30!important"
                                            : "1px solid #ccc!important",
                                },
                                "& .MuiTablePagination-root": {
                                    color: theme === "dark" ? "#fff" : "#000",
                                },
                                "& .MuiDataGrid-cell": {
                                    borderBottom: "none!important",
                                },
                                "& .name-column--cell": {
                                    color: theme === "dark" ? "#fff" : "#000",
                                },
                                "& .MuiDataGrid-columnHeaders": {
                                    backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                                    borderBottom: "none",
                                    color: theme === "dark" ? "#fff" : "#000",
                                },
                                "& .MuiDataGrid-virtualScroller": {
                                    backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
                                },
                                "& .MuiDataGrid-footerContainer": {
                                    color: theme === "dark" ? "#fff" : "#000",
                                    borderTop: "none",
                                    backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                                },
                                "& .MuiCheckbox-root": {
                                    color:
                                        theme === "dark" ? `#b7ebde !important` : `#000 !important`,
                                },
                                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                                    color: `#fff !important`,
                                },
                            }}
                        >
                            <DataGrid
                                 rows={rows}
                                columns={
                                    isSmallScreen
                                        ? columns.filter(
                                            (col: any) =>
                                                col.field !== "id" &&
                                                col.field !== "Mail" &&
                                                col.field !== "Title" &&
                                                col.field !== "Email"


                                        )
                                        : columns
                                }
                            />
                        </Box>
                    </Box>
                )}
            </div >
        </>



    )
}

export default AllInvoices;