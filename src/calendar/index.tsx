import { useEffect, useState } from "react";
import {
  addDaysToDate,
  addMonthsToDate,
  convertDateToString,
} from "../utils/dateUtils";
import Body from "./Body";
import Header from "./Header";

type CheckInOutType = {
  checkIn?: Date;
  checkOut?: Date;
};

const Calendar = () => {
  // convertDateToString 함수를 사용하여 날짜를 YYYY-MM-DD 형식의 문자열로 변환한 후에 다시 Date 객체로 변환함으로써, Date 객체를 일관된 형식으로 사용할 수 있게 됨.
  const today = new Date(convertDateToString(new Date()));
  const [showMonthDate, setShowMonthDate] = useState(today);
  const defaultCheckInDate = addDaysToDate(today, 7);
  const defaultCheckOutDate = addDaysToDate(today, 8);

  const [checkInOut, setCheckInOut] = useState<CheckInOutType>({
    checkIn: undefined,
    checkOut: undefined,
  });

  const handleChangeButton = (num: number) => {
    const currentDate = addMonthsToDate(showMonthDate, num);
    setShowMonthDate(currentDate);
  };

  useEffect(() => {
    const periodData = localStorage.getItem("stayPeriod");
    if (periodData) {
      const { checkIn, checkOut } = JSON.parse(periodData);
      setCheckInOut({
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
      });
    } else {
      setCheckInOut({
        checkIn: defaultCheckInDate,
        checkOut: defaultCheckOutDate,
      });
    }
  }, []);

  const handleClickDate = (date: Date) => {
    const todayString = convertDateToString(today);
    const dateString = convertDateToString(date);
    //오늘날짜보다 클릭한 날짜가 작으면 아무일도 일어나지않게 return
    if (todayString > dateString) {
      return;
    }
    //체크인값이 없는경우 ||checkIn값과 checkOut값이 있는경우 체크인 값을 오늘날짜로 해주기
    if (!checkInOut.checkIn || (checkInOut.checkIn && checkInOut.checkOut)) {
      setCheckInOut({
        checkIn: date,
        checkOut: undefined,
      });
      //클릭한 날의 값이 체크인의 값보다 큰경우 즉 오늘날짜 4일 클릭날짜 10일 -> 오늘일이 기본적으로 체크인에 되어있을테니 체크아웃 값설정
    } else if (date > checkInOut.checkIn) {
      setCheckInOut({
        ...checkInOut,
        checkOut: date,
      });
      // 클릭한 날이 체크인 값 보다 작을경우, 즉 오늘날짜로 기본 셋팅되었을텐데 그거보다 이전 날짜를 클릭하면 체크인을 오늘날짜로 설정해줘야지 그러며 초기화!
    } else if (date < checkInOut.checkIn) {
      setCheckInOut({
        checkIn: date,
        checkOut: undefined,
      });
    }
  };

  return (
    <div>
      <Header
        today={today}
        month={showMonthDate.getMonth() + 1}
        year={showMonthDate.getFullYear()}
        showMonthDate={showMonthDate}
        handleChangeButton={handleChangeButton}
      />
      <Body
        today={today}
        month={showMonthDate.getMonth() + 1}
        year={showMonthDate.getFullYear()}
        handleClickDate={handleClickDate}
        checkInDate={checkInOut.checkIn}
        checkOutDate={checkInOut.checkOut}
      />
    </div>
  );
};

export default Calendar;
