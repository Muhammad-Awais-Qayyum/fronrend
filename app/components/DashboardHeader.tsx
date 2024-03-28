"use client";
import React, { FC, useEffect, useState } from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import { IoMdNotificationsOutline } from "react-icons/io";
import socketio from 'socket.io-client';
import { useGetAllNotificatinQuery, useUpdateNotificationMutation } from "@/redux/features/notification/notificationApi";
import { format } from "timeago.js";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || '';
const socketid = socketio(ENDPOINT, { transports: ['websocket'] });
type Props = {
  open: boolean,
  setOpen?: any
};

const DashboardHeader: FC<Props> = ({ open, setOpen }) => {

  const { data, isLoading, refetch } = useGetAllNotificatinQuery(undefined, {
    refetchOnMountOrArgChange: true
  })

  const [updateNotification, { isSuccess }] = useUpdateNotificationMutation()

  const [notification, setNotification] = useState<any>([])

  const [audio] = useState(
    new Audio(
      'https://res.cloudinary.com/dpzaqs8rh/video/upload/v1711274342/notification/q8fi6v1rj2xxyk1vfntc.mp3'
    )
  )

  const playNotificationSound = () => {
    audio.play();
  }

  useEffect(() => {
    if (data && data.notification) {
      setNotification(data.notification.filter((item: any) => item.status === 'unread'));
  }
    if (isSuccess) {
      refetch()
    }
    audio.load()
  }, [data, isSuccess,audio,refetch])

  useEffect(() => {
    socketid.on('newNotification', () => {
      playNotificationSound()
      refetch()
    })
  }, [playNotificationSound,refetch])

  const handleNotificationStatus = async (id: string) => {
    await updateNotification(id)
  }
  return (
    <div className=" w-full flex items-center justify-end p-6 fixed z-[999999]  top-6  right-0">
      <ThemeSwitcher />
      <div
        className=" relative  cursor-pointer m-2"
        onClick={() => setOpen(!open)}
      >
        <IoMdNotificationsOutline className=" text-2xl cursor-pointer dark:text-white text-black" />
        <span
          className=" absolute -top-2 -right-2 bg-[#3ccba0] 
         rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white
        "
        >
          {notification && notification.length}
        </span>
      </div>

      {open && (
        <div
          className=" w-[70%] sm:w-[350px] h-[50vh]      overscroll-auto dark:bg-[#111C43] bg-white shadow-xl
       absolute top-16  z-10 rounded
      
      "
        >
          <h5 className=" text-center text-[20px] font-Poppins text-black dark:text-white p-3">
            Notifications
          </h5>

         {
          notification && notification.map((item:any,index:number)=>(
            <div key={index} className=" dark:bg-[#2d3a4ea1] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f]">
            <div className=" w-full flex items-center justify-between p-2">
              <p className="text-[15px]  800px:text-[16px]  text-black dark:text-white">
                {item.title}
              </p>
              <p className="  text-[13px] 800px:text-[16px]  text-black dark:text-white cursor-pointer"
               onClick={()=>handleNotificationStatus(item._id)}
              >
                Mark as read
              </p>
            </div>
            <p className=" px-2 text-black dark:text-white">
              {item.message}
            </p>
            <p className=" p-2 text-black dark:text-white  text-[14px]">
             {format(item.createdAt)}
            </p>
          </div>

          ))
         }
          
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
