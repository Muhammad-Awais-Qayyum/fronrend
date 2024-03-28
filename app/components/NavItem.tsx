import Link from "next/link";
import React from "react";

export const navItemData = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Courses",
    url: "/courses",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "FAQ",
    url: "/faq",
  },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
  setOpenSidebar: (openSidebar: boolean) => void;
};

const NavItem: React.FC<Props> = ({ activeItem, isMobile, setOpenSidebar }) => {
  return (
    <>
      {/* medium screen to next*/}
      <div className=" hidden 800px:flex">
        {navItemData &&
          navItemData.map((i, index) => (
            <Link href={`${i.url} `} key={index} passHref>
              <span
                className={`${
                  activeItem === index
                    ? " text-[crimson] dark:text-[#37a39a]"
                    : " text-black dark:text-white"
                } text-[18px] px-6   font-Poppins font-[400]`}
              >
                {i.name}
              </span>
            </Link>
          ))}
      </div>
      {/* only small screen to next*/}
      {isMobile && (
        <div className=" 800px:hidden mt-5">
          <div className=" text-center  w-full py-6">
            <Link href={"/"} passHref>
              <span
                className={` text-[25px] font-Poppins font-[500] text-black dark:text-white`}
                onClick={() => setOpenSidebar(false)}
              >
                SmartStudy
              </span>
            </Link>
          </div>
          {navItemData.map((i, index) => (
            <Link href={`${i.url} `} key={index} passHref>
              <span
                onClick={() => setOpenSidebar(false)}
                className={`${
                  activeItem === index
                    ? " text-[crimson] dark:text-[#37a39a]"
                    : " text-black dark:text-white"
                }  block py-5 text-[18px] px-6 font-Poppins font-[400]`}
              >
                {i.name}
              </span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default NavItem;
