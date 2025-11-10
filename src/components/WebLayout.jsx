import React from 'react'
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Headers from "./Headers";


export default function WebLayout() {
  return (
    <>
      <Headers />
            <main>
                {<Outlet/>}
            </main>
      <Footer />
    </>
  );
}
