import React, { createContext, useState, ReactNode, useEffect } from "react";
import { addDaysToDate } from "../utils/dateUtils";

// 컨텍스트에서 사용될 타입을 정의합니다.
type BookingDatesType = {
  checkIn?: Date;
  checkOut?: Date;
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
    checkIn: undefined,
    checkOut: undefined,
  });

  useEffect(() => {
    const periodData = localStorage.getItem("stayPeriod");
    if (periodData) {
      const { checkIn, checkOut } = JSON.parse(periodData);
      setBookingDates({
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
      });
    } else {
      const defaultCheckInDate = addDaysToDate(new Date(), 7);
      const defaultCheckOutDate = addDaysToDate(new Date(), 8);
      setBookingDates({
        checkIn: defaultCheckInDate,
        checkOut: defaultCheckOutDate,
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
