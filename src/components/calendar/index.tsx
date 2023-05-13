import { useContext } from "react";
import WeekdayHeader from "./WeekdayHeader";
import MonthView from "./MonthView";
import { CurrentMonthContext } from "../../context/CurrentMonthContext";
import useHandleClickDate from "../../hooks/useHandleClickDate";
import * as dayjs from "dayjs";

const Calendar = () => {
  const today: dayjs.Dayjs = dayjs();
  const { currentMonth, setCurrentMonth } = useContext(CurrentMonthContext);
  const handleChangeButton = (num: number) => {
    setCurrentMonth(currentMonth.add(num, "month"));
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
