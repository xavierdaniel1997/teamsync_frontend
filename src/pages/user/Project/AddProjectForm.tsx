import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';

const AddProjectForm = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
    {/* Back to project types link */}
    <div className="mb-6">
      <a href="#" className="text-blue-400 hover:underline flex items-center">
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to project types
      </a>
    </div>

    <div className="flex justify-between">
      {/* Left Section: Add project details */}
      <div className="w-1/2">
        <h2 className="text-2xl font-bold mb-2">Add project details</h2>
        <p className="text-gray-400 mb-4">
          Explore what’s possible when you collaborate with your team. Edit project details in project settings.
        </p>
        <p className="text-gray-400 mb-4">
          Required fields are marked with an asterisk <span className="text-red-500">*</span>
        </p>

        {/* Form */}
        <form>
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Try a team name, project goal, milestone..."
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-1">
              Key <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="KEY 1"
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="flex items-center text-gray-300">
              <input type="checkbox" className="mr-2 bg-gray-800 border-gray-700 text-blue-500 focus:ring-blue-500" />
              Share settings with an existing project
            </label>
          </div>
        </form>
      </div>

      {/* Right Section: Template and Type */}
      <div className="w-1/3">
        {/* Template Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="text-gray-300">Template</label>
            <a href="#" className="text-blue-400 hover:underline">Change template</a>
          </div>
          <div className="p-4 bg-gray-800 rounded">
            <div className="flex items-center">
              <div className="mr-4">
                <svg
                  className="w-8 h-8 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4v16h16M4 12h16m-8-8v16"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Scrum <span className="text-blue-500">Jira</span></h3>
                <p className="text-gray-400 text-sm">
                  Sprint toward your project goals with a board, backlog, and timeline.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Type Section */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-gray-300">Type</label>
            <a href="#" className="text-blue-400 hover:underline">Change type</a>
          </div>
          <div className="p-4 bg-gray-800 rounded">
            <div className="flex items-center">
              <div className="mr-4">
                <svg
                  className="w-8 h-8 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Company-managed</h3>
                <p className="text-gray-400 text-sm">
                  Work with other teams across many projects in a standard way.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Buttons */}
    <div className="flex justify-end mt-6">
      <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded mr-2 hover:bg-gray-600">
        Cancel
      </button>
      <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
        Create project
      </button>
    </div>
  </div>
  );
};

export default AddProjectForm;
