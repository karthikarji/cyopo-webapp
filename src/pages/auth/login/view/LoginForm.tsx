import React from "react";
import { Eye, EyeOff } from "lucide-react";
import Button from "@cyopo/Components/button/Button";
import useLogin from "../useLogin";
import {
  LOGIN_TITLE,
  LOGIN_SUBTITLE,
  LOGIN_CTA,
  LOGIN_FORGOT,
  LOGIN_NO_ACCOUNT,
  LOGIN_REGISTER,
  LOGIN_EMAIL_LABEL,
  LOGIN_PASS_LABEL,
} from "../Login.constants";

const LoginForm: React.FC = () => {
  const { state, handlers } = useLogin();

  return (
    <div className='flex flex-col justify-center h-full px-6 sm:px-10 lg:px-16 py-12'>
      {/* Mobile logo */}
      <div className='flex items-center gap-2 font-headline font-bold text-xl text-primary mb-10 lg:hidden'>
        <span className='material-symbols-outlined text-2xl' style={{ fontVariationSettings: "'FILL' 1" }}>
          auto_awesome
        </span>
        cyopo
      </div>

      {/* Header */}
      <div className='mb-8'>
        <h1 className='font-headline font-bold text-on-surface text-3xl sm:text-4xl mb-2'>{LOGIN_TITLE}</h1>
        <p className='text-on-surface-variant text-sm sm:text-base'>{LOGIN_SUBTITLE}</p>
      </div>

      {/* General error */}
      {state.errors.general && (
        <div className='mb-6 px-4 py-3 bg-error-container text-on-error-container rounded-xl text-sm border border-error/20'>
          {state.errors.general}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handlers.handleSubmit} className='flex flex-col gap-5'>
        {/* Email */}
        <div className='flex flex-col gap-1.5'>
          <label className='text-sm font-medium text-on-surface'>{LOGIN_EMAIL_LABEL}</label>
          <input
            type='email'
            value={state.values.email}
            onChange={handlers.handleChange("email")}
            placeholder='you@example.com'
            autoComplete='email'
            className={[
              "w-full px-4 py-3 rounded-xl text-sm",
              "bg-surface-container-lowest border",
              "text-on-surface placeholder:text-on-surface-variant/50",
              "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary",
              "transition-all duration-200",
              state.errors.email ? "border-error focus:ring-error/30 focus:border-error" : "border-outline-variant",
            ].join(" ")}
          />
          {state.errors.email && <p className='text-xs text-error mt-0.5'>{state.errors.email}</p>}
        </div>

        {/* Password */}
        <div className='flex flex-col gap-1.5'>
          <div className='flex items-center justify-between'>
            <label className='text-sm font-medium text-on-surface'>{LOGIN_PASS_LABEL}</label>
            <button type='button' onClick={handlers.handleForgotPassword} className='text-xs text-primary hover:underline'>
              {LOGIN_FORGOT}
            </button>
          </div>
          <div className='relative'>
            <input
              type={state.showPassword ? "text" : "password"}
              value={state.values.password}
              onChange={handlers.handleChange("password")}
              placeholder='••••••••'
              autoComplete='current-password'
              className={[
                "w-full px-4 py-3 pr-12 rounded-xl text-sm",
                "bg-surface-container-lowest border",
                "text-on-surface placeholder:text-on-surface-variant/50",
                "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary",
                "transition-all duration-200",
                state.errors.password ? "border-error focus:ring-error/30 focus:border-error" : "border-outline-variant",
              ].join(" ")}
            />
            <button
              type='button'
              onClick={handlers.handleTogglePassword}
              className='absolute right-3 top-1/2 -translate-y-1/2 p-1 text-on-surface-variant hover:text-on-surface transition-colors'>
              {state.showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {state.errors.password && <p className='text-xs text-error mt-0.5'>{state.errors.password}</p>}
        </div>

        {/* Submit */}
        <Button type='submit' variant='primary' size='lg' fullWidth loading={state.isLoading} className='mt-2'>
          {LOGIN_CTA}
        </Button>
      </form>

      {/* Register link */}
      <p className='mt-6 text-center text-sm text-on-surface-variant'>
        {LOGIN_NO_ACCOUNT}{" "}
        <button onClick={handlers.handleRegisterClick} className='text-primary font-medium hover:underline'>
          {LOGIN_REGISTER}
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
