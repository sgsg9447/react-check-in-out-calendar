import React, { createContext, useState, ReactNode, useEffect } from "react";
import * as dayjs from "dayjs";

// 컨텍스트에서 사용될 타입을 정의합니다.
type BookingDatesType = {
  checkIn?: dayjs.Dayjs;
  checkOut?: dayjs.Dayjs;
};

type BookingDatesContextType = {
  bookingDates: BookingDatesType;
  setBookingDates: React.Dispatch<React.SetStateAction<BookingDatesType>>;
};

// 초기 컨텍스트 값을 설정합니다.
const initialContextValue: BookingDatesContextType = {
  bookingDates: {
    checkIn: undefined,
    checkOut: undefined,
  },
  setBookingDates: () => {},
};

// 컨텍스트를 생성합니다.
const BookingDatesContext =
  createContext<BookingDatesContextType>(initialContextValue);

type BookingDatesProviderProps = {
  children: ReactNode;
};

const BookingDatesProvider = ({ children }: BookingDatesProviderProps) => {
  const [bookingDates, setBookingDates] = useState<BookingDatesType>({
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

  const value = { bookingDates, setBookingDates };

  return (
    <BookingDatesContext.Provider value={value}>
      {children}
    </BookingDatesContext.Provider>
  );
};

export { BookingDatesContext, BookingDatesProvider };
