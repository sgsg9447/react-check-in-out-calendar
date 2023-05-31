import { useContext, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import {
  calculateNewDates,
  generateMonthCalendar,
} from "../../../utils/dateUtils";
import DateCell from "../dates/DateCell";
import {
  DAYS_OF_WEEK_EN,
  DAYS_OF_WEEK_KO,
} from "../../../constants/daysOfWeek";
import { CalendarContext } from "../../../context/CalendarContext";
import WeekdayHeader from "./WeekdayHeader";
import Dates from "../dates";
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
  position: relative;
  display: flex;
  flex-direction: column;
`;

const BodyContentContainer = styled.div`
  margin: 20px;
`;

const DatesContainer = styled.ul`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
`;
