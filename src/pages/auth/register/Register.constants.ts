import type { PasswordStrength } from "./Register.model.d";

export const REGISTER_TITLE = "Create your account";
export const REGISTER_SUBTITLE = "Start building your portfolio for free. No credit card required.";
export const REGISTER_CTA = "Create account";
export const REGISTER_HAS_ACCOUNT = "Already have an account?";
export const REGISTER_LOGIN = "Sign in";
export const REGISTER_NAME_LABEL = "Full name";
export const REGISTER_EMAIL_LABEL = "Email address";
export const REGISTER_PASS_LABEL = "Password";
export const REGISTER_CONFIRM_LABEL = "Confirm password";
export const REGISTER_TERMS = "By creating an account you agree to our Terms of Service and Privacy Policy.";

export const PASSWORD_STRENGTH_LABELS: Record<PasswordStrength, string> = {
  weak: "Weak",
  fair: "Fair",
  strong: "Strong",
  "very-strong": "Very strong",
};

export const PASSWORD_STRENGTH_COLORS: Record<PasswordStrength, string> = {
  weak: "bg-error",
  fair: "bg-warning",
  strong: "bg-success",
  "very-strong": "bg-success",
};

export const PASSWORD_STRENGTH_WIDTH: Record<PasswordStrength, string> = {
  weak: "w-1/4",
  fair: "w-2/4",
  strong: "w-3/4",
  "very-strong": "w-full",
};
