import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import ToggleGroup from "@/components/user/ToggleGroup";
import SkeletonLoader from "@/components/utils/SkeletonLoader";
import { useDashboardQuery } from "@/features/account/accountApi";
import type { UserDashboardQueryParams } from "@/lib/types";
import { USERDASHBOARD_TIMEPERIODS } from "@/lib/constants";

const chartConfig = {
  sessions: {
    label: "sessions",
    color: getComputedStyle(document.documentElement)
      .getPropertyValue("--color-primary")
      .trim(),
  },
} satisfies ChartConfig;

const DashboardPage = () => {
  const [timePeriod, setTimePeriod] =
    React.useState<UserDashboardQueryParams["timePeriod"]>("last_week");

  const { data, isLoading } = useDashboardQuery({ timePeriod });

  const chartData = React.useMemo(() => {
    const sessions = data?.sessionsClosedInRange;
    if (data === undefined || sessions === undefined) return;

    const chartDataMap: {
      [key: string]: number;
      // label: string;
      // sessions: number;
    } = {};

    const startDate = new Date(data.rangeStart);
    const endDate = new Date(data.rangeEnd);

    // for (const session of sessions) {
    for (
      const date = startDate;
      date < endDate;
      date.setDate(date.getDate() + 1)
    ) {
      // timePeriod appropriate label ("Jan" / "Mon" / "01")
      let label: string | null = null;
      switch (timePeriod) {
        case "last_week":
          label = new Date(date).toLocaleString("default", {
            weekday: "short",
          });
          break;
        case "last_month":
          label = new Date(date).getDate().toString();
          break;
        case "last_3_months":
          // label = new Date(session.date).getDate();
          label = new Date(date).toLocaleString("default", {
            month: "short",
          });
          break;
      }

      const sessionCountForDate = sessions[date.toISOString().split("T")[0]];

      // console.log("chartDataMap[label]", chartDataMap[label]);

      if (chartDataMap[label] === 2) {
        console.log("label", label);
        console.log(sessionCountForDate);
      }

      if (chartDataMap[label] === undefined) chartDataMap[label] = 0;

      if (sessionCountForDate !== undefined)
        chartDataMap[label] += sessionCountForDate;

      // if (sessionCountForDate === undefined) {
      //   chartDataMap[label] = 0;
      // } else {
      //   if (chartDataMap[label]) {
      //     chartDataMap[label] += sessionCountForDate;
      //   } else {
      //     chartDataMap[label] = sessionCountForDate;
      //   }
      // }

      // if (chartDataMap[label]) {
      //   chartDataMap[label] += session.count;
      // } else {
      //   chartDataMap[label] = session.count;
      // }
    }
    return Object.entries(chartDataMap).map(([k, v]) => ({
      label: k,
      sessions: v,
    }));
  }, [data, timePeriod]);

  // console.log(chartData);
  // console.log(data);
  return (
    <div className="container mx-auto flex flex-col gap-6 lg:w-2/3">
      <h1 className="text-xl font-semibold md:text-2xl lg:text-3xl">
        User Dashboard
      </h1>
      <div className="flex flex-col gap-3">
        {/* Section cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-3">
          <Card>
            {isLoading ? (
              <SkeletonLoader className="size-full h-32" />
            ) : (
              <>
                <CardHeader>
                  <CardDescription>Sessions completed</CardDescription>
                  <CardTitle className="text-2xl">
                    {data?.totalSessionsCompleted.toLocaleString("en-IN")}
                  </CardTitle>
                </CardHeader>
                <CardFooter className="text-sm font-medium">
                  Number of session completed by you
                </CardFooter>
              </>
            )}
          </Card>
          <Card>
            {isLoading ? (
              <SkeletonLoader className="size-full h-32" />
            ) : (
              <>
                <CardHeader>
                  <CardDescription>Total Requests made</CardDescription>
                  <CardTitle className="text-2xl">
                    {data?.totalRequestsCreated.toLocaleString("en-IN")}
                  </CardTitle>
                </CardHeader>
                <CardFooter className="text-sm font-medium">
                  Total number of requests made by you
                </CardFooter>
              </>
            )}
          </Card>

          <Card>
            {isLoading ? (
              <SkeletonLoader className="size-full h-32" />
            ) : (
              <>
                <CardHeader>
                  <CardDescription>Total Requests completed</CardDescription>
                  <CardTitle className="text-2xl">
                    {data?.totalRequestsCompleted.toLocaleString("en-IN")}
                  </CardTitle>
                </CardHeader>
                <CardFooter className="text-sm font-medium">
                  Total number of requests completed by you
                </CardFooter>
              </>
            )}
          </Card>

          <Card>
            {isLoading ? (
              <SkeletonLoader className="size-full h-32" />
            ) : (
              <>
                <CardHeader>
                  <CardDescription>Total Sessions cancelled</CardDescription>
                  <CardTitle className="text-2xl">
                    {data?.totalSessionsCancelled.toLocaleString("en-IN")}
                  </CardTitle>
                </CardHeader>
                <CardFooter className="text-sm font-medium">
                  Total number of sessions cancelled
                </CardFooter>
              </>
            )}
          </Card>

          <Card>
            {isLoading ? (
              <SkeletonLoader className="size-full h-32" />
            ) : (
              <>
                <CardHeader>
                  <CardDescription>Total Chat messages</CardDescription>
                  <CardTitle className="text-2xl">
                    {data?.totalChatMessagesCreated.toLocaleString("en-IN")}
                  </CardTitle>
                </CardHeader>
                <CardFooter className="text-sm font-medium">
                  Total chat messages created by you
                </CardFooter>
              </>
            )}
          </Card>
        </div>
        <Card>
          {isLoading ? (
            <SkeletonLoader className="size-full h-96" />
          ) : (
            <>
              <CardHeader className="flex items-center justify-between">
                <div>
                  <CardTitle>Sessions completed</CardTitle>
                  <CardDescription>
                    Number of sessions completed during given period
                  </CardDescription>
                </div>
                <div className="">
                  <ToggleGroup
                    className="[&>*]:cursor-pointer"
                    options={Object.values(USERDASHBOARD_TIMEPERIODS)}
                    selected={[USERDASHBOARD_TIMEPERIODS[timePeriod]]}
                    onChange={(selection) => {
                      const k = Object.entries(USERDASHBOARD_TIMEPERIODS).find(
                        ([_, v]) => v === selection[0],
                      )?.[0];

                      if (k === undefined) setTimePeriod("last_week");
                      else
                        setTimePeriod(
                          k as UserDashboardQueryParams["timePeriod"],
                        );
                    }}
                  />
                </div>
              </CardHeader>
              <CardContent>
                {/* Bar graph showing session completed */}
                <ChartContainer config={chartConfig}>
                  <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="label"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel={false} />}
                    />
                    <Bar
                      dataKey="sessions"
                      fill="var(--color-primary)"
                      radius={8}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
