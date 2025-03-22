
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const ProtectUser: React.FC = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  console.log("user detials", user)
  if (!isAuthenticated ||  !user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectUser;