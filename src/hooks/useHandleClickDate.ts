import { useContext } from "react";
import { BookingDatesContext } from "../context/BookingDatesContext";
import { convertDateToString } from "../utils/dateUtils";

const useHandleClickDate = (today: Date) => {
  const { bookingDates, setBookingDates } = useContext(BookingDatesContext);

  const handleClickDate = (date: Date) => {
    //오늘 날짜를 문자열 형식으로 반환
    const todayString = convertDateToString(today);
    // 클릭한 날짜를 문자열 형식으로 반환
    const dateString = convertDateToString(date);
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
      setBookingDates({
        checkIn: date,
        checkOut: undefined,
      });
      //클릭한 날의 값이 체크인의 값보다 큰경우 즉 오늘날짜 4일 클릭날짜 10일 -> 오늘일이 기본적으로 체크인에 되어있을테니 체크아웃 값설정
    } else if (date > bookingDates.checkIn) {
      setBookingDates({
        ...bookingDates,
        checkOut: date,
      });
    }
  };

  return handleClickDate;
};

export default useHandleClickDate;
