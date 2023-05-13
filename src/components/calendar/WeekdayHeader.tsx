import styled from "styled-components";
import { addMonthsToDate } from "../../utils/dateUtils";
import { useContext } from "react";
import { CurrentMonthContext } from "../../context/CurrentMonthContext";

type WeekdayHeaderProps = {
  today: Date;
  handleChangeButton: (num: number) => void;
};

const WeekdayHeader = ({ today, handleChangeButton }: WeekdayHeaderProps) => {
  const { currentMonth } = useContext(CurrentMonthContext);
  const laterMonthDate = addMonthsToDate(today, 11);
  const isPrevButtonDisabled =
    today.getFullYear() >= currentMonth.getFullYear() &&
    today.getMonth() >= currentMonth.getMonth();
  const isNextButtonDisabled =
    laterMonthDate.getFullYear() <= currentMonth.getFullYear() &&
    laterMonthDate.getMonth() <= currentMonth.getMonth();

  return (
    <HeadContainer>
      <HeadTextContainer>
        <HeadText>
          {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
        </HeadText>
      </HeadTextContainer>
      <ButtonContainer>
        {isPrevButtonDisabled ? (
          <div></div>
        ) : (
          <Button onClick={() => handleChangeButton(-1)}>&lt;</Button>
        )}
        {isNextButtonDisabled ? (
          <div></div>
        ) : (
          <Button onClick={() => handleChangeButton(1)}>&gt;</Button>
        )}
      </ButtonContainer>
    </HeadContainer>
  );
};

export default WeekdayHeader;

const HeadContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const HeadTextContainer = styled.div`
  display: flex;
  width: 100%;
  height: 5vh;
  margin: 1rem 0;
  position: relative;
`;

const HeadText = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
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
  border: none;
  background: transparent;
  &:active {
    transform: scale(1.2);
  }
`;
