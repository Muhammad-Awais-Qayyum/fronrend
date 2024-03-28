"use client";
import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { styles } from "../styles/style";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";

type Props = {
  setRoute: (route: string) => void;
};

const Schema = Yup.object().shape({
  name: Yup.string().required("Please enter your name!"),
  email: Yup.string()
    .email("Invalid email!")
    .required("Please enter your email!"),
  password: Yup.string().required("Please enter your password!").min(6),
});

const SignUp: FC<Props> = ({ setRoute }) => {
  const [show, setShow] = useState(false);

  const [register, { isSuccess, data, error }] = useRegisterMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration successful";
      toast.success(message);
      setRoute("Verification");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data.message);
      }
    }
  }, [data?.message, error, isSuccess, setRoute]);

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: Schema,
    onSubmit: async ({ name, email, password }) => {
      const data = {
        name,
        email,
        password,
      };

      await register(data);
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;
  return (
    <div className=" w-full">
      <h1 className={`${styles.title}`}>Join with SmartStudy</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className={`${styles.label}`}>
          Enter your Name
        </label>
        <input
          type="text"
          name=""
          value={values.name}
          onChange={handleChange}
          id="name"
          placeholder="John Doe"
          className={`
        ${errors.name && touched.name && " border-red-500"}
         w-full text-black dark:text-white bg-transparent border rounded
          h-[40px] px-2     outline-none mt-[10px] font-Poppins
        `}
        />
        {errors.name && touched.name && (
          <span className=" text-red-500 pt-1 block">{errors.name}</span>
        )}

        <div className=" mt-2 w-full mb-1 relative">
          <label htmlFor="email" className={`${styles.label}`}>
            Enter your Email
          </label>
          <input
            type="email"
            name=""
            value={values.email}
            onChange={handleChange}
            id="email"
            placeholder="loginmail@gmail.com"
            className={`
        ${errors.email && touched.email && " border-red-500"}
         w-full text-black dark:text-white bg-transparent border rounded
          h-[40px] px-2    outline-none mt-[10px] font-Poppins
        `}
          />
          {errors.email && touched.email && (
            <span className=" text-red-500 pt-1 block">{errors.email}</span>
          )}
        </div>
        <div className=" mt-2  w-full mb-1 relative">
          <label htmlFor="password" className={`  ${styles.label}`}>
            Enter your Password
          </label>
          <input
            type={!show ? "password" : "text"}
            name="password"
            value={values.password}
            onChange={handleChange}
            id="password"
            placeholder="password!@#"
            className={`
        ${errors.password && touched.password && " border-red-500"}
         w-full text-black dark:text-white bg-transparent border rounded
          h-[40px] px-2 outline-none mt-[10px] font-Poppins
        `}
          />

          {!show ? (
            <AiOutlineEyeInvisible
              size={20}
              className={` ${
                errors.password && touched.password && " bottom-[2.43rem]  "
              } dark:text-white absolute bottom-2  right-2 z-1 cursor-pointer`}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              size={20}
              className={` ${
                errors.password && touched.password && " bottom-[2.43rem]  "
              } dark:text-white absolute bottom-2  right-2 z-1 cursor-pointer`}
              onClick={() => setShow(false)}
            />
          )}
          {errors.password && touched.password && (
            <span className=" text-red-500  pt-1 block">{errors.password}</span>
          )}
        </div>
        <div className=" w-full mt-5">
          <input
            type="submit"
            value="Sign up"
            className={` ${styles.button}
           `}
          />
        </div>
        <br />
        <h5 className="  text-center  font-Poppins text-[14px]  text-black dark:text-white">
          Or join with
        </h5>
        <div className=" flex justify-center items-center my-2">
          <FcGoogle size={30} className=" cursor-pointer mr-2" />
          <AiFillGithub
            size={30}
            className=" dark:text-white cursor-pointer ml-2"
          />
        </div>
        <h5 className=" text-center  dark:text-white  font-Poppins text-[14px] ">
          Already have an account?{" "}
          <span
            className=" text-[#2190ff] pl-1 cursor-pointer"
            onClick={() => setRoute("Login")}
          >
            Sign in
          </span>
        </h5>
      </form>
    </div>
  );
};

export default SignUp;
