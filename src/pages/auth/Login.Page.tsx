import React from "react";
import LoginPanel from "./login/panel/LoginPanel";
import LoginForm from "./login/view/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <div className='min-h-screen bg-background grid grid-cols-1 lg:grid-cols-2'>
      {/* Left — gradient panel (desktop only) */}
      <LoginPanel />

      {/* Right — form */}
      <div className='flex flex-col justify-center'>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
