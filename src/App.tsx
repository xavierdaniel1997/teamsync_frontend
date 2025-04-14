import { Toaster } from "sonner";
import LandingPage from "./pages/global/LandingPage"
import LoginForm from "./pages/global/LoginForm"
import Dashboard from "./pages/user/Dashboard/Dashboard"
import OTPVerificationForm from "./pages/user/RegistrationProcess/OTPVerificationForm"
import ProfileSetupForm from "./pages/user/RegistrationProcess/ProfileSetupForm"
import SignUpForm from "./pages/user/RegistrationProcess/SignUpForm"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ForgotPassword from "./pages/global/ForgotPassword";
import CreateNewPassword from "./components/globa/CreateNewPassword";
import ProtectUser from "./utils/ProtectUser";
import AdminRegistrationForm from "./pages/admin/Registration/AdminRegistrationForm";
import AdminLoginForm from "./pages/admin/Registration/AdminLoginForm";
import UserLoginForm from "./pages/user/RegistrationProcess/UserLoginForm";
import AdminDashboard from "./pages/admin/Dashboard/AdminDashboard";
import ProtectAdmin from "./utils/ProtectAdmin";
import AdminLayout from "./pages/admin/Layout/AdminLayout";
import Companies from "./pages/admin/Companies/Companies";
import UserLayout from "./pages/user/Layout/UserLayout";
import Backlog from "./pages/user/BackLog/Backlog";
import WorkSpace from "./pages/user/WorkSpace/WorkSpace";
import AddProjectForm from "./pages/user/Project/AddProjectForm";
import Plan from "./pages/admin/Plans/Plan";
import Subscription from "./pages/user/Subscription/Subscription";
import PaymentCancel from "./pages/user/Subscription/PaymentCancel";
import Success from "./pages/user/Subscription/Success";
import PageNotFound from "./components/globa/PageNotFound";
import AcceptInvitation from "./pages/user/TeamAndInvitation/AcceptInvitation";
import TeamMembers from "./pages/user/TeamAndInvitation/TeamMembers";
import WorkSpaceSetting from "./pages/user/WorkSpace/WorkSpaceSetting";
import UserDetials from "./pages/admin/UserManagment/UserDetials";
import UserSettings from "./pages/user/UserSettings/UserSettings";
import ProjectSetting from "./pages/user/Project/ProjectSetting";




const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-center" richColors theme="light" />
      <Routes>
        <Route path="*" element={<PageNotFound/>}/>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user-sign-up" element={<SignUpForm />} />
        <Route path="/verify-otp" element={<OTPVerificationForm />} />
        <Route path="/set-up-profile" element={<ProfileSetupForm />} />
        {/* <Route path="/login" element={<LoginForm />} /> */}
        <Route path="/login" element={<UserLoginForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token/:email" element={<CreateNewPassword />} />

        <Route path="/admin/register" element={<AdminRegistrationForm />} />
        <Route path="/admin/login" element={<AdminLoginForm />} />
        <Route path="/invite/accept" element={<AcceptInvitation/>}/>



        <Route element={<ProtectUser />}>
          <Route path="/subscriptions" element={<Subscription/>}/>
          <Route path="/success" element={<Success/>}/>
          <Route path="/cancel" element={<PaymentCancel/>}/>
          <Route path="/create-work-space" element={<WorkSpace />} />
          <Route path="/workspace-setting" element={<WorkSpaceSetting/>} />
          <Route path="/create-project" element={<AddProjectForm/>} />
          <Route path="/project" element={<UserLayout />} >
            <Route index element={<Dashboard />} />
            <Route path="backlog" element={<Backlog />} />
            <Route path="team-members" element={<TeamMembers/>} />
            <Route path="project-setting" element={<ProjectSetting/>} />
            <Route path="settings" element={<UserSettings/>}/>
          </Route>
        </Route>

        <Route element={<ProtectAdmin />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="companies" element={<Companies />} />
            <Route path="user-details" element={<UserDetials/>} />
            <Route path="plans" element={<Plan/>}/>
          </Route>
        </Route>

      </Routes>


    </BrowserRouter>
  )
}

export default App;