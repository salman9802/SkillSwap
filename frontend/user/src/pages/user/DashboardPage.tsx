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
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartConfig = {
  sessions: {
    label: "sessions",
    color: getComputedStyle(document.documentElement)
      .getPropertyValue("--color-primary")
      .trim(),
  },
} satisfies ChartConfig;

const chartData = [
  { month: "January", sessions: 186 },
  { month: "February", sessions: 305 },
  { month: "March", sessions: 237 },
  { month: "April", sessions: 73 },
  { month: "May", sessions: 209 },
  { month: "June", sessions: 214 },
];

const DashboardPage = () => {
  return (
    <div className="container mx-auto flex flex-col gap-6 lg:w-2/3">
      <h1 className="text-xl font-semibold md:text-2xl lg:text-3xl">
        User Dashboard
      </h1>
      <div className="flex flex-col gap-3">
        {/* Section cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-3">
          <Card>
            <CardHeader>
              <CardDescription>Sessions completed</CardDescription>
              <CardTitle className="text-2xl">
                {Number(25).toLocaleString("en-IN")}
              </CardTitle>
            </CardHeader>
            <CardFooter className="text-sm font-medium">
              Number of session completed by you
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Total Requests made</CardDescription>
              <CardTitle className="text-2xl">
                {Number(1225).toLocaleString("en-IN")}
              </CardTitle>
            </CardHeader>
            <CardFooter className="text-sm font-medium">
              Total number of requests made by you
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Total Chat messages</CardDescription>
              <CardTitle className="text-2xl">
                {Number(143225).toLocaleString("en-IN")}
              </CardTitle>
            </CardHeader>
            <CardFooter className="text-sm font-medium">
              Total chat messages created by you
            </CardFooter>
          </Card>
        </div>
        <Card>
          {/* Toggle group buttons for 'Last 7 days', 'Last month' & 'Last 3 months' */}
          <CardHeader className="flex items-center justify-between">
            <div>
              <CardTitle>Sessions completed</CardTitle>
              <CardDescription>
                Number of sessions for the last 30 days
              </CardDescription>
            </div>
            <div className="">
              <ToggleGroup
                options={["Last 6 days", "Last month", "Last 3 months"]}
                selected={["Last 6 days"]}
                onChange={() => {}}
              />
            </div>
          </CardHeader>
          <CardContent>
            {/* Bar graph showing session completed */}
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
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
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
