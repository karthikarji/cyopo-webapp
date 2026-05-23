import React from "react";
import LoginPanel from "./login/panel/LoginPanel";
import ResetPasswordForm from "./reset-password/view/ResetPasswordForm";

const ResetPasswordPage: React.FC = () => (
  <div className='min-h-screen bg-background grid grid-cols-1 lg:grid-cols-2'>
    <LoginPanel />
    <div className='flex flex-col justify-center'>
      <ResetPasswordForm />
    </div>
  </div>
);

export default ResetPasswordPage;
