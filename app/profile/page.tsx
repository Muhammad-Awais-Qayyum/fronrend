"use client";
import React, { FC, useState } from "react";
import Protected from "../hooks/useProtected";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Profile from "../components/Profile";
import { useSelector } from "react-redux";
import Footer from "../components/Footer/Footer";
type Props = {};

const Page: FC<Props> = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const { user } = useSelector((state: any) => state.auth);
  return (
    <div className=" min-h-screen">
      <Protected>
        <Heading
          title={`${user?.name} profile`}
          description="SmartStudy: Transforming education with personalized guidance and state-of-the-art resources."
          keywords="Programming,MERN,Redux,Machine Learning,React,Next,JavaScript,Python,Database"
        />
        <Header open={open} setOpen={setOpen} activeItem={activeItem} />
      
      <Profile user={user} />
      <Footer/>
      </Protected>
    </div>
  );
};

export default Page;
