import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { CalendarContext } from "../../../context/CalendarContext";
import { calculateNewDates } from "../../../utils/dateUtils";
import Dates from "../dates";
import WeekdayHeader from "./WeekdayHeader";
import Weekdays from "./Weekdays";

const MonthView = ({ index }: { index: number }) => {
  const { currentMonth, calendarSettings } = useContext(CalendarContext);
  const { language = "en" } = calendarSettings;
  const [dates, setDates] = useState(calculateNewDates(currentMonth, index));

  useEffect(() => {
    setDates(calculateNewDates(currentMonth, index));
  }, [currentMonth]);
  return (
    <Container>
      <WeekdayHeader
        year={dates.newYear}
        month={dates.newMonth}
        language={language}
      />

      <BodyContentContainer>
        <Weekdays />
        <Dates newYear={dates.newYear} newMonth={dates.newMonth} />
      </BodyContentContainer>
    </Container>
  );
};

export default MonthView;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const BodyContentContainer = styled.div`
  margin: 20px;
`;
