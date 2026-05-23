import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AuthAPIService } from "@cyopo/Services/api/auth/AuthAPIService";
import Notify from "@cyopo/Services/notification/Notify";
import { ROUTES } from "@cyopo/Constants/route/Route.constants";
import type { ForgotPasswordFormValues, ForgotPasswordFormErrors } from "./ForgotPassword.model.d";

const useForgotPassword = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState<ForgotPasswordFormValues>({ email: "" });
  const [errors, setErrors] = useState<ForgotPasswordFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const validate = (): boolean => {
    const newErrors: ForgotPasswordFormErrors = {};
    if (!values.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = "Enter a valid email address";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ email: e.target.value });
      if (errors.email) setErrors({});
    },
    [errors.email],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validate()) return;
      try {
        setIsLoading(true);
        await AuthAPIService.forgotPassword(values.email);
        setSent(true);
      } catch (err: any) {
        Notify.error(err?.message ?? "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    },
    [values],
  );

  const handleBackToLogin = useCallback(() => {
    navigate(ROUTES.LOGIN);
  }, [navigate]);

  return {
    state: {
      values,
      errors,
      isLoading,
      sent,
    },
    handlers: {
      handleChange,
      handleSubmit,
      handleBackToLogin,
    },
  };
};

export default useForgotPassword;
