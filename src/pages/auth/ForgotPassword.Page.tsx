import React from "react";
import LoginPanel from "./login/panel/LoginPanel";
import ForgotPasswordForm from "./forgot-password/view/ForgotPasswordForm";

const ForgotPasswordPage: React.FC = () => (
  <div className='min-h-screen bg-background grid grid-cols-1 lg:grid-cols-2'>
    <LoginPanel />
    <div className='flex flex-col justify-center'>
      <ForgotPasswordForm />
    </div>
  </div>
);

export default ForgotPasswordPage;
