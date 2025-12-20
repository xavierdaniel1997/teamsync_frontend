// components/UserLoginForm.tsx
import React from 'react';
import { useAuthMutations } from '../../../hooks/useAuth';
import LoginForm from '../../global/Login';


const UserLoginForm: React.FC = () => {
  const { loginUser } = useAuthMutations();

  return (
    <LoginForm
      title="Log in to TeamSync"
      loginMutation={loginUser}
      signUpLink="/user-sign-up"
      forgotPasswordLink="/forgot-password"
      isAdmin={false}
    />
  );
};

export default UserLoginForm;