import React, { useEffect, useState } from "react";
import ReusableTable from "../../../components/globa/ReusableTable";
import BreadCrumb from "../../../components/globa/BreadCrumb";
import { useAdminUserManagmentMutation } from "../../../hooks/userAdminUserManagement";

interface UserData {
  _id: string;
  email: string;
  fullName?: string;
  role: string;
  avatar?: string;
  isVerified: boolean;
  createdAt: string;
  isRegComplet: boolean;
  subscription?: {
    status?: string;
    stripeSubscriptionId?: string;
    stripeCustomerId?: string;
    createdAt?: string;
    expiresAt?: string;
    plan?: {
      name?: string;
      price?: number;
      projectLimit?: number;
      memberLimit?: number;
      isActive?: boolean;
      createdAt?: string;
    };
  };
}

const columns = [
  { field: "email", label: "Email" },
  { field: "fullName", label: "Full Name" },
//   { field: "role", label: "Role" },
//   { field: "isVerified", label: "Verified" },
  { field: "createdAt", label: "Created At" },
  { field: "subscription.status", label: "Subscription Status" },
  { field: "subscription.plan.name", label: "Plan Name" },
  { field: "subscription.plan.price", label: "Plan Price" },
  { field: "subscription.expiresAt", label: "Expires At" },
];

const UserDetails: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const { getAllUserDetails } = useAdminUserManagmentMutation();
  const { data: userData } = getAllUserDetails;
  console.log("userData form the userDetails", userData)

  useEffect(() => {
    if (userData?.data) {
      setUsers(userData.data);
    }
  }, [userData]);

  return (
    <div className="text-white">
      <BreadCrumb pageName="User Details" />
      <div className="px-5">
        <ReusableTable
          columns={columns}
          data={users}
          isPagination={false}
        />
      </div>
    </div>
  );
};

export default UserDetails;
