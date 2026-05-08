import React from "react";
import LoginPanel from "./login/panel/LoginPanel";
import RegisterForm from "./register/view/RegisterForm";

const RegisterPage: React.FC = () => {
  return (
    <div className='min-h-screen bg-background grid grid-cols-1 lg:grid-cols-2'>
      {/* Left — reuse the same gradient panel as login */}
      <LoginPanel />

      {/* Right — register form */}
      <div className='flex flex-col justify-center'>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
