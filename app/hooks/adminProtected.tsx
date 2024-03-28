import { redirect } from "next/navigation";

import React from "react";
import { useSelector } from "react-redux";

interface ProtectedProps {
  children: React.ReactNode;
}
export default function AdminProtected({ children }: ProtectedProps) {
  const { user } = useSelector((state: any) => state.auth);

  const isAdmin = user?.role === "admin";

  // if admin in then childern run  children means pages
  // otherwise home page
  return isAdmin ? children : redirect("/");
}
