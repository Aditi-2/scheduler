import { format as dateFormat } from "date-fns";

interface TimeRangeProps {
  start: Date;
  end: Date;
  format?: string;
  className?: string;
}

export const TimeRange: React.FC<TimeRangeProps> = ({
  start,
  end,
  className,
  format = "HH:mm",
}) => (
  <div className={className}>
    <span>
      {dateFormat(start, format)}-{dateFormat(end, format)}
    </span>
  </div>
);
