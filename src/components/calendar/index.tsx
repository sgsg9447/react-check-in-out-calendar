import MonthNavigation from "./MonthNavigation";
import MonthView from "./MonthView";
import styled from "styled-components";
import BookingDatesView from "./BookingDatesView";
import { useContext } from "react";
import { CalendarContext } from "../../context/CalendarContext";

const Calendar = () => {
  const { calendarSettings } = useContext(CalendarContext);
  const { numMonths = 2, language = "ko" } = calendarSettings;

  return (
    <>
      <BookingDatesView language={language} />
      <MonthNavigation />
      <CalendarContainer>
        {Array.from({ length: numMonths }).map((_, index) => {
          return <MonthView key={index} index={index} />;
        })}
      </CalendarContainer>
    </>
  );
};

export default Calendar;

const CalendarContainer = styled.div`
  display: flex;
  overflow-x: auto;
`;
