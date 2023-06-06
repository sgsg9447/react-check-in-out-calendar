import { useCallback, useContext, useMemo } from "react";
import styled from "styled-components";
import { CalendarContext } from "../../context/CalendarContext";

const MonthNavigation = () => {
  const { today, currentMonth, setCurrentMonth, calendarSettings } =
    useContext(CalendarContext);
  const { maximumMonths = 12 } = calendarSettings;

  const laterMonthDate = useMemo(
    () => today.add(maximumMonths - 1, "month").toDate(),
    [today, maximumMonths]
  );

  const isPrevButtonDisabled =
    today.year() >= currentMonth.year() &&
    today.month() >= currentMonth.month();

  const isNextButtonDisabled =
    laterMonthDate.getFullYear() <= currentMonth.year() &&
    laterMonthDate.getMonth() <= currentMonth.month();

  const handleMonthChange = useCallback(
    (num: number) => {
      setCurrentMonth(num);
    },
    [setCurrentMonth]
  );

  return (
    <Container>
      <ButtonContainer>
        <Button
          disabled={isPrevButtonDisabled}
          onClick={() => handleMonthChange(-1)}
        >
          &lt;
        </Button>
        <Button
          disabled={isNextButtonDisabled}
          onClick={() => handleMonthChange(1)}
        >
          &gt;
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default MonthNavigation;

const Container = styled.div`
  display: flex;
  position: relative;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  position: absolute;
  top: 35px;
  width: 100%;
  z-index: 10;
`;

const Button = styled.button`
  ${(props) => props.disabled && "visibility: hidden;"}
`;
