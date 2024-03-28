import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import avatarIcon from "../../public/assests/images.png";
import { AiOutlineCamera } from "react-icons/ai";
import { styles } from "../styles/style";
import {
  useUpdateAvatarMutation,
  useUpdateUserMutation,
} from "@/redux/features/user/userApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import toast from "react-hot-toast";

type Props = {
  user: any;
  avatar: string | null;
};

const ProfileInfo: FC<Props> = ({ user, avatar }) => {
  const [name, setName] = useState(user && user.name);
  const [showCamera, setShowCamera] = useState(false);
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [updateUser, { isSuccess: success, error: editError }] =
    useUpdateUserMutation();
  const [loadUser, setLoadUser] = useState(false);

  const { } = useLoadUserQuery(undefined, { skip: loadUser ? false : true });
  const imageHandler = async (e: any) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        updateAvatar(avatar);
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isSuccess || success) {
      // its means load user api run
      setLoadUser(true);
    }
    if (error || editError) {
      console.log(error);
    }

    if (success) {
      toast.success("Profile Updated Successfully!");
    }
  }, [editError, error, isSuccess, success]);

  const handleSubmit = async () => {
    if (name !== "") {
      updateUser({
        name: name,
      });
    }
  };
  return (
    <>
      <div className=" w-full flex justify-center">
        <div
          className=" relative"
          onMouseEnter={() => setShowCamera(true)}
          onMouseLeave={() => setShowCamera(false)}
        >
          <Image
            src={user.avatar || avatar ? user.avatar.url || avatar : avatarIcon}
            alt={""}
            width={120}
            height={120}
            className="w-[120px] h-[120px] cursor-pointer border-[3px] dark:border-[#37a39a] border-[#64b4f6] rounded-full"
          />
          {showCamera && (
            <label htmlFor="avatar">
              <div className="w-[27px] h-[27px] bg-slate-900 text-white rounded-full absolute bottom-[0.85rem] right-[2.9rem] flex items-center justify-center cursor-pointer">
                <AiOutlineCamera size={18} className="z-1" />
              </div>
            </label>
          )}
          <input
            type="file"
            name=""
            onChange={imageHandler}
            id="avatar"
            className="hidden"
            accept="image/png,image/jpg,image/jpeg,image/webp"
          />
        </div>
      </div>
      <br />
      <br />

      <div className=" w-full pl-6  800px:pl-10">
        <form onSubmit={handleSubmit}>
          <div className="  800px:w-[70%] m-auto block pb-4">
            <div className=" w-[100%]">
              <label className=" block pb-2 dark:text-white text-black">
                Full Name
              </label>
              <input
                type="text"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className=" w-[100%] pt-2 800px:pt-2">
              <label className=" block pb-1 800px:pb-2 dark:text-white text-black">
                Email Address
              </label>
              <input
                type="text"
                readOnly
                className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                required
                value={user?.email}
              />
            </div>
            <input
              type="submit"
              value="Update"
              className={` w-[95%] 800px:w-[95%] h-[40px] border
             dark:border-[#37a39a] border-[#64b4f6] text-center dark:text-[#fff] text-black
              rounded-[3px] 800px:mt-6 mt-6 cursor-pointer
            `}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfileInfo;
