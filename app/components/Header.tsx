"use client";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import NavItem from "./NavItem";
import ThemeSwitcher from "./ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from "./CustomModal";
import Login from "./Login";
import SignUp from "./SignUp";
import Verification from "./Verification";
import { useSelector } from "react-redux";
import Image from "next/image";
import avatar from "../../public/assests/images.png";
import { useSession } from "next-auth/react";
import {
  useLogoutQuery,
  useSocialAuthMutation,
} from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route?: string;
  setRoute?: (route: string) => void;
};

const Header: FC<Props> = ({ activeItem, setOpen, open, route, setRoute }) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const { user } = useSelector((state: any) => state.auth);
  const { data } = useSession();
  const [socialAuth, { isSuccess }] = useSocialAuthMutation();
  const [logout, setLogout] = useState(false);
  const { } = useLogoutQuery(undefined, {
    skip: !logout ? true : false,
  });

  useEffect(() => {
    if (!data && !user) {
      // If session data is null and the user was logged in through a social provider, trigger logout
      setLogout(true);
    }

    if (!user && data) {
      // If user is logged in through a social provider but there's no local user, perform social authentication
      socialAuth({
        email: data.user?.email,
        name: data.user?.name,
        avatar: data.user?.image,
      });
    }

    if (data === null && isSuccess) {
      // If session data becomes null and social authentication is successful, show success message
      toast.success("Login Successfully");
    }
  }, [data, isSuccess, socialAuth, user]);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 2) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }

  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      setOpenSidebar(false);
    }
  };

  return (
    <div className="   w-full relative">
      <div
        className={`${active
          ? " dark:bg-opacity-50   bg-white   dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0  w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c]  shadow-xl transition duration-500"
          : " w-full    dark:border-[#ffffff1c] h-[80px] z-[80] border-b dark:shadow"
          }`}
      >
        <div className="  w-[95%] 800px:w-[92%] m-auto py-2 h-full">
          <div className=" w-full h-[80px] flex items-center justify-between p-3">
            {/* Logo*/}
            <div>
              <Link
                href={"/"}
                className={` text-[25px] font-Poppins font-[500] text-black dark:text-white`}
              >
                SmartStudy
              </Link>
            </div>
            {/* navbar*/}
            <div className=" items-center flex">
              <NavItem
                setOpenSidebar={setOpenSidebar}
                activeItem={activeItem}
                isMobile={false}
              />

              {/* Theme Switch*/}
              <ThemeSwitcher />

              {/* only mobile*/}
              <div className=" 800px:hidden ">
                <HiOutlineMenuAlt3
                  size={25}
                  className="cursor-pointer dark:text-white text-black"
                  onClick={() => setOpenSidebar(true)}
                />
              </div>

              {/* profile circle*/}
              {user ? (
                <Link href={"/profile"}>
                  <Image
                    src={user.avatar ? user.avatar.url : avatar}
                    className=" cursor-pointer  hidden 800px:block w-[30px] h-[30px]  rounded-full"
                    alt={""}
                    width={30}
                    height={30}
                  />
                </Link>
              ) : (
                <HiOutlineUserCircle
                  size={25}
                  className="   hidden 800px:block cursor-pointer dark:text-white text-black"
                  onClick={() => setOpen(true)}
                />
              )}
            </div>
          </div>
        </div>

        {/* mobile device*/}

        {openSidebar && (
          <div
            className=" fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]"
            onClick={handleClose}
            id="screen"
          >
            <div className=" w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-800 dark:bg-opacity-90 top-0 right-0">
              <NavItem
                setOpenSidebar={setOpenSidebar}
                activeItem={activeItem}
                isMobile={true}
              />

              {user ? (
                <Link href={"/profile"}>
                  <Image
                    src={user.avatar ? user.avatar.url : avatar}
                    className=" my-2 ml-6 cursor-pointer  w-[30px] h-[30px]  rounded-full"
                    alt={""}
                    width={30}
                    height={30}
                  />
                </Link>
              ) : (
                <HiOutlineUserCircle
                  size={25}
                  className="cursor-pointer my-2 ml-5 dark:text-white text-black"
                  onClick={() => {
                    setOpen(true);
                    setOpenSidebar(false);
                  }}
                />
              )}

              <br />
              <br />
              <p className="  text-black dark:text-white text-[16px] px-2 pl-5">
                Copyright © 2024 SmartStudy
              </p>
            </div>
          </div>
        )}
      </div>
      {open && (
        <CustomModal
          open={open}
          setOpen={setOpen}
          SetRoute={setRoute}
          component={
            route === "Login"
              ? Login
              : route === "Sign-Up"
                ? SignUp
                : route === "Verification"
                  ? Verification
                  : null
          }
          activeItem={activeItem}
        />
      )}
    </div>
  );
};

export default Header;
