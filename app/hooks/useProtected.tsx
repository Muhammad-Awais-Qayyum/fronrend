import { redirect } from "next/navigation";
import UserAuth from "./userAuth";
import React from "react";

interface ProtectedProps {
  children: React.ReactNode;
}
export default function useProtected({ children }: ProtectedProps) {
  // i make a userauth hook that check  the user is
  // logged in y not
  const isAuthenticated = UserAuth();

  // if logged in then childern run  children means pages
  // otherwise home page
  return isAuthenticated ? children : redirect("/");
}
