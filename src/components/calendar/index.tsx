import MonthNavigation from "./MonthNavigation";
import MonthView from "./MonthView";
import useHandleClickDate from "../../hooks/useHandleClickDate";
import * as dayjs from "dayjs";
import styled from "styled-components";
import BookingDatesView from "./BookingDatesView";

const Calendar = ({
  numMonths = 2,
  language = "ko",
  startDay,
}: CalendarProps) => {
  const today: dayjs.Dayjs = dayjs();
  const handleClickDate = useHandleClickDate(today);

  return (
    <div>
      <BookingDatesView language={language} />
      <MonthNavigation today={today} />
      <CalendarContainer>
        {Array.from({ length: numMonths }).map((_, index) => {
          return (
            <MonthView
              key={index}
              today={today}
              index={index}
              startDay={startDay}
              handleClickDate={handleClickDate}
              language={language}
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
