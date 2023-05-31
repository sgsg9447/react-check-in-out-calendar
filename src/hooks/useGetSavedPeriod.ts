import { useEffect } from "react";
import dayjs from "dayjs";

type SetBookingDates = React.Dispatch<
  React.SetStateAction<{
    checkIn?: dayjs.Dayjs;
    checkOut?: dayjs.Dayjs;
  }>
>;

const STORAGE_KEY = "stayPeriod";

const useGetSavedPeriod = (setBookingDates: SetBookingDates) => {
  useEffect(() => {
    const periodData = localStorage.getItem(STORAGE_KEY);
    if (periodData) {
      const { checkIn, checkOut } = JSON.parse(periodData);
      setBookingDates({
        checkIn: dayjs(checkIn),
        checkOut: dayjs(checkOut),
      });
    }
  }, [setBookingDates]);
};

export default useGetSavedPeriod;
