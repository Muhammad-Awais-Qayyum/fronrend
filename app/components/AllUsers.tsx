"use client";
import React, { FC, use, useEffect, useState } from "react";

import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { useTheme } from "next-themes";
import { FiEdit2 } from "react-icons/fi";
import { styles } from "@/app/styles/style";
import { toast } from "react-hot-toast";
import Link from "next/link";
import Loader from "./Loader";
import { format } from "timeago.js";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateRoleMutation,
} from "@/redux/features/user/userApi";

type Props = {
  isTeam: boolean;
};

const AllUsers: FC<Props> = ({ isTeam }) => {
  const { theme, setTheme } = useTheme();
  const { isLoading, data, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [active, SetActive] = useState(false);
  const [role, setRole] = useState("admin");
  const [deleteUser, { isSuccess: deleteSuccess, error: deleteError }] =
    useDeleteUserMutation({});
  const [updateRole, { error: updateError, isSuccess }] =
    useUpdateRoleMutation();
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (updateError) {
      if ("data" in updateError) {
        const errorMessage = updateError as any;
        toast.error(errorMessage.data.message);
      }
    }

    if (isSuccess) {
      refetch();
      toast.success("User Successfully Updated");
      SetActive(false);
    }
    if (deleteSuccess) {
      refetch();
      toast.success("User Deleted successfully");
      setOpen(false);
    }

    if (deleteError) {
      if ("data" in deleteError) {
        const errorMessage = deleteError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [deleteError, deleteSuccess, isSuccess, refetch, updateError]);
  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "name", headerName: "Name", flex: 0.3 },
    { field: "email", headerName: "Email", flex: 0.6 },
    { field: "role", headerName: "Role", flex: 0.25 },
    { field: "created_at", headerName: "Joined At", flex: 0.3 },
    {
      field: "mail",
      headerName: "Email",
      flex: 0.25,
      renderCell: (params: any) => {
        return (
          <a href={`mailto:${params.row.email}`}>
            <AiOutlineMail className="dark:text-white text-black" size={20} />
          </a>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.25,
      renderCell: (params: any) => {
        return (
          <Button>
            <AiOutlineDelete
              onClick={() => {
                setOpen(!open);
                setUserId(params.row.id);
              }}
              className="dark:text-white text-black"
              size={20}
            />
          </Button>
        );
      },
    },
  ];
  const rows: any[] = [];

  if (isTeam) {
    const newData =
      data && data.users.filter((user: any) => user.role === "admin");
    if (newData) {
      newData.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          role: item.role,
          email: item.email,
          created_at: format(item.createdAt),
        });
      });
    }
  } else {
    if (data && data.users) {
      data.users.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          role: item.role,
          email: item.email,
          created_at: format(item.createdAt),
        });
      });
    }
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
    const id = userId;
    await deleteUser({ id });
  };

  const handleAddUser = async () => {
    await updateRole({ email, role });
  };
  return (
    <>
      <div
        className={` ${isTeam
            ? " mt-[85px] md:mt-[90px]"
            : " flex flex-col  justify-center h-screen "
          }     w-[95%] m-auto 900px:w-[85%]  `}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <Box m="20px">
            {isTeam ? (
              <div className="   w-full justify-end flex">
                <div
                  className={`${styles.button} text-white !h-[35px] !w-[190px] !text-sm  `}
                  onClick={() => SetActive(!active)}
                >
                  Add New Member
                </div>
              </div>
            ) : null}

            <Box
              m="40px 0 0 0"
              height={`${isTeam ? "63vh" : "70vh"}`}
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
                        col.field !== "id" &&
                        col.field !== "created_at" &&
                        col.field !== "email" &&
                        col.field !== "mail"
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
                      Are you sure, want to delete <br /> this User?
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
            {active && (
              <Modal
                open={active}
                onClose={() => SetActive(!active)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <div
                  className="
                  
                       items-center pt-24  h-screen  justify-center
                     
                   flex    w-[118%]"
                >
                  <Box className="  p-3 dark:bg-[#090909] bg-[#ffffffeb] rounded-lg">
                    <h1
                      className={`${styles.title}  text-sm sm:text-lg md:text-xl lg:text-2xl`}
                    >
                      Add new user to the team..
                    </h1>
                    <div className="w-full space-x-1 lg:space-x-0 flex flex-col items-center  lg:mt-8">
                      <input
                        type="text"
                        value={email}
                        className={`${styles.input}  mb-1 lg:mb-4`}
                        placeholder="Email of the user"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <select
                        className={`${styles.input}  bg-[#ffffffeb] dark:bg-[#090909]`}
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    <div className="w-full flex items-center justify-between mb-4 mt-12">
                      <div
                        className={`${styles.button} !w-[80px] 
                        !h-[20px]  md:!w-[120px] md:h-[30px] bg-[#d63f41]`}
                        onClick={() => SetActive(!active)}
                      >
                        Cancel
                      </div>
                      <div
                        className={`${styles.button} !w-[80px] 
                        !h-[20px]  md:!w-[120px] md:h-[30px] bg-[#57c7a3]`}
                        onClick={handleAddUser}
                      >
                        Save
                      </div>
                    </div>
                  </Box>
                </div>
              </Modal>
            )}
          </Box>
        )}
      </div>
    </>
  );
};

export default AllUsers;
