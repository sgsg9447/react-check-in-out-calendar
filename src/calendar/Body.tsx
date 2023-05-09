import { useEffect, useState } from "react";
import styled from "styled-components";
import Dates from "./Dates";
import { generateMonthCalendar } from "../utils/dateUtils";
import uuid from "react-uuid";

type BodyProps = {
  today: Date;
  month: number;
  year: number;
  handleClickDate: (date: Date) => void;
  checkInDate?: Date;
  checkOutDate?: Date;
};

const Body = ({
  today,
  month,
  year,
  handleClickDate,
  checkInDate,
  checkOutDate,
}: BodyProps) => {
  const [totalDate, setTotalDate] = useState<Date[]>([]);
  const DAY = ["일", "월", "화", "수", "목", "금", "토"];

  useEffect(() => {
    setTotalDate(generateMonthCalendar(year, month));
  }, [year, month]);

  return (
    <Container>
      <BodyContentContainer>
        <Days>
          {DAY.map((elm) => {
            return <div key={uuid()}>{elm}</div>;
          })}
        </Days>

        <DatesContainer>
          {totalDate.map((date) => (
            <Dates
              key={uuid()}
              year={date.getFullYear()}
              month={date.getMonth() + 1}
              date={date.getDate()}
              isOtherDay={date.getMonth() + 1 !== month}
              handleClickDate={handleClickDate}
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              today={today}
            ></Dates>
          ))}
        </DatesContainer>
      </BodyContentContainer>
    </Container>
  );
};

export default Body;

const Container = styled.div`
  width: 100%;
  height: auto;
  position: relative;
`;
const BodyContentContainer = styled.div`
  margin: 20px;
  height: auto;
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
