import React from 'react'
import Aside from '../common/Aside'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
  return (
    <>
      <Aside />
      <div>
        <ToastContainer />

        <div className="startbar-overlay d-print-none" />
        <div className="page-wrapper">
          <Outlet />
        </div>
      </div>


    </>
  )
}

export default Layout