"use client";
import React, { useEffect, useState } from "react";
import { Poppins, Josefin_Sans } from "next/font/google"; // Importing font functions from next/font/google
import ThemeProvider from "./utils/theme-Provide"; // Importing ThemeProvider component
import "./globals.css"; // Importing global CSS file
import { Toaster } from "react-hot-toast";
import { Providers } from "./Provider";
import { SessionProvider } from "next-auth/react";
import Loader from "./components/Loader";
import socketio from 'socket.io-client';
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
const ENDPOINT=process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || '';
const socketid=socketio(ENDPOINT,{transports:['websocket']});
// Creating font variables using font functions
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Corrected property name to "weights"
  variable: "--font-Poppins",
});
const Josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Corrected property name to "weights"
  variable: "--font-Josefin",
});

// RootLayout component definition
const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${Josefin.variable} !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300`}
      >
        {/* Wrapping children with ThemeProvider component */}
        <Providers>
          <SessionProvider>
            <ThemeProvider attribute="class" defaultTheme="sytem" enableSystem>
              <Custom>{children}</Custom>
              <Toaster position="top-center" reverseOrder={false} />
            </ThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
};

const Custom: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const {isLoading}=useLoadUserQuery({})

  useEffect(() => {
    socketid.on('connection',()=>{})
  
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && children}
    </>
  );
};

export default RootLayout;
