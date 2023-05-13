import { useEffect, useState } from "react";
import styled from "styled-components";
import { generateMonthCalendar } from "../../utils/dateUtils";
import DateCell from "./DateCell";
import * as dayjs from "dayjs";

type MonthViewProps = {
  today: dayjs.Dayjs;
  month: number;
  year: number;
  handleClickDate: (date: dayjs.Dayjs) => void;
  startFromMonday?: boolean;
};

const MonthView = ({
  today,
  month,
  year,
  handleClickDate,
  startFromMonday = false,
}: MonthViewProps) => {
  const [totalDate, setTotalDate] = useState<Date[]>([]);
  const DAYS_OF_WEEK = ["일", "월", "화", "수", "목", "금", "토"];
  const daysOfWeek = startFromMonday
    ? DAYS_OF_WEEK.slice(1).concat(DAYS_OF_WEEK[0])
    : DAYS_OF_WEEK;

  useEffect(() => {
    setTotalDate(generateMonthCalendar(year, month, startFromMonday));
  }, [year, month, startFromMonday]);

  return (
    <Container>
      <WeekdayHeaderContainer>
        <WeekdayHeaderText>
          {year}년 {month}월
        </WeekdayHeaderText>
      </WeekdayHeaderContainer>
      <BodyContentContainer>
        <Days>
          {daysOfWeek.map((elm, index) => (
            <div key={index}>{elm}</div>
          ))}
        </Days>

        <DatesContainer>
          {totalDate.map((date, index) => (
            <DateCell
              key={index}
              year={date.getFullYear()}
              month={date.getMonth() + 1}
              date={date.getDate()}
              isOtherDay={date.getMonth() + 1 !== month}
              handleClickDate={handleClickDate}
              today={today}
            />
          ))}
        </DatesContainer>
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

const WeekdayHeaderContainer = styled.div`
  display: flex;
  width: 100%;
  height: 5vh;
  margin: 1.5rem 0;
  position: relative;
`;

const WeekdayHeaderText = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`;

const BodyContentContainer = styled.div`
  margin: 20px;
`;

const Days = styled.div`
  display: flex;
  color: var(--color-black);
  width: 100%;
  height: 2rem;
  justify-content: space-around;
  align-items: center;
`;

const DatesContainer = styled.ul`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
`;
