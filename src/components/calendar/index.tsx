import { useContext } from "react";
import { addMonthsToDate, convertDateToString } from "../../utils/dateUtils";
import WeekdayHeader from "./WeekdayHeader";
import MonthView from "./MonthView";
import { CurrentMonthContext } from "../../context/CurrentMonthContext";
import useHandleClickDate from "../../hooks/useHandleClickDate";

const Calendar = () => {
  // convertDateToString 함수를 사용하여 날짜를 YYYY-MM-DD 형식의 문자열로 변환한 후에 다시 Date 객체로 변환함으로써, Date 객체를 일관된 형식으로 사용할 수 있게 됨.
  const today = new Date(convertDateToString(new Date()));
  const { currentMonth, setCurrentMonth } = useContext(CurrentMonthContext);
  const handleChangeButton = (num: number) => {
    setCurrentMonth(addMonthsToDate(currentMonth, num));
  };
  const handleClickDate = useHandleClickDate(today);

  return (
    <div>
      <WeekdayHeader today={today} handleChangeButton={handleChangeButton} />
      <MonthView today={today} handleClickDate={handleClickDate} />
    </div>
  );
};

export default Calendar;
