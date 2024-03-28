"use client";
import React, { FC, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Courses from "./components/Course/Courses";
import Reviews from "./components/Review/Reviews";
import FAQ from "./components/FAQ/FAQ";
import Footer from "./components/Footer/Footer";

interface Props { }

const Page: FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState('Login')
  return (
    <div>
      <Heading
        title="SmartStudy"
        description="SmartStudy: Transforming education with personalized guidance and state-of-the-art resources."
        keywords="Programming,MERN,Redux,Machine Learning,React,Next,JavaScript,Python,Database"
      />
      <Header open={open} setOpen={setOpen} route={route} setRoute={setRoute} activeItem={activeItem} />
      <Hero />
      <Courses />
      <Reviews />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Page;
