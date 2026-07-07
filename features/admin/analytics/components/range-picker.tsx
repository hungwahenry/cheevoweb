"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RANGE_DAYS,
  RANGE_INTERVALS,
  useAnalyticsRange,
} from "../hooks/use-analytics-range";

const DAY_LABEL: Record<number, string> = {
  7: "Last 7 days",
  30: "Last 30 days",
  90: "Last 90 days",
  365: "Last year",
};

export function RangePicker() {
  const [{ days, interval }, setRange] = useAnalyticsRange();

  return (
    <div className="flex items-center gap-2">
      <Select
        value={String(days)}
        onValueChange={(value) => void setRange({ days: Number(value) })}
      >
        <SelectTrigger className="w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {RANGE_DAYS.map((value) => (
            <SelectItem key={value} value={String(value)}>
              {DAY_LABEL[value]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={interval}
        onValueChange={(value) =>
          void setRange({ interval: value as (typeof RANGE_INTERVALS)[number] })
        }
      >
        <SelectTrigger className="w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {RANGE_INTERVALS.map((value) => (
            <SelectItem key={value} value={value} className="capitalize">
              {value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
