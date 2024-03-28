"use client";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { useTheme } from "next-themes";
import { FiEdit2 } from "react-icons/fi";
import { styles } from "@/app/styles/style";
import { toast } from "react-hot-toast";
import {
  useDeleteCourseMutation,
  useGetAllAdminCousreQuery,
} from "@/redux/features/course/courseApi";
import Loader from "./Loader";
import { format } from "timeago.js";
import Link from "next/link";

type Props = {};

const AllCourses = (props: Props) => {
  const { theme, setTheme } = useTheme();
  const { isLoading, data, refetch } = useGetAllAdminCousreQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");
  const [deleteCourse, { isSuccess: deleteSuccess, error: deleteError }] =
    useDeleteCourseMutation({});

  useEffect(() => {
    if (deleteSuccess) {
      refetch();
      toast.success("Course Deleted successfully");
      setOpen(false);
    }

    if (deleteError) {
      if ("data" in deleteError) {
        const errorMessage = deleteError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [deleteError, deleteSuccess, refetch]);
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "title", headerName: " Course Title", flex: 0.5 },
    { field: "price", headerName: "Price", flex: 0.5 },
    { field: "purchased", headerName: "Purchased", flex: 0.5 },
    { field: "created_at", headerName: "Created At", flex: 0.5 },
    {
      field: "  ",
      headerName: "Edit",
      flex: 0.3,
      renderCell: (params: any) => {
        return (
          <>
            <Link href={`/admin/edit-course/${params.row.id}`}>
              <FiEdit2 className="dark:text-white text-black" size={20} />
            </Link>
          </>
        );
      },
    },
    {
      field: " ",
      headerName: "Delete",
      flex: 0.3,
      renderCell: (params: any) => {
        return (
          <>
            <Button>
              <AiOutlineDelete
                onClick={() => {
                  setOpen(!open);
                  setCourseId(params.row.id);
                }}
                className="dark:text-white text-black "
                size={20}
              />
            </Button>
          </>
        );
      },
    },
  ];

  const rows: any[] = [];

  if (data && data.course) {
    data.course.forEach((item: any) => {
      rows.push({
        id: item._id,
        title: item.name,
        price: `$${item.price} `,
        purchased: item.purchased,
        created_at: format(item.createdAt),
      });
    });
  }

  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 900);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDelete = async () => {
    const id = courseId;
    await deleteCourse({ id });
  };
  return (
    <div
      className="  flex flex-col  justify-center h-screen 
      w-[95%] m-auto 900px:w-[85%]  "
    >
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          <Box
            m="40px 0 0 0"
            height="70vh"
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
                    (col) =>
                      col.field !== "created_at" &&
                      col.field !== "purchased" &&
                      col.field !== "id" &&
                      col.field !== "price"
                  )
                  : columns
              }
            />
          </Box>
          {open && (
            <Modal
              open={open}
              onClose={() => setOpen(!open)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <div
                className="
                  
                        items-center h-screen justify-center 
                     
                  flex    w-[118%] "
              >
                <Box className="absolute     p-5 dark:bg-[#090909] bg-[#ffffffeb] rounded-lg">
                  <h1
                    className={`${styles.title}  text-sm sm:text-lg md:text-xl lg:text-2xl`}
                  >
                    Are you sure, want to delete <br /> this Course?
                  </h1>
                  <div className="w-full space-x-1 lg:space-x-0 flex items-center justify-between mb-1 md:mb-4 mt-12">
                    <div
                      className={`${styles.button} !w-[80px] 
                      !h-[20px]  md:!w-[120px] md:h-[30px] bg-[#57c7a3]`}
                      onClick={() => setOpen(!open)}
                    >
                      Cancel
                    </div>
                    <div
                      className={`${styles.button} !w-[80px] 
                      !h-[20px]  md:!w-[120px] md:h-[30px] bg-[#d63f41]`}
                      onClick={handleDelete}
                    >
                      Delete
                    </div>
                  </div>
                </Box>
              </div>
            </Modal>
          )}
        </Box>
      )}
    </div>
  );
};
export default AllCourses;
