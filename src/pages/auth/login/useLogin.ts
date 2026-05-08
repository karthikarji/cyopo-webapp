import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@cyopo/Hooks/useRedux";
import { setUser, setAuthenticated } from "@cyopo/Redux/actions/AppCommon.actions";
import { selectIsAuthenticated } from "@cyopo/Redux/selectors/AppCommon.selector";
import { AuthAPIService } from "@cyopo/Services/api/auth/AuthAPIService";
import Notify from "@cyopo/Services/notification/Notify";
import Spinner from "@cyopo/Services/spinner/Spinner";
import { ROUTES } from "@cyopo/Constants/route/Route.constants";
import type { LoginFormValues, LoginFormErrors } from "./Login.model.d";

const useLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const [values, setValues] = useState<LoginFormValues>({ email: "", password: "" });
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: LoginFormErrors = {};
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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof LoginFormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsLoading(true);

      // 1. Call service — HTTP + token storage
      const user = await Spinner.on(
        AuthAPIService.login({
          email: values.email,
          password: values.password,
        }),
      );

      // 2. Hook dispatches to Redux
      dispatch(setUser(user));
      dispatch(setAuthenticated(true));

      // 3. Notify and navigate
      Notify.success(`Welcome back, ${user.name.split(" ")[0]}!`);
      navigate(ROUTES.DASHBOARD);
    } catch (error: any) {
      const message = error?.message ?? "Invalid email or password";
      setErrors({ general: message });
      Notify.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterClick = () => navigate(ROUTES.REGISTER);
  const handleForgotPassword = () => Notify.info("Password reset coming soon");

  return {
    state: {
      values,
      errors,
      showPassword,
      isLoading,
      isAuthenticated,
    },
    handlers: {
      handleChange,
      handleTogglePassword,
      handleSubmit,
      handleRegisterClick,
      handleForgotPassword,
    },
  };
};

export default useLogin;
