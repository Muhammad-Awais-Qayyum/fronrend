import React, { FC, useEffect, useState } from "react";
import { styles } from "../styles/style";
import { useUpdatePasswordMutation } from "@/redux/features/user/userApi";
import toast from "react-hot-toast";

type Props = {};

const ChangePassword: FC<Props> = (props) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [confirmassword, setconfirmPassword] = useState("");

  const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();

  const handlePassword = async (e: any) => {
    e.preventDefault();

    if (newPassword !== confirmassword) {
      toast.error("Password do not match");
    } else {
      await updatePassword({
        newPassword,
        oldPassword,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password changed Successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [error, isSuccess]);
  return (
    <div className="">
      <h1 className="  pb-2 text-2xl 800px:text-3xl text-center  font-Poppins dark:text-white pt-2">
        Change Password
      </h1>

      <div className=" w-full ">
        <form onSubmit={handlePassword}>
          <div className=" w-[85%] space-y-4 flex flex-col  800px:w-[58%] mx-auto pt-5 dark:text-white">
            <label className=" font-Poppins text-md">
              Enter your old password
            </label>
            <input
              type="password"
              required
              value={oldPassword}
              className={`${styles.input}`}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <label className=" font-Poppins text-md">
              Enter your new password
            </label>
            <input
              type="password"
              value={newPassword}
              required
              className={`${styles.input}`}
              onChange={(e) => setnewPassword(e.target.value)}
            />
            <label className=" font-Poppins text-md">
              Enter your confirm password
            </label>
            <input
              type="password"
              required
              value={confirmassword}
              className={`${styles.input} `}
              onChange={(e) => setconfirmPassword(e.target.value)}
            />

            <div className=" pt-4">
              <input
                type="submit"
                value="Update"
                className={` w-[100%]  800px:w-[100%] h-[40px] border
             dark:border-[#37a39a] border-[#64b4f6] text-center dark:text-[#fff] text-black
              rounded-[3px]    cursor-pointer
            `}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
