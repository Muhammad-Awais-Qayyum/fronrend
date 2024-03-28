"use client";
import Heading from "@/app/utils/Heading";
import React from "react";
import AdminSidebar from "../../components/AdminSidebar";
import DashboardHero from "@/app/components/DashboardHero";
import AdminProtected from "@/app/hooks/adminProtected";
import EditHero from "@/app/components/Hero/EditHero";


type Props = {};

const page = (props: Props) => {
    return (
        <div>
            <AdminProtected>
                <Heading
                    title={`Hero`}
                    description="SmartStudy: Transforming education with personalized guidance and state-of-the-art resources."
                    keywords="Programming,MERN,Redux,Machine Learning,React,Next,JavaScript,Python,Database"
                />

                <div className=" flex h-screen">
                    <div className=" w-1/5 1500px:w-[16%] ">
                        <AdminSidebar />
                    </div>

                    <div className=" w-[85%]">
                        <DashboardHero  />
                        <EditHero />
                    </div>
                </div>
            </AdminProtected>
        </div>
    );
};

export default page;
