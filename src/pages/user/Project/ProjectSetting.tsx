import React, { useState } from "react";
import SidebarTab from "../../../components/user/SidebarTab";

const tabOptions = [
  { label: "General", value: "general" },
  { label: "Members", value: "members" },
  { label: "Project states", value: "projectStates" },
  { label: "Billing & Plans", value: "billing" },
  { label: "Integrations", value: "integrations" },
];

const ProjectSetting: React.FC = () => {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="flex min-h-screen bg-[#191919]">
      <SidebarTab
        tabs={tabOptions}
        selectedTab={activeTab}
        onSelect={setActiveTab}
      />
      <div className="flex-1 p-6 text-white">
        <h1 className="text-2xl font-semibold capitalize">{activeTab.replace(/([A-Z])/g, ' $1')}</h1>
        <p className="mt-4">Content for <strong>{activeTab}</strong> tab will appear here.</p>
      </div>
    </div>
  );
};

export default ProjectSetting;
