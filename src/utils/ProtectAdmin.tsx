
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const ProtectAdmin: React.FC = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  console.log("userDetials form the protected admin", user)
  console.log("user detials", user)
  if (!isAuthenticated ||  !user || user.role !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default ProtectAdmin;