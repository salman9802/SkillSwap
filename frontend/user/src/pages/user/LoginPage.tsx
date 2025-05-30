import React from "react";
import { useSelector } from "react-redux";

import { LoginForm } from "@/components/user/LoginForm";
import type { StoreState } from "@/features/store";
import { Navigate, useNavigate } from "react-router-dom";
import { useLoginMutation } from "@/features/session/sessionApi";
import { useStoreDispatch } from "@/lib/hooks";
import { isFetchBaseQueryError } from "@/lib/utils";
import { setCrenentials } from "@/features/session/sessionSlice";
import type { LoginFormFields } from "@/lib/schemas";

const LoginPage = () => {
  const [rootError, setRootError] = React.useState("");
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: StoreState) => state.session);

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useStoreDispatch();

  const onFormSubmit = async (formFields: LoginFormFields) => {
    // reset error
    setRootError("");

    try {
      const res = await login(formFields).unwrap();
      dispatch(
        setCrenentials({
          user: res.user,
          accessToken: res.accessToken,
        }),
      );
      navigate("/user");
    } catch (error: any) {
      if (isFetchBaseQueryError(error)) {
        const { message } = error.data as { message: string };
        setRootError(message);
      } else {
        setRootError("Something went wrong");
      }
    }
  };

  return isAuthenticated ? (
    <Navigate to="/" replace />
  ) : (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm
          onFormSubmit={onFormSubmit}
          rootError={rootError}
          isSubmitting={isLoading}
        />
      </div>
    </div>
  );
};

export default LoginPage;
