import styled, { css } from "styled-components";
import { convertDateToString } from "../../utils/dateUtils";

type DateCellProps = {
  date: number;
  today: Date;
  month: number;
  year: number;
  handleClickDate: (date: Date) => void;
  checkInDate?: Date;
  checkOutDate?: Date;
  isOtherDay: boolean;
};
// 선택된 날짜를 확인합니다.
const isDateSelected = (
  currentDateString: string,
  checkInDateString: string | undefined,
  checkOutDateString: string | undefined,
  isOtherDay: boolean
) => {
  // 현재 날짜가 체크인 날짜나 체크아웃 날짜와 같으면 true, 그렇지 않으면 false
  // isDateSelected 함수는 현재 날짜가 체크인 날짜 또는 체크아웃 날짜와 일치하면 true를 반환
  // isOtherDay가 참이면 (즉, 현재 날짜가 이전이나 다음 달의 날짜이면) false를 반환
  return (
    !isOtherDay &&
    (checkInDateString === currentDateString ||
      checkOutDateString === currentDateString)
  );
};

// 날짜가 체크인과 체크아웃 날짜 사이에 있는지 확인함
const isDateWithinRange = (
  currentDateString: string,
  checkInDateString: string | undefined,
  checkOutDateString: string | undefined,
  isOtherDay: boolean
) => {
  // 현재 날짜가 체크인 날짜와 체크아웃 날짜 사이에 있으면 true, 그렇지 않으면 false
  // isDateWithinRange 함수는 현재 날짜가 체크인 날짜와 체크아웃 날짜 사이에 있으면 true를 반환
  // isOtherDay가 참이면 (즉, 현재 날짜가 이전이나 다음 달의 날짜이면) false를 반환
  return (
    !isOtherDay &&
    checkInDateString &&
    checkOutDateString &&
    checkInDateString < currentDateString &&
    currentDateString < checkOutDateString
  );
};

const DateCell = ({
  date,
  handleClickDate,
  today,
  month,
  year,
  checkInDate,
  checkOutDate,
  isOtherDay,
}: DateCellProps) => {
  const currentDate = new Date(year, month - 1, date);
  // 날짜 문자열 변환
  const currentDateString = convertDateToString(currentDate);
  const todayDateString = convertDateToString(today);
  const checkInDateString = checkInDate
    ? convertDateToString(checkInDate)
    : undefined;
  const checkOutDateString = checkOutDate
    ? convertDateToString(checkOutDate)
    : undefined;

  // 선택된 날짜 및 범위 내 날짜 확인
  const isSelectedDate = isDateSelected(
    currentDateString,
    checkInDateString,
    checkOutDateString,
    isOtherDay
  );
  const isWithinRange = isDateWithinRange(
    currentDateString,
    checkInDateString,
    checkOutDateString,
    isOtherDay
  );

  // 날짜 클릭시 호출되는 함수, 전달받은 handleClickDate에 현재 날짜 전달
  const handleDateClick = () => {
    handleClickDate(currentDate);
  };

  return (
    <DatesContainer onClick={handleDateClick}>
      {isSelectedDate && <Highlighting />}
      {isWithinRange && <MiddleHighlighting />}
      {currentDateString === todayDateString && (
        <TodayDot isHighlighting={isSelectedDate} />
      )}

      <DateNum
        isBeforeToday={currentDateString < todayDateString}
        isOtherDay={isOtherDay}
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        isHighlighting={isSelectedDate}
      >
        {date}
      </DateNum>
    </DatesContainer>
  );
};

export default DateCell;

const centered = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const DatesContainer = styled.li`
  display: flex;
  position: relative;
  width: calc(100% / 7);
  padding: 1rem 0;
  text-align: center;
  list-style: none;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
`;

const DateNum = styled.div<{
  checkInDate?: Date;
  checkOutDate?: Date;
  isHighlighting?: boolean;
  isOtherDay: boolean;
  isBeforeToday: boolean;
}>`
  display: ${(props) => (props.isOtherDay ? "none" : "block")};

  color: ${(props) =>
    props.isBeforeToday ? "#D3D3D3" : props.isHighlighting ? "#fff" : "black"};

  &:hover {
    ::after {
      content: "";
      display: block;
      border: ${(props) =>
        props.isBeforeToday ? "#fff" : "3px solid var(--color-main)"};
      border-radius: 50%;
      width: 40px;
      height: 40px;
      ${centered}
    }
  }
  cursor: pointer;
  z-index: 10;
`;

const Highlighting = styled.div`
  border: 3px solid var(--color-main);
  background-color: var(--color-main);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  ${centered}
`;
const MiddleHighlighting = styled.div`
  width: 40px;
  height: 40px;
  ${centered}
  border-radius: 50%;
  background-color: pink;
`;

const TodayDot = styled.div<{ isHighlighting: boolean }>`
  background-color: ${(props) =>
    props.isHighlighting ? "#fff" : "var(--color-main)"};

  border-radius: 50%;
  width: 5px;
  height: 5px;
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
