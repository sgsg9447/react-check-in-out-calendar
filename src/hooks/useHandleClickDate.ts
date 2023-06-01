import * as dayjs from "dayjs";
import { useContext } from "react";
import { CalendarContext } from "../context/CalendarContext";

const useHandleClickDate = (today: dayjs.Dayjs) => {
  const { bookingDates, setBookingDates } = useContext(CalendarContext);

  const handleClickDate = (date: dayjs.Dayjs) => {
    //오늘 날짜를 문자열 형식으로 반환
    const todayString = today.format("YYYY-MM-DD");
    // 클릭한 날짜를 문자열 형식으로 반환
    const dateString = date.format("YYYY-MM-DD");
    //오늘날짜보다 클릭한 날짜가 작으면 아무일도 일어나지않게 return

    if (todayString > dateString) {
      return;
    }
    // 체크인 날짜가 없거나 체크인 및 체크아웃 날짜가 모두 설정된 경우,
    // 또는 클릭한 날짜가 체크인 날짜보다 작은 경우
    if (
      !bookingDates.checkIn ||
      (bookingDates.checkIn && bookingDates.checkOut) ||
      date < bookingDates.checkIn
    ) {
      setBookingDates((prevBookingDates) => ({
        ...prevBookingDates,
        checkIn: date,
        checkOut: undefined,
      }));

      //클릭한 날의 값이 체크인의 값보다 큰경우 즉 오늘날짜 4일 클릭날짜 10일 -> 오늘일이 기본적으로 체크인에 되어있을테니 체크아웃 값설정
    } else if (date > bookingDates.checkIn) {
      setBookingDates((prevBookingDates) => ({
        ...prevBookingDates,
        checkOut: date,
      }));
    }
  };

  return { handleClickDate };
};

export default useHandleClickDate;
