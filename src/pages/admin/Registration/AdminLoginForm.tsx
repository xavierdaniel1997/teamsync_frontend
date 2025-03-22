import React from 'react'
import LoginForm from '../../global/Login'
import { useNavigate } from 'react-router-dom'
import { useAdminAuthMutation } from '../../../hooks/useAdminAuth'

const AdminLoginForm: React.FC = () => {
    const {adminLogin} = useAdminAuthMutation()
    const navigate = useNavigate()
  return (
    <div>
        <LoginForm
        title="Log in to TeamSync (Admin)"
        loginMutation={adminLogin}
        signUpLink="/admin-sign-up"
        forgotPasswordLink="/admin-forgot-password"
        onSuccessRedirect={() => navigate('/admin')}
        />
    </div>
  )
}

export default AdminLoginForm