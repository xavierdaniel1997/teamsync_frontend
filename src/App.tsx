import { Toaster } from "sonner";
import LandingPage from "./pages/global/LandingPage"
import LoginForm from "./pages/global/LoginForm"
import Dashboard from "./pages/user/Dashboard/Dashboard"
import OTPVerificationForm from "./pages/user/RegistrationProcess/OTPVerificationForm"
import ProfileSetupForm from "./pages/user/RegistrationProcess/ProfileSetupForm"
import SignUpForm from "./pages/user/RegistrationProcess/SignUpForm"
import { BrowserRouter, Routes, Route } from 'react-router-dom'




const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Toaster position="bottom-center" richColors />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user-sign-up" element={<SignUpForm />} />
        <Route path="/verify-otp" element={<OTPVerificationForm />} />
        <Route path="/set-up-profile" element={<ProfileSetupForm />} />
        <Route path="/login" element={<LoginForm />} />

        <Route>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;