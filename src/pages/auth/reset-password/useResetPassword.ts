import { useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthAPIService } from "@cyopo/Services/api/auth/AuthAPIService";
import Notify from "@cyopo/Services/notification/Notify";
import { ROUTES } from "@cyopo/Constants/route/Route.constants";
import type { ResetPasswordFormValues, ResetPasswordFormErrors } from "./ResetPassword.model.d";

const useResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [values, setValues] = useState<ResetPasswordFormValues>({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<ResetPasswordFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const validate = (): boolean => {
    const newErrors: ResetPasswordFormErrors = {};
    if (!values.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (values.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }
    if (!values.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (values.newPassword !== values.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = useCallback(
    (field: keyof ResetPasswordFormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    [errors],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validate()) return;
      try {
        setIsLoading(true);
        await AuthAPIService.resetPassword({
          token,
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
        });
        Notify.success("Password reset successfully — please log in");
        navigate(ROUTES.LOGIN);
      } catch (err: any) {
        setErrors({ general: err?.message ?? "Failed to reset password" });
      } finally {
        setIsLoading(false);
      }
    },
    [values, token, navigate],
  );

  const handleRequestNew = useCallback(() => {
    navigate(ROUTES.FORGOT_PASSWORD);
  }, [navigate]);

  return {
    state: {
      values,
      errors,
      isLoading,
      showNew,
      showConfirm,
      token,
    },
    handlers: {
      handleChange,
      handleSubmit,
      handleRequestNew,
      toggleShowNew: () => setShowNew((v) => !v),
      toggleShowConfirm: () => setShowConfirm((v) => !v),
    },
  };
};

export default useResetPassword;
