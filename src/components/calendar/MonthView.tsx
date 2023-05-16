import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { generateMonthCalendar } from "../../utils/dateUtils";
import DateCell from "./DateCell";
import * as dayjs from "dayjs";
import { CurrentMonthContext } from "../../context/CurrentMonthContext";
import { DAYS_OF_WEEK_EN, DAYS_OF_WEEK_KO } from "../../constants/daysOfWeek";

type MonthViewProps = {
  today: dayjs.Dayjs;
  index: number;
  handleClickDate: (date: dayjs.Dayjs) => void;
  startDay?: CalendarProps["startDay"];
  language?: CalendarProps["language"];
};

const MonthView = ({
  today,
  index,
  handleClickDate,
  language = "ko",
  startDay = 0,
}: MonthViewProps) => {
  const [totalDate, setTotalDate] = useState<Date[]>([]);
  let DAYS_OF_WEEK: string[];
  const { currentMonth } = useContext(CurrentMonthContext);
  const [month, setMonth] = useState<number>(0);
  const [year, setYear] = useState<number>(0);
  useEffect(() => {
    const newMonth = ((currentMonth.month() + index) % 12) + 1;
    const newYear =
      currentMonth.year() + Math.floor((currentMonth.month() + index) / 12);
    setMonth(newMonth);
    setYear(newYear);
  }, [currentMonth, index]);

  if (language === "ko") {
    DAYS_OF_WEEK = DAYS_OF_WEEK_KO;
  } else {
    DAYS_OF_WEEK = DAYS_OF_WEEK_EN;
  }

  const daysOfWeek = [
    ...DAYS_OF_WEEK.slice(startDay),
    ...DAYS_OF_WEEK.slice(0, startDay),
  ];

  useEffect(() => {
    setTotalDate(generateMonthCalendar(year, month, startDay));
  }, [year, month, startDay]);

  return (
    <Container>
      <WeekdayHeaderContainer>
        {language === "ko" ? (
          <WeekdayHeaderText>
            {year}년 {month}월
          </WeekdayHeaderText>
        ) : (
          <WeekdayHeaderText>
            {year}. {month}
          </WeekdayHeaderText>
        )}
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
