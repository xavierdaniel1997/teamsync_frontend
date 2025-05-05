"use client"

import type React from "react"
import { useState } from "react"
import { FiChevronDown, FiSearch } from "react-icons/fi"
import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"
import ReusableTableTypeOne from "../../../components/globa/ReusableTableTypeOne"
import UserAvatar from "../../../components/globa/UserAvatar"
import { getInitials, getRandomColor } from "../../../utils/userHelpers"
import { formatDate } from "../../../utils/formatDate"
import { IUser } from "../../../types/users"


const ProjectMembers: React.FC = () => {

  const project = useSelector((state: RootState) => state.project.selectedProject)
  const user = useSelector((state: RootState) => state.auth.user)

  const currentUserId = user?._id;
  const currentMember = project?.members.find(
    (member: any) => member.user._id === currentUserId
  );
  const hasEditAccess = currentMember?.accessLevel === "OWNER" || currentMember?.accessLevel === "WRITE";


  const columns = [
    { label: "Full name", field: "fullName" },
    { label: "Email", field: "email" },
    { label: "Account type", field: "accountType" },
    { label: "Joining date", field: "joiningDate" },
  ];

  const memberData = project?.members.map((member: any) => ({
    fullName: (
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full bg-[#444] mr-3 overflow-hidden">
          <UserAvatar user={member.user || undefined} getRandomColor={getRandomColor} getInitials={getInitials} />
        </div>
        <span>{`${member.user.fullName}${member.user.secondName ? ` ${member.user.secondName}` : ''}`}</span>
      </div>
    ),
    email: member.user.email,
    accountType: (
      <div className="flex items-center">
        <span>{member.accessLevel}</span>
        <FiChevronDown className="ml-2 text-gray-400" />
      </div>
    ),
    joiningDate: formatDate(member.user.createdAt),
  })) || [];

  return (
    <div className="min-h-screen  p-7">

      {
        hasEditAccess && 
        <>
        <h1 className="text-2xl font-medium mb-8">Defaults</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <p className="text-[#f0f0f0] mb-2">Project lead</p>
          <button className="w-full flex items-center justify-between bg-[#1e1e1e] border border-[#333] rounded-sm px-3 py-1.5">
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-[#444] mr-3 overflow-hidden">
                <img src="/placeholder.svg?height=24&width=24" alt="User avatar" />
              </div>
              <span>danielcx532</span>
            </div>
            <FiChevronDown className="text-gray-400" />
          </button>
        </div>

        <div>
          <p className="text-[#f0f0f0] mb-2">Default assignee</p>
          <button className="w-full flex items-center justify-between bg-[#1e1e1e] border border-[#333] rounded-sm  px-3 py-1.5">
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-[#444] mr-3 overflow-hidden">
                <img src="/placeholder.svg?height=24&width=24" alt="User avatar" />
              </div>
              <span>danielcx532</span>
            </div>
            <FiChevronDown className="text-gray-400" />
          </button>
        </div>
      </div>

      <div className="mb-12">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-medium text-[#f0f0f0]">Grant view access to all work items for guest users:</h2>
        </div>
        <p className="text-gray-400">This will allow guests to have view access to all the project work items.</p>
      </div>
      </>}

      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium text-[#f0f0f0]">Members</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                placeholder="Search"
                className="pl-9 pr-3 text-sm bg-[#1e1e1e] border border-[#333] rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 h-8"
              />
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 text-sm rounded-sm transition-colors">
              Add member
            </button>
          </div>
        </div>

        <ReusableTableTypeOne columns={columns} data={memberData} />
      </div>
    </div>
  )
}

export default ProjectMembers
