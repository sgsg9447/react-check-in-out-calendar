import styled from "styled-components";
import { useContext } from "react";
import { CurrentMonthContext } from "../../context/CurrentMonthContext";
import * as dayjs from "dayjs";

type MonthNavigationProps = {
  today: dayjs.Dayjs;
  handleChangeButton: (num: number) => void;
};

const MonthNavigation = ({
  today,
  handleChangeButton,
}: MonthNavigationProps) => {
  const { currentMonth } = useContext(CurrentMonthContext);
  const laterMonthDate = today.add(11, "month").toDate();
  const isPrevButtonDisabled =
    today.year() >= currentMonth.year() &&
    today.month() >= currentMonth.month();
  const isNextButtonDisabled =
    laterMonthDate.getFullYear() <= currentMonth.year() &&
    laterMonthDate.getMonth() <= currentMonth.month();

  return (
    <Container>
      <ButtonContainer>
        {isPrevButtonDisabled ? (
          <div></div>
        ) : (
          <button onClick={() => handleChangeButton(-1)}>&lt;</button>
        )}
        {isNextButtonDisabled ? (
          <div></div>
        ) : (
          <button onClick={() => handleChangeButton(1)}>&gt;</button>
        )}
      </ButtonContainer>
    </Container>
  );
};

export default MonthNavigation;

const Container = styled.div`
  width: 100%;
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
