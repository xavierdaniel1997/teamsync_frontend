import React from 'react'

interface WorkspaceSubscriptionProps{
    subscriptionName: string;
    subscriptionStatus: string;
    subscriptionPrice: string;
    subscriptionCreatedAt: string;
    subscriptionExpiresAt: string;
}

const WorkspaceSubscription: React.FC<WorkspaceSubscriptionProps> = ({subscriptionName, subscriptionStatus, subscriptionCreatedAt, subscriptionExpiresAt, subscriptionPrice}) => {
  return (
    <div className="bg-[#202020] rounded-md p-6 shadow-md">
    <h3 className="text-2xl font-semibold mb-6">Subscription Management</h3>
    
    <div className="bg-gradient-to-r from-blue-800 to-blue-600 rounded-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-xl font-bold">Current Plan: {subscriptionName}</h4>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          subscriptionStatus === "ACTIVE" 
            ? "bg-green-900/50 text-green-400" 
            : "bg-yellow-900/50 text-yellow-400"
        }`}>
          {subscriptionStatus}
        </span>
      </div>
      <p className="text-blue-200 mb-4">Your subscription renews on {subscriptionExpiresAt}</p>
      <div className="flex space-x-3">
        <button className="bg-white text-blue-800 hover:bg-gray-100 transition-colors rounded-md py-2 px-4 font-medium">
          Upgrade Plan
        </button>
        <button className="bg-blue-700 hover:bg-blue-800 transition-colors text-white rounded-md py-2 px-4">
          Manage Billing
        </button>
      </div>
    </div>
    
    <div className="grid md:grid-cols-3 gap-4 mb-6">
      <div className="bg-[#252729] p-5 rounded-md border-2 border-transparent hover:border-gray-700 transition-all cursor-pointer">
        <h5 className="text-lg font-semibold mb-2">Free</h5>
        <p className="text-2xl font-bold mb-4">$0<span className="text-gray-400 text-sm">/month</span></p>
        <ul className="space-y-2 text-gray-300 mb-6">
          <li>1 Workspace</li>
          <li>3 Projects</li>
          <li>2 Team Members</li>
        </ul>
        <button className="w-full py-2 bg-[#2E3033] hover:bg-[#333] transition-colors rounded-md">
          Current Plan
        </button>
      </div>
      
      <div className="bg-[#252729] p-5 rounded-md border-2 border-blue-600 relative">
        <span className="absolute -top-3 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">Popular</span>
        <h5 className="text-lg font-semibold mb-2">Basic</h5>
        <p className="text-2xl font-bold mb-4">$25<span className="text-gray-400 text-sm">/month</span></p>
        <ul className="space-y-2 text-gray-300 mb-6">
          <li>3 Workspaces</li>
          <li>10 Projects</li>
          <li>5 Team Members</li>
        </ul>
        <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 transition-colors rounded-md text-white">
          Upgrade
        </button>
      </div>
      
      <div className="bg-[#252729] p-5 rounded-md border-2 border-transparent hover:border-gray-700 transition-all cursor-pointer">
        <h5 className="text-lg font-semibold mb-2">Pro</h5>
        <p className="text-2xl font-bold mb-4">$49<span className="text-gray-400 text-sm">/month</span></p>
        <ul className="space-y-2 text-gray-300 mb-6">
          <li>Unlimited Workspaces</li>
          <li>Unlimited Projects</li>
          <li>15 Team Members</li>
        </ul>
        <button className="w-full py-2 bg-[#2E3033] hover:bg-[#333] transition-colors rounded-md">
          Upgrade
        </button>
      </div>
    </div>
    
    <div className="bg-[#252729] p-5 rounded-md">
      <h4 className="text-lg font-semibold mb-4">Billing History</h4>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="text-left text-gray-400 border-b border-gray-700">
            <tr>
              <th className="pb-3">Date</th>
              <th className="pb-3">Amount</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-800">
              <td className="py-3">{subscriptionCreatedAt}</td>
              <td className="py-3">${subscriptionPrice}</td>
              <td className="py-3">
                <span className="px-2 py-1 bg-green-900/30 text-green-400 rounded text-xs">
                  Paid
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  )
}

export default WorkspaceSubscription