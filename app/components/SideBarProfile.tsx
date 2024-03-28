import Image from "next/image";
import React, { FC } from "react";
import avatarDefault from "../../public/assests/images.png";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import Link from "next/link";

type Props = {
  user: any;
  active: number;
  avatar: string | null;
  setActive: (active: number) => void;
  LogoutHandler: any;
};

const SideBarProfile: FC<Props> = ({
  user,
  active,
  setActive,
  LogoutHandler,
  avatar,
}) => {
  return (
    <div className=" w-full  ">
      {/* My account div*/}
      <div
        className={` w-full flex items-center px-3 py-4 cursor-auto ${
          active === 1 ? " bg-[#64b4f6]   dark:bg-slate-800" : " bg-transparent"
        }`}
        onClick={() => setActive(1)}
      >
        <Image
          src={
            user.avatar || avatar ? user.avatar.url || avatar : avatarDefault
          }
          alt={""}
          width={20}
          height={20}
          className=" w-[20px] h-[20px] 800px:w-[25px] 800px:h-[25px] cursor-pointer rounded-full"
        />
        <h5 className=" cursor-pointer pl-[0.6rem] hidden 800px:block dark:text-white font-Poppins text-black">
          My Account
        </h5>
      </div>

      {/* Change password div*/}

      <div
        className={` w-full flex items-center px-3 py-4 cursor-auto ${
          active === 2 ? " bg-[#64b4f6]   dark:bg-slate-800" : " bg-transparent"
        }`}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordLine size={20} className=" dark:text-white text-black" />
        <h5 className="         cursor-pointer pl-3 hidden 800px:block dark:text-white font-Poppins text-black">
          Change Password
        </h5>
      </div>

      {/* Enrolled course div*/}

      <div
        className={` w-full flex items-center px-3 py-4 cursor-auto ${
          active === 3 ? " bg-[#64b4f6] dark:bg-slate-800" : " bg-transparent"
        }`}
        onClick={() => setActive(3)}
      >
        <SiCoursera size={20} className=" dark:text-white text-black" />
        <h5 className="         cursor-pointer pl-3 hidden 800px:block dark:text-white font-Poppins text-black">
          Enrolled Course
        </h5>
      </div>

      {/* Admin Dashboard for only see admin */}

      {user.role === "admin" && (
        <Link
          href="/admin"
          className={` w-full flex items-center px-3 py-4 cursor-auto ${
            active === 6 ? " bg-[#64b4f6] dark:bg-slate-800" : " bg-transparent"
          }`}
        >
          <MdOutlineAdminPanelSettings
            size={22}
            className=" dark:text-white text-black"
          />
          <h5 className="         cursor-pointer pl-3 hidden 800px:block dark:text-white font-Poppins text-black">
            Admin Dashboard
          </h5>
        </Link>
      )}
      {/* Log out div*/}

      <div
        className={` w-full flex items-center px-3 py-4 cursor-auto ${
          active === 4 ? " bg-[#64b4f6]  dark:bg-slate-800" : " bg-transparent"
        }`}
        onClick={() => LogoutHandler()}
      >
        <AiOutlineLogout size={20} className=" dark:text-white text-black" />
        <h5 className="         cursor-pointer pl-3 hidden 800px:block dark:text-white font-Poppins text-black">
          Log Out
        </h5>
      </div>
    </div>
  );
};

export default SideBarProfile;
