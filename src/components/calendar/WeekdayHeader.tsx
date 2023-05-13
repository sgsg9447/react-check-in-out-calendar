import styled from "styled-components";
import { useContext } from "react";
import { CurrentMonthContext } from "../../context/CurrentMonthContext";
import * as dayjs from "dayjs";

type WeekdayHeaderProps = {
  today: dayjs.Dayjs;
  handleChangeButton: (num: number) => void;
};

const WeekdayHeader = ({ today, handleChangeButton }: WeekdayHeaderProps) => {
  const { currentMonth } = useContext(CurrentMonthContext);
  //laterMonthDate는 today에 11개월을 더한 날짜를 가리키며
  //현재 월에서 11개월 후의 월과 비교하여 이전 버튼 및 다음 버튼을 비활성화하는 데 사용됨
  const laterMonthDate = today.add(11, "month").toDate();
  //오늘날짜 2023-05-10 클릭날짜 2023-05-30 => 이전버튼 비활성화
  //오늘날짜 2023-05-10 클릭날짜 2023-06-30 => 이전버튼 활성화
  const isPrevButtonDisabled =
    //오늘 날짜의 연도가 현재 월의 연도보다 크거나 같은 경우
    today.year() >= currentMonth.year() &&
    //오늘 날짜의 월이 현재 월의 월보다 크거나 같은 경우
    today.month() >= currentMonth.month();
  const isNextButtonDisabled =
    //나중 월의 연도가 현재 월의 연도보다 작거나 같은 경우
    laterMonthDate.getFullYear() <= currentMonth.year() &&
    //나중 월의 월이 현재 월의 월보다 작거나 같은 경우
    laterMonthDate.getMonth() <= currentMonth.month();

  return (
    <HeadContainer>
      <HeadTextContainer>
        <HeadText>
          {currentMonth.year()}년 {currentMonth.month() + 1}월
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
