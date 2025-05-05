import React from 'react'
import { FiPackage, FiUsers } from 'react-icons/fi'
import { IoCalendar, IoStatsChart } from 'react-icons/io5'
import { formatDate } from '../../../utils/formatDate';

interface WorkspaceOverviewProps {
    workspaceName: string;
    subscriptionName: string;
    memberCount: number;
    subscriptionStatus: string;
    subscriptionPrice: string;
    subscriptionCreatedAt: string;
    subscriptionExpiresAt: string;
    projectCount: number;

}

const WorkspaceOverview: React.FC<WorkspaceOverviewProps> = ({ workspaceName, subscriptionName, projectCount, memberCount, subscriptionStatus, subscriptionPrice, subscriptionCreatedAt, subscriptionExpiresAt, }) => {
    return (
        <div className="space-y-6  w-full">
            <div className="bg-gradient-to-r from-blue-800 to-blue-600 rounded-md p-6 shadow-lg w-full">
                <h3 className="text-2xl font-bold mb-3">
                    {workspaceName || "Workspace"}
                </h3>
                <div className="flex flex-wrap gap-4">
                    <div className="bg-blue-700/50 rounded-md p-3 flex items-center space-x-3">
                        <FiPackage className="text-blue-200" size={20} />
                        <div>
                            <p className="text-blue-200 text-sm">Plan</p>
                            <p className="font-semibold">{subscriptionName}</p>
                        </div>
                    </div>
                    <div className="bg-blue-700/50 rounded-md p-3 flex items-center space-x-3">
                        <IoStatsChart className="text-blue-200" size={20} />
                        <div>
                            <p className="text-blue-200 text-sm">Projects</p>
                            <p className="font-semibold">{projectCount}</p>
                        </div>
                    </div>
                    <div className="bg-blue-700/50 rounded-md p-3 flex items-center space-x-3">
                        <FiUsers className="text-blue-200" size={20} />
                        <div>
                            <p className="text-blue-200 text-sm">Members</p>
                            <p className="font-semibold">{memberCount}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#202020] rounded-md p-6 shadow-md w-full">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold flex items-center">
                            <FiPackage className="mr-2 text-blue-400" />
                            Subscription Details
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${subscriptionStatus === "ACTIVE"
                                ? "bg-green-900/50 text-green-400"
                                : "bg-yellow-900/50 text-yellow-400"
                            }`}>
                            {subscriptionStatus}
                        </span>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-400">Plan Type</span>
                            <span className="font-medium">{subscriptionName}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Price</span>
                            <span className="font-medium">
                                ${subscriptionPrice}
                                <span className="text-gray-500 text-sm">/month</span>
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Activated</span>
                            <span className="font-medium">{subscriptionCreatedAt}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Expires</span>
                            <span className="font-medium">{subscriptionExpiresAt}</span>
                        </div>
                        {/* <div className="pt-3">
                            <button className="bg-blue-600 hover:bg-blue-700 transition-colors text-white rounded-lg py-2 px-4 w-full">
                                Upgrade Plan
                            </button>
                        </div> */}
                    </div>
                </div>

                <div className="bg-[#202020] rounded-md p-6 shadow-md w-full">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold flex items-center">
                            <IoStatsChart className="mr-2 text-purple-400" />
                            Workspace Analytics
                        </h3>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-gray-400">Project Utilization</span>
                                <span className="text-gray-300">{projectCount}/10</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2.5">
                                <div
                                    className="bg-purple-600 h-2.5 rounded-full"
                                    style={{ width: `${Math.min((projectCount / 10) * 100, 100)}%` }}
                                ></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-gray-400">Member Utilization</span>
                                <span className="text-gray-300">{memberCount}/5</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2.5">
                                <div
                                    className="bg-blue-600 h-2.5 rounded-full"
                                    style={{ width: `${Math.min((memberCount / 5) * 100, 100)}%` }}
                                ></div>
                            </div>
                        </div>
                        <div className="pt-3">
                            <p className="text-gray-400 mb-2">Last Activity</p>
                            <div className="bg-[#252729] p-2 rounded-md">
                                <div className="flex items-center space-x-2">
                                    <IoCalendar className="text-gray-500" />
                                    <span className="text-gray-300">{formatDate(new Date().toISOString())}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WorkspaceOverview