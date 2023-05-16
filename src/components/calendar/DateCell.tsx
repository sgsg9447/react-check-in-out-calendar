import styled, { css } from "styled-components";
import dayjs from "dayjs";
import { useContext } from "react";
import { CalendarContext } from "../../context/CalendarContext";
import useHandleClickDate from "../../hooks/useHandleClickDate";

type DateCellProps = {
  date: number;
  month: number;
  year: number;
  isOtherDay: boolean;
};
// 주어진 날짜가 선택된 체크인 또는 체크아웃 날짜와 일치하는지 확인하는 함수입니다.

const DateCell = ({ date, month, year, isOtherDay }: DateCellProps) => {
  const { bookingDates, today } = useContext(CalendarContext);
  const currentDate = dayjs(new Date(year, month - 1, date));
  const handleClickDate = useHandleClickDate(today);

  // 날짜 문자열 변환
  const currentDateString = currentDate.format("YYYY-MM-DD");
  const todayDateString = today.format("YYYY-MM-DD");
  const checkInDateString = bookingDates.checkIn?.format("YYYY-MM-DD");
  const checkOutDateString = bookingDates.checkOut?.format("YYYY-MM-DD");

  // 선택된 날짜 및 범위 내 날짜 확인
  const isSelectedDate =
    !isOtherDay &&
    (checkInDateString === currentDateString ||
      checkOutDateString === currentDateString);

  const isWithinRange =
    !isOtherDay &&
    checkInDateString &&
    checkOutDateString &&
    checkInDateString < currentDateString &&
    currentDateString < checkOutDateString;

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
  isHighlighting?: boolean;
  isOtherDay: boolean;
  isBeforeToday: boolean;
}>`
  display: ${(props) => (props.isOtherDay ? "none" : "block")};

  color: ${(props) =>
    props.isBeforeToday
      ? "var(--color-light-gray)"
      : props.isHighlighting
      ? "var(--color-white)"
      : "var(--color-black)"};

  &:hover {
    ::after {
      content: "";
      display: block;
      border: ${(props) =>
        props.isBeforeToday
          ? "var(--color-white)"
          : "3px solid var(--color-main)"};
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
  background-color: var(--color-sub-main);
`;

const TodayDot = styled.div<{ isHighlighting: boolean }>`
  background-color: ${(props) =>
    props.isHighlighting ? "var(--color-white)" : "var(--color-main)"};
  border-radius: 50%;
  width: 5px;
  height: 5px;
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
