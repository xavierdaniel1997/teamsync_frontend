import React, { useState } from 'react';
import BreadCrumb from '../../../components/globa/BreadCrumb';
import { FiPlus } from 'react-icons/fi';
import AddMemberDialog from '../../../components/user/AddMemberDialog';

const TeamMembers: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [teamEmails, setTeamEmails] = useState<string[]>([]); // Store emails in parent component

  const handleAddMember = (emails: string[]) => {
    setTeamEmails((prev) => [...prev, ...emails]); // Add new emails to the list
    console.log('Added emails:', emails); // For debugging or further processing
  };

  return (
    <div>
      <div>
        <BreadCrumb
          pageName="Team And Members"
          buttonText="Add Member"
          onButtonClick={() => setOpen(true)}
          ButtonIcon={FiPlus}
        />
      </div>
      <AddMemberDialog open={open} onClose={() => setOpen(false)} onAddMember={handleAddMember} />
      {/* Optional: Display added emails */}
      <div>
        {teamEmails.map((email) => (
          <div key={email}>{email}</div>
        ))}
      </div>
    </div>
  );
};

export default TeamMembers;