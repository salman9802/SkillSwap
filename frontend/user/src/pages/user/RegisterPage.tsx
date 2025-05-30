import React from "react";

import { RegisterForm } from "@/components/user/RegisterForm";
import type { RegisterFormFields } from "@/lib/schemas";
import { useRegisterMutation } from "@/features/account/accountApi";
import { isFetchBaseQueryError } from "@/lib/utils";
import { setCrenentials } from "@/features/session/sessionSlice";
import { useNavigate } from "react-router-dom";
import { useStoreDispatch } from "@/lib/hooks";

const RegisterPage = () => {
  const [rootError, setRootError] = React.useState("");
  const navigate = useNavigate();

  const [register, { isError, isLoading }] = useRegisterMutation();
  const dispatch = useStoreDispatch();

  const onFormSubmit = async (formFields: RegisterFormFields) => {
    // reset error
    setRootError("");
    // try {

    try {
      const res = await register(formFields).unwrap();
      // console.log(res);
      dispatch(
        setCrenentials({
          user: res.user,
          accessToken: res.accessToken,
        }),
      );
      navigate("/");
    } catch (error: any) {
      if (isFetchBaseQueryError(error)) {
        const { message } = error.data as { message: string };
        setRootError(message);
      } else {
        setRootError("Something went wrong");
      }
    }

    // if(isError)
    // setRootError(error?.message);
    // } catch (error: any) {
    // TODO: handle server errors

    // setRootError(error.message);
    // }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm
          onFormSubmit={onFormSubmit}
          rootError={rootError}
          isSubmitting={isLoading}
        />
      </div>
    </div>
  );
};

export default RegisterPage;
