import { useEffect, useState } from "react";
import styled from "styled-components";
import Dates from "./Dates";
import { generateMonthCalendar } from "../utils/dateUtils";

type BodyProps = {
  today: Date;
  month: number;
  year: number;
  handleClickDate: (date: Date) => void;
  checkInDate?: Date;
  checkOutDate?: Date;
};

const DAYS_OF_WEEK = ["일", "월", "화", "수", "목", "금", "토"];

const Body = ({
  today,
  month,
  year,
  handleClickDate,
  checkInDate,
  checkOutDate,
}: BodyProps) => {
  const [totalDate, setTotalDate] = useState<Date[]>([]);

  useEffect(() => {
    setTotalDate(generateMonthCalendar(year, month));
  }, [year, month]);

  return (
    <Container>
      <BodyContentContainer>
        <Days>
          {DAYS_OF_WEEK.map((elm, index) => (
            <div key={index}>{elm}</div>
          ))}
        </Days>

        <DatesContainer>
          {totalDate.map((date, index) => (
            <Dates
              key={index}
              year={date.getFullYear()}
              month={date.getMonth() + 1}
              date={date.getDate()}
              isOtherDay={date.getMonth() + 1 !== month}
              handleClickDate={handleClickDate}
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              today={today}
            />
          ))}
        </DatesContainer>
      </BodyContentContainer>
    </Container>
  );
};

export default Body;

const Container = styled.div`
  width: 100%;
  position: relative;
`;
const BodyContentContainer = styled.div`
  margin: 20px;
`;

const Days = styled.div`
  display: flex;
  color: #969696;
  width: 100%;
  height: 2rem;
  justify-content: space-around;
  align-items: center;
`;

const DatesContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
`;
