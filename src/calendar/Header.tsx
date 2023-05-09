import styled from "styled-components";
import { addMonthsToDate } from "../utils/dateUtils";

type HeaderProps = {
  today: Date;
  month: number;
  year: number;
  showMonthDate: Date;
  handleChangeButton: (num: number) => void;
};

const Header = ({
  today,
  month,
  year,
  showMonthDate,
  handleChangeButton,
}: HeaderProps) => {
  const laterMonthDate = addMonthsToDate(today, 11);
  const isPrevButtonDisabled =
    today.getFullYear() >= showMonthDate.getFullYear() &&
    today.getMonth() >= showMonthDate.getMonth();
  const isNextButtonDisabled =
    laterMonthDate.getFullYear() <= showMonthDate.getFullYear() &&
    laterMonthDate.getMonth() <= showMonthDate.getMonth();

  return (
      <HeadContainer>
        <HeadTextContainer>
          <HeadText>
            {year}년 {month}월
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

export default Header;

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
