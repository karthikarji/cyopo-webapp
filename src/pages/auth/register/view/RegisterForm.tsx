import React from "react";
import { Eye, EyeOff } from "lucide-react";
import Button from "@cyopo/Components/button/Button";
import useRegister from "../useRegister";
import {
  REGISTER_TITLE,
  REGISTER_SUBTITLE,
  REGISTER_CTA,
  REGISTER_HAS_ACCOUNT,
  REGISTER_LOGIN,
  REGISTER_NAME_LABEL,
  REGISTER_EMAIL_LABEL,
  REGISTER_PASS_LABEL,
  REGISTER_CONFIRM_LABEL,
  REGISTER_TERMS,
  PASSWORD_STRENGTH_LABELS,
  PASSWORD_STRENGTH_COLORS,
  PASSWORD_STRENGTH_WIDTH,
} from "../Register.constants";

const inputClasses = (hasError: boolean) =>
  [
    "w-full px-4 py-3 rounded-xl text-sm",
    "bg-surface-container-lowest border",
    "text-on-surface placeholder:text-on-surface-variant/50",
    "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary",
    "transition-all duration-200",
    hasError ? "border-error focus:ring-error/30 focus:border-error" : "border-outline-variant",
  ].join(" ");

const RegisterForm: React.FC = () => {
  const { state, handlers } = useRegister();

  return (
    <div className='flex flex-col justify-center h-full px-6 sm:px-10 lg:px-16 py-12 overflow-y-auto'>
      {/* Mobile logo */}
      <div className='flex items-center gap-2 font-headline font-bold text-xl text-primary mb-8 lg:hidden'>
        <span className='material-symbols-outlined text-2xl' style={{ fontVariationSettings: "'FILL' 1" }}>
          auto_awesome
        </span>
        cyopo
      </div>

      {/* Header */}
      <div className='mb-7'>
        <h1 className='font-headline font-bold text-on-surface text-3xl sm:text-4xl mb-2'>{REGISTER_TITLE}</h1>
        <p className='text-on-surface-variant text-sm sm:text-base'>{REGISTER_SUBTITLE}</p>
      </div>

      {/* General error */}
      {state.errors.general && (
        <div className='mb-5 px-4 py-3 bg-error-container text-on-error-container rounded-xl text-sm border border-error/20'>
          {state.errors.general}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handlers.handleSubmit} className='flex flex-col gap-4'>
        {/* Full name */}
        <div className='flex flex-col gap-1.5'>
          <label className='text-sm font-medium text-on-surface'>{REGISTER_NAME_LABEL}</label>
          <input
            type='text'
            value={state.values.name}
            onChange={handlers.handleChange("name")}
            placeholder='Alice Johnson'
            autoComplete='name'
            className={inputClasses(!!state.errors.name)}
          />
          {state.errors.name && <p className='text-xs text-error'>{state.errors.name}</p>}
        </div>

        {/* Email */}
        <div className='flex flex-col gap-1.5'>
          <label className='text-sm font-medium text-on-surface'>{REGISTER_EMAIL_LABEL}</label>
          <input
            type='email'
            value={state.values.email}
            onChange={handlers.handleChange("email")}
            placeholder='you@example.com'
            autoComplete='email'
            className={inputClasses(!!state.errors.email)}
          />
          {state.errors.email && <p className='text-xs text-error'>{state.errors.email}</p>}
        </div>

        {/* Password */}
        <div className='flex flex-col gap-1.5'>
          <label className='text-sm font-medium text-on-surface'>{REGISTER_PASS_LABEL}</label>
          <div className='relative'>
            <input
              type={state.showPassword ? "text" : "password"}
              value={state.values.password}
              onChange={handlers.handleChange("password")}
              placeholder='••••••••'
              autoComplete='new-password'
              className={inputClasses(!!state.errors.password)}
            />
            <button
              type='button'
              onClick={handlers.handleTogglePassword}
              className='absolute right-3 top-1/2 -translate-y-1/2 p-1 text-on-surface-variant hover:text-on-surface transition-colors'>
              {state.showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Password strength indicator */}
          {state.passwordStrength && (
            <div className='flex flex-col gap-1 mt-1'>
              <div className='h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden'>
                <div
                  className={[
                    "h-full rounded-full transition-all duration-300",
                    PASSWORD_STRENGTH_COLORS[state.passwordStrength],
                    PASSWORD_STRENGTH_WIDTH[state.passwordStrength],
                  ].join(" ")}
                />
              </div>
              <p className='text-xs text-on-surface-variant'>
                Strength: <span className='font-medium text-on-surface'>{PASSWORD_STRENGTH_LABELS[state.passwordStrength]}</span>
              </p>
            </div>
          )}

          {state.errors.password && <p className='text-xs text-error'>{state.errors.password}</p>}
        </div>

        {/* Confirm password */}
        <div className='flex flex-col gap-1.5'>
          <label className='text-sm font-medium text-on-surface'>{REGISTER_CONFIRM_LABEL}</label>
          <div className='relative'>
            <input
              type={state.showConfirm ? "text" : "password"}
              value={state.values.confirmPassword}
              onChange={handlers.handleChange("confirmPassword")}
              placeholder='••••••••'
              autoComplete='new-password'
              className={inputClasses(!!state.errors.confirmPassword)}
            />
            <button
              type='button'
              onClick={handlers.handleToggleConfirm}
              className='absolute right-3 top-1/2 -translate-y-1/2 p-1 text-on-surface-variant hover:text-on-surface transition-colors'>
              {state.showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {state.errors.confirmPassword && <p className='text-xs text-error'>{state.errors.confirmPassword}</p>}
        </div>

        {/* Submit */}
        <Button type='submit' variant='primary' size='lg' fullWidth loading={state.isLoading} className='mt-2'>
          {REGISTER_CTA}
        </Button>
      </form>

      {/* Terms */}
      <p className='mt-4 text-center text-xs text-on-surface-variant leading-relaxed'>{REGISTER_TERMS}</p>

      {/* Login link */}
      <p className='mt-4 text-center text-sm text-on-surface-variant'>
        {REGISTER_HAS_ACCOUNT}{" "}
        <button onClick={handlers.handleLoginClick} className='text-primary font-medium hover:underline'>
          {REGISTER_LOGIN}
        </button>
      </p>
    </div>
  );
};

export default RegisterForm;
