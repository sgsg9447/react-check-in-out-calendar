import React, { createContext, useState, ReactNode, useEffect } from "react";
import * as dayjs from "dayjs";

// 컨텍스트에서 사용될 타입을 정의합니다.
type CalendarContextType = {
  currentMonth: dayjs.Dayjs;
  setCurrentMonth: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
  bookingDates: {
    checkIn?: dayjs.Dayjs;
    checkOut?: dayjs.Dayjs;
  };
  setBookingDates: React.Dispatch<
    React.SetStateAction<{
      checkIn?: dayjs.Dayjs;
      checkOut?: dayjs.Dayjs;
    }>
  >;
};

// 초기 컨텍스트 값을 설정합니다.
const initialContextValue: CalendarContextType = {
  currentMonth: dayjs(),
  setCurrentMonth: () => {},
  bookingDates: {
    checkIn: undefined,
    checkOut: undefined,
  },
  setBookingDates: () => {},
};

// 컨텍스트를 생성합니다.
const CalendarContext = createContext<CalendarContextType>(initialContextValue);

type CalendarProviderProps = {
  children: ReactNode;
};

const CalendarProvider = ({ children }: CalendarProviderProps) => {
  const [currentMonth, setCurrentMonth] = useState<dayjs.Dayjs>(dayjs());
  const [bookingDates, setBookingDates] = useState<{
    checkIn?: dayjs.Dayjs;
    checkOut?: dayjs.Dayjs;
  }>({
    checkIn: dayjs().add(7, "day"),
    checkOut: dayjs().add(8, "day"),
  });

  useEffect(() => {
    const periodData = localStorage.getItem("stayPeriod");
    if (periodData) {
      const { checkIn, checkOut } = JSON.parse(periodData);
      setBookingDates({
        checkIn: dayjs(checkIn),
        checkOut: dayjs(checkOut),
      });
    }
  }, []);

  const value = {
    currentMonth,
    setCurrentMonth,
    bookingDates,
    setBookingDates,
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};

export { CalendarContext, CalendarProvider };
