// components/UserLoginForm.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthMutations } from '../../../hooks/useAuth';
import LoginForm from '../../global/Login';


const UserLoginForm: React.FC = () => {
  const { loginUser } = useAuthMutations();
  const navigate = useNavigate();

  return (
    <LoginForm
      title="Log in to TeamSync"
      loginMutation={loginUser}
      signUpLink="/user-sign-up"
      forgotPasswordLink="/forgot-password"
      onSuccessRedirect={() => navigate('/create-work-space')}
    />
  );
};

export default UserLoginForm;