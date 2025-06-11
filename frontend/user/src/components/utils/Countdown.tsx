import React from "react";

import TIME from "@/lib/time";

const TimeBlock: React.FC<{ label: string; value: number }> = ({
  label,
  value,
}) => (
  <div className="flex flex-col items-center">
    <div className="text-primary text-3xl font-bold">{value}</div>
    <div className="text-xs tracking-wide uppercase">{label}</div>
  </div>
);

type CountdownProps = {
  date: Date;
  onComplete?: () => any;
};

const Countdown = ({ date, onComplete }: CountdownProps) => {
  const calculateTimeLeft = () => {
    const diff = date.getTime() - Date.now();

    if (diff <= 0) {
      // time as passed
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isComplete: true,
      };
    }
    // time has not passed
    return {
      days: Math.floor(diff / TIME.DAY),
      hours: Math.floor((diff / TIME.HOUR) % 24),
      minutes: Math.floor((diff / TIME.MINUTE) % 60),
      seconds: Math.floor((diff / TIME.SECOND) % 60),
      isComplete: false,
    };
  };

  const [timeLeft, setTimeLeft] = React.useState(() => calculateTimeLeft());

  React.useEffect(() => {
    // schedules next tick
    const timer = setTimeout(() => {
      const updatedTime = calculateTimeLeft();
      setTimeLeft(updatedTime);

      if (updatedTime.isComplete) {
        clearTimeout(timer);
        if (onComplete) onComplete();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [date, onComplete, timeLeft]);

  return (
    <div className="flex justify-center gap-4 text-lg font-medium text-gray-700">
      <TimeBlock label="Days" value={timeLeft.days} />
      <TimeBlock label="Hours" value={timeLeft.hours} />
      <TimeBlock label="Minutes" value={timeLeft.minutes} />
      <TimeBlock label="Seconds" value={timeLeft.seconds} />
    </div>
  );
};

export default Countdown;
