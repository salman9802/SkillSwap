import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useRefreshQuery } from "@/features/session/sessionApi";
import { setCrenentials } from "@/features/session/sessionSlice";
import Loader from "@/components/utils/Loader";
import { useStoreDispatch } from "@/lib/hooks";
import { useToast } from "@/components/utils/toast";

const AuthLayout = () => {
  const { data, isError, isLoading, isFetching } = useRefreshQuery();
  //   undefined, {
  //   // This ensures no re-fetching unless needed
  //   refetchOnMountOrArgChange: false,
  // });
  const { pushToastMessage } = useToast();

  const dispatch = useStoreDispatch();
  React.useEffect(() => {
    if (data) {
      dispatch(setCrenentials(data));
      if (data.hasDailyLoginReward)
        setTimeout(
          () =>
            pushToastMessage({
              type: "info",
              message: "Received 1 coin as daily login reward",
            }),
          1000,
        );
    }
  }, [data]);

  if (!data && isFetching)
    return (
      <div className="grid h-screen grid-cols-1 grid-rows-1 place-items-center">
        <Loader className="size-24" />;
      </div>
    );

  if (!data && isError) return <Navigate to="/" replace={true} />;

  return <Outlet />;
};

export default AuthLayout;
