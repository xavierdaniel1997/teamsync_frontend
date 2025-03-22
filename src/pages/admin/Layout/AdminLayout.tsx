import React from 'react'
import SideBar from '../../../components/globa/SideBar'
import Navbar from '../../../components/globa/Navbar'
import { Outlet } from 'react-router-dom'

const AdminLayout: React.FC = () => {
  return (
    <div>
        <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="fixed top-0 left-0 w-full z-50 h-16 bg-white">
        <Navbar />
      </div>

      <div className="flex">
        <div className="fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-[#252B2B]">
          <SideBar />
        </div>

        <div className="flex-1 ml-64 p-6 mt-16">
          {/* <h1 className="text-2xl font-bold">Dashboard Content</h1> */}
          <Outlet/>
          
        </div>
      </div>
    </div>
    </div>
  )
}

export default AdminLayout