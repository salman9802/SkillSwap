/** Function to get time in relative format */
export function getRelativeTime(date: Date) {
  const now = new Date();
  const diffInSeconds = Math.floor((date.getTime() - now.getTime()) / 1000);

  const units: { name: Intl.RelativeTimeFormatUnit; seconds: number }[] = [
    { name: "year", seconds: 60 * 60 * 24 * 365 },
    { name: "month", seconds: 60 * 60 * 24 * 30 },
    { name: "week", seconds: 60 * 60 * 24 * 7 },
    { name: "day", seconds: 60 * 60 * 24 },
    { name: "hour", seconds: 60 * 60 },
    { name: "minute", seconds: 60 },
    { name: "second", seconds: 1 },
  ];

  for (const unit of units) {
    const delta = diffInSeconds / unit.seconds;
    if (Math.abs(delta) >= 1) {
      const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
      return rtf.format(Math.round(delta), unit.name);
    }
  }

  return "just now";
}

const TIME: { [key: string]: number } = {};

TIME.SECOND = 1000;
TIME.MINUTE = 60 * TIME.SECOND;
TIME.HOUR = 60 * TIME.MINUTE;
TIME.DAY = 24 * TIME.HOUR;

export default TIME;
