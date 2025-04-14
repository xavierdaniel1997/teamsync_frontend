import React from "react";

interface Tab {
  label: string;
  value: string;
}

interface SidebarTabProps {
  tabs: Tab[];
  selectedTab: string;
  onSelect: (value: string) => void;
}

const SidebarTab: React.FC<SidebarTabProps> = ({ tabs, selectedTab, onSelect }) => {
  return (
    <div className="w-64 bg-[#191919] text-white py-6 px-5">
      <h2 className="text-sm text-gray-400 font-medium mb-4">Project Settings</h2>
      <ul className="space-y-1">
        {tabs.map((tab) => (
          <li
            key={tab.value}
            onClick={() => onSelect(tab.value)}
            className={`px-3 py-2 rounded cursor-pointer text-sm ${
              selectedTab === tab.value
                ? "bg-[#0052cc57] text-white"
                : "hover:bg-[#1e1e1e] text-gray-300"
            }`}
          >
            {tab.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarTab;
