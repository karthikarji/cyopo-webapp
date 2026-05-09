import React from "react";
import type { ButtonProps } from "./Button.model.d";

const variantClasses: Record<string, string> = {
  primary: "bg-primary text-on-primary hover:opacity-90 shadow-sm hover:shadow-md active:scale-[0.98]",
  secondary: "bg-surface text-on-surface border border-outline-variant hover:bg-surface-container-low active:scale-[0.98]",
  ghost: "bg-transparent text-on-surface-variant hover:bg-surface-container hover:text-on-surface active:scale-[0.98]",
  danger: "bg-error text-on-error hover:opacity-90 shadow-sm active:scale-[0.98]",
  premium: "bg-tertiary-container text-on-tertiary-container hover:opacity-90 shadow-sm active:scale-[0.98]",
};

const sizeClasses: Record<string, string> = {
  sm: "px-3 py-1.5 text-xs gap-1.5",
  md: "px-5 py-2.5 text-sm gap-2",
  lg: "px-8 py-4 text-base gap-2.5",
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  className = "",
  ...rest
}) => {
  const isDisabled = disabled || loading;

  return (
    <button
      disabled={isDisabled}
      className={[
        "inline-flex items-center justify-center",
        "font-label font-medium",
        "rounded-lg",
        "transition-all duration-200",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? "w-full" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}>
      {loading ? (
        <>
          <span className='w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin' />
          <span>{children}</span>
        </>
      ) : (
        <>
          {leftIcon && <span className='flex-shrink-0'>{leftIcon}</span>}
          {children && <span>{children}</span>}
          {rightIcon && <span className='flex-shrink-0'>{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
