"use client";
import Heading from "@/app/utils/Heading";
import React, { useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import AdminProtected from "@/app/hooks/adminProtected";
import DashboardHero from "@/app/components/DashboardHero";
import UsersAnalaytics from "@/app/components/Analaytics/UsersAnalaytics";



type Props = {};

const Page = (props: Props) => {
    const [isDashboard, setDashboard] = useState(false);
    return (
        <div>
            <AdminProtected>
                <Heading
                    title={`Users Analytics`}
                    description="SmartStudy: Transforming education with personalized guidance and state-of-the-art resources."
                    keywords="Programming,MERN,Redux,Machine Learning,React,Next,JavaScript,Python,Database"
                />

                <div className=" flex h-screen">
                    <div className=" w-1/5 1500px:w-[16%] ">
                        <AdminSidebar />
                    </div>

                    <div className=" w-[85%]">
                        <DashboardHero  />
                        <UsersAnalaytics isUsers={true} isDashboard={isDashboard} setDashboard={setDashboard} />

                    </div>
                </div>
            </AdminProtected>
        </div>
    );
};

export default Page;
