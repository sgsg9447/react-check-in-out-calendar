import { useContext, useMemo } from "react";
import styled from "styled-components";
import {
  DAYS_OF_WEEK_EN,
  DAYS_OF_WEEK_KO,
} from "../../../constants/daysOfWeek";
import { CalendarContext } from "../../../context/CalendarContext";

const Weekdays = () => {
  const { calendarSettings } = useContext(CalendarContext);
  const { language = "en", startDay = 0 } = calendarSettings;

  const DAYS_OF_WEEK: string[] = useMemo(() => {
    let daysOfWeek = language === "ko" ? DAYS_OF_WEEK_KO : DAYS_OF_WEEK_EN;
    return [...daysOfWeek.slice(startDay), ...daysOfWeek.slice(0, startDay)];
  }, [language, startDay]);

  return (
    <Days>
      {DAYS_OF_WEEK.map((elm) => (
        <div key={elm}>{elm}</div>
      ))}
    </Days>
  );
};

export default Weekdays;

const Days = styled.div`
  display: flex;
  color: var(--color-black);
  width: 100%;
  height: 2rem;
  justify-content: space-around;
  align-items: center;
`;
