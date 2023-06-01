import { useContext } from "react";
import styled from "styled-components";
import { CalendarContext } from "../../context/CalendarContext";
import BookingDatesView from "./BookingDatesView";
import MonthNavigation from "./MonthNavigation";
import MonthView from "./month";

const Calendar = () => {
  const { calendarSettings } = useContext(CalendarContext);
  const { numMonths, showBookingDatesView } = calendarSettings;

  return (
    <>
      {showBookingDatesView && <BookingDatesView />}

      <MonthNavigation />
      <CalendarContainer>
        {[...Array(numMonths)].map((_, index) => (
          <MonthView key={`month-view-${index}`} index={index} />
        ))}
      </CalendarContainer>
    </>
  );
};

export default Calendar;

const CalendarContainer = styled.div`
  display: flex;
  overflow-x: auto;
`;
