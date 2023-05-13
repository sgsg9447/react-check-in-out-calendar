import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { generateMonthCalendar } from "../../utils/dateUtils";
import DateCell from "./DateCell";
import { CurrentMonthContext } from "../../context/CurrentMonthContext";
import { BookingDatesContext } from "../../context/BookingDatesContext";

type MonthViewProps = {
  today: Date;
  handleClickDate: (date: Date) => void;
};

const DAYS_OF_WEEK = ["일", "월", "화", "수", "목", "금", "토"];

const MonthView = ({ today, handleClickDate }: MonthViewProps) => {
  const [totalDate, setTotalDate] = useState<Date[]>([]);
  const { currentMonth } = useContext(CurrentMonthContext);
  const { bookingDates } = useContext(BookingDatesContext);
  const month = currentMonth.getMonth() + 1;
  const year = currentMonth.getFullYear();

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
            <DateCell
              key={index}
              year={date.getFullYear()}
              month={date.getMonth() + 1}
              date={date.getDate()}
              isOtherDay={date.getMonth() + 1 !== month}
              handleClickDate={handleClickDate}
              checkInDate={bookingDates.checkIn}
              checkOutDate={bookingDates.checkOut}
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
