import { useContext } from "react";
import MonthNavigation from "./MonthNavigation";
import MonthView from "./MonthView";
import { CurrentMonthContext } from "../../context/CurrentMonthContext";
import useHandleClickDate from "../../hooks/useHandleClickDate";
import * as dayjs from "dayjs";
import styled from "styled-components";

const Calendar = ({ numMonths = 1 }) => {
  const today: dayjs.Dayjs = dayjs();
  const { currentMonth, setCurrentMonth } = useContext(CurrentMonthContext);
  const handleChangeButton = (num: number) => {
    setCurrentMonth(currentMonth.add(num, "month"));
  };
  const handleClickDate = useHandleClickDate(today);

  return (
    <div>
      <MonthNavigation today={today} handleChangeButton={handleChangeButton} />
      <CalendarContainer>
        {Array.from({ length: numMonths }).map((_, index) => {
          const month = ((currentMonth.month() + index) % 12) + 1;
          const year =
            currentMonth.year() +
            Math.floor((currentMonth.month() + index) / 12);
          return (
            <MonthView
              key={index}
              today={today}
              month={month}
              year={year}
              handleClickDate={handleClickDate}
              // startFromMonday={true}
            />
          );
        })}
      </CalendarContainer>
    </div>
  );
};

export default Calendar;

const CalendarContainer = styled.div`
  display: flex;
  overflow-x: auto;
`;
