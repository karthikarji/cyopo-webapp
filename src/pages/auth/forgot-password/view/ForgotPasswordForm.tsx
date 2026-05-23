import React from "react";
import { Link } from "react-router-dom";
import useForgotPassword from "../useForgotPassword";
import { ROUTES } from "@cyopo/Constants/route/Route.constants";
import { FORGOT_PASSWORD_TITLE, FORGOT_PASSWORD_SUBTITLE, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_SUCCESS_SUB } from "../ForgotPassword.constants";

const inputCls = [
  "w-full px-4 py-3 rounded-xl text-sm",
  "bg-surface-container border border-outline-variant/30",
  "text-on-surface placeholder:text-on-surface-variant/50",
  "focus:outline-none focus:ring-2 focus:ring-primary/20",
  "focus:border-primary/40 transition-all duration-200",
].join(" ");

const ForgotPasswordForm: React.FC = () => {
  const { state, handlers } = useForgotPassword();

  return (
    <div className='flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12 max-w-md w-full mx-auto'>
      {/* Logo — mobile only */}
      <div className='flex items-center gap-2 font-headline font-bold text-xl text-on-surface mb-10 lg:hidden'>
        <span className='material-symbols-outlined text-2xl text-primary' style={{ fontVariationSettings: "'FILL' 1" }}>
          auto_awesome
        </span>
        cyopo
      </div>

      {state.sent ? (
        /* ─── Success state ─── */
        <div className='flex flex-col items-center text-center gap-4'>
          <div className='w-16 h-16 rounded-2xl bg-secondary-container flex items-center justify-center'>
            <span className='material-symbols-outlined text-3xl text-primary'>mark_email_read</span>
          </div>
          <div>
            <h1 className='font-headline font-bold text-on-surface text-2xl mb-2'>{FORGOT_PASSWORD_SUCCESS}</h1>
            <p className='text-sm text-on-surface-variant leading-relaxed'>{FORGOT_PASSWORD_SUCCESS_SUB(state.values.email)}</p>
          </div>
          <button onClick={handlers.handleBackToLogin} className='mt-4 text-sm text-primary hover:underline font-medium'>
            Back to login
          </button>
        </div>
      ) : (
        /* ─── Form state ─── */
        <>
          <div className='mb-8'>
            <h1 className='font-headline font-bold text-on-surface text-2xl sm:text-3xl mb-2'>{FORGOT_PASSWORD_TITLE}</h1>
            <p className='text-sm text-on-surface-variant'>{FORGOT_PASSWORD_SUBTITLE}</p>
          </div>

          <form onSubmit={handlers.handleSubmit} className='flex flex-col gap-5'>
            {/* Email */}
            <div className='flex flex-col gap-1.5'>
              <label className='text-xs font-semibold text-on-surface-variant uppercase tracking-wide'>Email address</label>
              <input
                type='email'
                value={state.values.email}
                onChange={handlers.handleChange}
                placeholder='you@example.com'
                autoComplete='email'
                className={[inputCls, state.errors.email ? "border-error/60 focus:ring-error/20 focus:border-error/60" : ""].join(" ")}
              />
              {state.errors.email && <p className='text-xs text-error'>{state.errors.email}</p>}
            </div>

            {/* Submit */}
            <button
              type='submit'
              disabled={state.isLoading}
              className='w-full py-3 bg-primary text-on-primary rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50'>
              {state.isLoading ? "Sending..." : "Send reset link"}
            </button>

            {/* Back to login */}
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

export default ForgotPasswordForm;
