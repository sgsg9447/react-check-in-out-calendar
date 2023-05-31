import dayjs from "dayjs";
import { ReactNode, createContext, useState } from "react";
import useGetSavedPeriod from "../hooks/useGetSavedPeriod";
import useUpdateCheckInOut from "../hooks/useUpdateCheckInOut";
import {
  BookingDatesType,
  CalendarProps,
  CheckInOutChangeType,
} from "../types";

const defaultProps: CalendarProps = {
  startDay: 0,
  numMonths: 2,
  language: "en",
  maximumMonths: 12,
  showBookingDatesView: true,
  isRectangular: false,
  defaultCheckIn: dayjs().add(7, "day"),
  defaultCheckOut: dayjs().add(8, "day"),
};

type CalendarContextType = {
  today: dayjs.Dayjs;
  currentMonth: dayjs.Dayjs;
  setCurrentMonth: (num: number) => void;
  bookingDates: BookingDatesType;
  setBookingDates: React.Dispatch<React.SetStateAction<BookingDatesType>>;
  calendarSettings: CalendarProps;
  setCalendarSettings: React.Dispatch<React.SetStateAction<CalendarProps>>;
  onCheckInOutChange?: CheckInOutChangeType;
};

const initialContextValue: CalendarContextType = {
  today: dayjs(),
  currentMonth: dayjs(),
  setCurrentMonth: () => {},
  bookingDates: {
    checkIn: undefined,
    checkOut: undefined,
  },
  setBookingDates: () => {},
  calendarSettings: defaultProps,
  setCalendarSettings: () => {},
  onCheckInOutChange: () => {},
};

type CalendarProviderProps = {
  children: ReactNode;
  calendarProps: CalendarProps;
  onCheckInOutChange?: (checkInDate?: Date, checkOutDate?: Date) => void;
};

const CalendarContext = createContext<CalendarContextType>(initialContextValue);

const CalendarProvider = ({
  children,
  calendarProps = defaultProps,
  onCheckInOutChange,
}: CalendarProviderProps) => {
  const [currentMonth, _setCurrentMonth] = useState<dayjs.Dayjs>(dayjs());
  const [bookingDates, setBookingDates] = useState<{
    checkIn?: dayjs.Dayjs;
    checkOut?: dayjs.Dayjs;
  }>({
    checkIn: calendarProps.defaultCheckIn
      ? dayjs(calendarProps.defaultCheckIn)
      : dayjs().add(7, "day"),
    checkOut: calendarProps.defaultCheckOut
      ? dayjs(calendarProps.defaultCheckOut)
      : calendarProps.defaultCheckIn
      ? dayjs(calendarProps.defaultCheckIn).add(1, "day")
      : dayjs().add(8, "day"),
  });

  const setCurrentMonth = (num: number) => {
    _setCurrentMonth((prevMonth) => prevMonth.add(num, "month"));
  };
  const [calendarSettings, setCalendarSettings] = useState<CalendarProps>({
    ...defaultProps,
    ...calendarProps,
  });

  useGetSavedPeriod(setBookingDates);
  useUpdateCheckInOut(bookingDates, onCheckInOutChange);

  const value: CalendarContextType = {
    today: dayjs(),
    currentMonth,
    setCurrentMonth,
    bookingDates,
    setBookingDates,
    calendarSettings,
    setCalendarSettings,
    onCheckInOutChange,
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};

export { CalendarContext, CalendarProvider };
