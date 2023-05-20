import { Dayjs } from "dayjs";

export interface CalendarProps {
  mainColor?: string;
  subMainColor?: string;
  startDay?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  numMonths?: 1 | 2 | 3 | 4;
  language?: "ko" | "en";
  /**
   * The maximum number of months that the calendar can display.
   * Can be 12, 24, 36, etc.
   */
  maximumMonths?: number;
  /**
   *   defaultCheckIn?: "YYYY-MM-DD"
   */
  defaultCheckIn?: string | Dayjs;
  /**
   *   defaultCheckOut?: "YYYY-MM-DD"
   */
  defaultCheckOut?: string | Dayjs;
  showBookingDatesView?: boolean;
  onCheckInOutChange?: (checkInDate?: Date, checkOutDate?: Date) => void;
}
