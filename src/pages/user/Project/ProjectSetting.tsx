import React, { useState } from "react";
import SidebarTab from "../../../components/user/SidebarTab";
import ProjectSettingForm from "./ProjectSettingForm";
import ProjectMembers from "./ProjectMembers";
import InvitedMembers from "./InvitedMembers";
import MyProjects from "./MyProjects";

const tabOptions = [
  { label: "General", value: "general" },
  { label: "Team & Members", value: "members" },
  {label: "Invited Peoples", value: "invitedPeoples"},
  { label: "Project States", value: "projectStates" },
  {label: "My Projects", value: "myProjects"}
];

const ProjectSetting: React.FC = () => {
  const [activeTab, setActiveTab] = useState("general");

  const renderContent = () => {
    switch (activeTab) {
      case "general":
        return <ProjectSettingForm />;
      case "members":
        return <ProjectMembers />;
      case "invitedPeoples":
        return <InvitedMembers/>;
      case "projectStates":
        return <div>Project States content coming soon...</div>;
      case "myProjects":
         return <MyProjects/>;
      default:
        return <div>Select a tab to view content</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#191919]">
      <SidebarTab
        tabs={tabOptions}
        selectedTab={activeTab}
        onSelect={setActiveTab}
      />
      <div className="flex-1 py-6 pl-2 pr-10 text-white">
        <div className="mt-4">{renderContent()}</div>
      </div>
    </div>
  );
};

export default ProjectSetting;