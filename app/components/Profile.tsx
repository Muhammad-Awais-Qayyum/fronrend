"use client";
import React, { FC, useEffect, useState } from "react";
import SideBarProfile from "./SideBarProfile";
import { useLogoutQuery } from "@/redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import CourseCard from "./Course/CourseCard";
import { useUserAllCourseQuery } from "@/redux/features/course/courseApi";

type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setscroll] = useState(false);

  const [avatar, setAvatar] = useState(null);
  const { data, isLoading } = useUserAllCourseQuery(undefined, {})

  const [logout, setLogout] = useState(false);
  const { } = useLogoutQuery(undefined, {
    skip: !logout ? true : false,
  });
  const [active, setActive] = useState(1);
const [course,setCourses]=useState([])
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setscroll(true);
      } else {
        setscroll(false);
      }
    });
  }

  const LogoutHandler = async () => {
    setLogout(true);

    await signOut();
  };

  useEffect(() => {
    if (data) {
      const filteredCourses = user.courses
      .map((i: any) =>
        data.course.find((course: any) => course._id === i._id))
        .filter((course: any) => course !== undefined)
      
      setCourses(filteredCourses)
    }
  },[data,user.courses])
  return (
    <div className=" w-[85%] flex mx-auto">
      <div
        className={`w-[60px] 800px:w-[35%] h-[420px] dark:bg-slate-900 bg-[#F5F5F5] bg-opacity-90 border dark:border-[#ffffff1d] border-[#0000000f] rounded-[5px]  shadow-sm dark:shadow-sm mt-[80px] mb-[80px]
       sticky ${scroll ? "top-[120px]" : "top-[30px]"}
      `}
      >
        <SideBarProfile
          user={user}
          avatar={avatar}
          active={active}
          setActive={setActive}
          LogoutHandler={LogoutHandler}
        />
      </div>

      {active === 1 && (
        <div className=" h-full w-full mt-[80px] bg-transparent">
          <ProfileInfo user={user} avatar={avatar} />
        </div>
      )}

      {active === 2 && (
        <div className=" h-full w-full mt-[80px] bg-transparent">
          <ChangePassword />
        </div>
      )}
      {active === 3 && (
        <div className="w-full pl-7 px-2 800px:px-10 800px:pl-8 mt-[80px]">
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
            {course &&
              course.map((item: any, index: number) => (
                <CourseCard item={item} key={index} isProfile={true} />
              ))}
          </div>
          {course.length === 0 && (
            <h1 className="text-center text-[18px] font-Poppins dark:text-white text-black">
              You don&apos;t have any purchased courses!
            </h1>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
