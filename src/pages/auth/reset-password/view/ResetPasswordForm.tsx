import React from "react";
import { Link } from "react-router-dom";
import useResetPassword from "../useResetPassword";
import { ROUTES } from "@cyopo/Constants/route/Route.constants";
import { RESET_PASSWORD_TITLE, RESET_PASSWORD_SUBTITLE, RESET_PASSWORD_INVALID, RESET_PASSWORD_INVALID_SUB } from "../ResetPassword.constants";

const inputWrapCls = [
  "flex items-center border border-outline-variant/30 rounded-xl",
  "bg-surface-container overflow-hidden transition-all duration-200",
  "focus-within:ring-2 focus-within:ring-primary/20",
  "focus-within:border-primary/40",
].join(" ");

const inputCls = ["flex-1 px-4 py-3 text-sm bg-transparent", "text-on-surface placeholder:text-on-surface-variant/50", "focus:outline-none"].join(
  " ",
);

const ResetPasswordForm: React.FC = () => {
  const { state, handlers } = useResetPassword();

  return (
    <div className='flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12 max-w-md w-full mx-auto'>
      {/* Logo — mobile only */}
      <div className='flex items-center gap-2 font-headline font-bold text-xl text-on-surface mb-10 lg:hidden'>
        <span className='material-symbols-outlined text-2xl text-primary' style={{ fontVariationSettings: "'FILL' 1" }}>
          auto_awesome
        </span>
        cyopo
      </div>

      {/* Invalid token state */}
      {!state.token ? (
        <div className='flex flex-col items-center text-center gap-4'>
          <div className='w-16 h-16 rounded-2xl bg-error-container flex items-center justify-center'>
            <span className='material-symbols-outlined text-3xl text-error'>link_off</span>
          </div>
          <div>
            <h1 className='font-headline font-bold text-on-surface text-2xl mb-2'>{RESET_PASSWORD_INVALID}</h1>
            <p className='text-sm text-on-surface-variant'>{RESET_PASSWORD_INVALID_SUB}</p>
          </div>
          <button onClick={handlers.handleRequestNew} className='mt-2 text-sm text-primary hover:underline font-medium'>
            Request a new link
          </button>
        </div>
      ) : (
        <>
          <div className='mb-8'>
            <h1 className='font-headline font-bold text-on-surface text-2xl sm:text-3xl mb-2'>{RESET_PASSWORD_TITLE}</h1>
            <p className='text-sm text-on-surface-variant'>{RESET_PASSWORD_SUBTITLE}</p>
          </div>

          <form onSubmit={handlers.handleSubmit} className='flex flex-col gap-5'>
            {/* General error */}
            {state.errors.general && (
              <div className='flex items-center gap-2 px-4 py-3 bg-error-container/40 border border-error/20 rounded-xl'>
                <span className='material-symbols-outlined text-error text-[16px]'>error</span>
                <p className='text-xs text-error'>{state.errors.general}</p>
              </div>
            )}

            {/* New password */}
            <div className='flex flex-col gap-1.5'>
              <label className='text-xs font-semibold text-on-surface-variant uppercase tracking-wide'>New password</label>
              <div className={[inputWrapCls, state.errors.newPassword ? "border-error/60 focus-within:ring-error/20" : ""].join(" ")}>
                <input
                  type={state.showNew ? "text" : "password"}
                  value={state.values.newPassword}
                  onChange={handlers.handleChange("newPassword")}
                  placeholder='At least 8 characters'
                  className={inputCls}
                />
                <button
                  type='button'
                  onClick={handlers.toggleShowNew}
                  className='pr-3 text-on-surface-variant hover:text-on-surface transition-colors'>
                  <span className='material-symbols-outlined text-[18px]'>{state.showNew ? "visibility_off" : "visibility"}</span>
                </button>
              </div>
              {state.errors.newPassword && <p className='text-xs text-error'>{state.errors.newPassword}</p>}
            </div>

            {/* Confirm password */}
            <div className='flex flex-col gap-1.5'>
              <label className='text-xs font-semibold text-on-surface-variant uppercase tracking-wide'>Confirm password</label>
              <div className={[inputWrapCls, state.errors.confirmPassword ? "border-error/60 focus-within:ring-error/20" : ""].join(" ")}>
                <input
                  type={state.showConfirm ? "text" : "password"}
                  value={state.values.confirmPassword}
                  onChange={handlers.handleChange("confirmPassword")}
                  placeholder='Repeat new password'
                  className={inputCls}
                />
                <button
                  type='button'
                  onClick={handlers.toggleShowConfirm}
                  className='pr-3 text-on-surface-variant hover:text-on-surface transition-colors'>
                  <span className='material-symbols-outlined text-[18px]'>{state.showConfirm ? "visibility_off" : "visibility"}</span>
                </button>
              </div>
              {state.errors.confirmPassword && <p className='text-xs text-error'>{state.errors.confirmPassword}</p>}
            </div>

            {/* Submit */}
            <button
              type='submit'
              disabled={state.isLoading}
              className='w-full py-3 bg-primary text-on-primary rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50'>
              {state.isLoading ? "Resetting..." : "Reset password"}
            </button>

            <p className='text-center text-sm text-on-surface-variant'>
              Remember your password?{" "}
              <Link to={ROUTES.LOGIN} className='text-primary font-semibold hover:underline'>
                Log in
              </Link>
            </p>
          </form>
        </>
      )}
    </div>
  );
};

export default ResetPasswordForm;
