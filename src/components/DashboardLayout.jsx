import React, { useEffect, useState } from "react";
import DashboardHeader from "../pages/DashboardHeader";
import DashboardSideShow from "../pages/DashboardSideShow";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

export default function DashboardLayout() {
  const navigate=useNavigate() 


  useEffect(() => {
    const isLocalStorageToken = localStorage.getItem('token');
    if (!isLocalStorageToken) {
      navigate("/");
    }

  }, [navigate]);


  return (
    <div className="grid grid-rows-[auto_1fr] h-screen overflow-hidden">
      <DashboardHeader />

      <main className="w-full flex  ">
        <div className="hidden md:flex ">
          <DashboardSideShow />
        </div>

        <div className=" flex-1 overflow-y-scroll h-screen pb-0 ">
          <Outlet />
      </div>
      </main>
    </div>
  );
}
