import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@cyopo/Hooks/useRedux";
import { setUser, setAuthenticated } from "@cyopo/Redux/actions/AppCommon.actions";
import { selectIsAuthenticated } from "@cyopo/Redux/selectors/AppCommon.selector";
import { AuthAPIService } from "@cyopo/Services/api/auth/AuthAPIService";
import Notify from "@cyopo/Services/notification/Notify";
import Spinner from "@cyopo/Services/spinner/Spinner";
import { ROUTES } from "@cyopo/Constants/route/Route.constants";
import type { RegisterFormValues, RegisterFormErrors, PasswordStrength } from "./Register.model.d";

const getPasswordStrength = (password: string): PasswordStrength => {
  if (password.length < 6) return "weak";
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (score <= 1) return "weak";
  if (score === 2) return "fair";
  if (score === 3) return "strong";
  return "very-strong";
};

const useRegister = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const [values, setValues] = useState<RegisterFormValues>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const passwordStrength = values.password ? getPasswordStrength(values.password) : null;

  const validate = (): boolean => {
    const newErrors: RegisterFormErrors = {};
    if (!values.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (values.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    if (!values.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!values.password) {
      newErrors.password = "Password is required";
    } else if (values.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!values.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (values.password !== values.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof RegisterFormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleTogglePassword = () => setShowPassword((prev) => !prev);
  const handleToggleConfirm = () => setShowConfirm((prev) => !prev);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsLoading(true);

      // 1. Call service — HTTP + token storage
      const user = await Spinner.on(
        AuthAPIService.register({
          name: values.name.trim(),
          email: values.email,
          password: values.password,
        }),
      );

      // 2. Hook dispatches to Redux
      dispatch(setUser(user));
      dispatch(setAuthenticated(true));

      // 3. Notify and navigate
      Notify.success(`Welcome to cyopo, ${user.name.split(" ")[0]}!`);
      navigate(ROUTES.DASHBOARD);
    } catch (error: any) {
      const message = error?.message ?? "Something went wrong. Please try again.";
      setErrors({ general: message });
      Notify.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginClick = () => navigate(ROUTES.LOGIN);

  return {
    state: {
      values,
      errors,
      showPassword,
      showConfirm,
      isLoading,
      passwordStrength,
      isAuthenticated,
    },
    handlers: {
      handleChange,
      handleTogglePassword,
      handleToggleConfirm,
      handleSubmit,
      handleLoginClick,
    },
  };
};

export default useRegister;
