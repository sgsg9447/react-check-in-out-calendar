import styled from "styled-components";
import DateCell from "./DateCell";
import { useContext, useMemo } from "react";
import { generateMonthCalendar } from "../../../utils/dateUtils";
import { CalendarContext } from "../../../context/CalendarContext";

type DatesProps = {
  newYear: number;
  newMonth: number;
};

const Dates = ({ newYear, newMonth }: DatesProps) => {
  const { calendarSettings } = useContext(CalendarContext);
  const { startDay = 0 } = calendarSettings;

  const totalDate = useMemo(() => {
    return generateMonthCalendar(newYear, newMonth, startDay);
  }, [newYear, newMonth, startDay]);

  const lastDayOfMonth = useMemo(() => {
    return new Date(newYear, newMonth, 0).getDate();
  }, [newYear, newMonth]);
  return (
    <DatesContainer>
      {totalDate.map((date) => (
        <DateCell
          key={date.toString()}
          year={date.getFullYear()}
          month={date.getMonth() + 1}
          date={date.getDate()}
          isOtherDay={date.getMonth() + 1 !== newMonth}
          lastDayOfMonth={lastDayOfMonth}
        />
      ))}
    </DatesContainer>
  );
};

export default Dates;

const DatesContainer = styled.ul`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
`;
