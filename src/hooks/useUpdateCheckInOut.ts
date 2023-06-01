import { useEffect } from "react";
import dayjs from "dayjs";

type BookingDates = {
  checkIn?: dayjs.Dayjs;
  checkOut?: dayjs.Dayjs;
};

type CheckInOutChangeFunction = (
  checkInDate?: Date,
  checkOutDate?: Date
) => void;

export const useUpdateCheckInOut = (
  bookingDates: BookingDates,
  onCheckInOutChange: CheckInOutChangeFunction | undefined
) => {
  useEffect(() => {
    if (onCheckInOutChange) {
      onCheckInOutChange(
        bookingDates.checkIn?.toDate(),
        bookingDates.checkOut?.toDate()
      );
    }
  }, [bookingDates, onCheckInOutChange]);
};

export default useUpdateCheckInOut;
