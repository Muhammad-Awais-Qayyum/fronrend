"use client";
import React from "react";
import Heading from "../utils/Heading";
import AdminSidebar from "../components/AdminSidebar";
import AdminProtected from "../hooks/adminProtected";
import DashboardHero from "../components/DashboardHero";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title={`SmartStudy - Admin`}
          description="SmartStudy: Transforming education with personalized guidance and state-of-the-art resources."
          keywords="Programming,MERN,Redux,Machine Learning,React,Next,JavaScript,Python,Database"
        />

        <div className="flex  ">
          {/* Sidebar*/}
          <div className=" w-1/5 1500px:w-[16%] ">
            <AdminSidebar />
          </div>

          {/* Right*/}
          <div className="w-[85%]">
            <DashboardHero isDashboard={true} />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
