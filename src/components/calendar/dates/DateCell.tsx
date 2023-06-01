import dayjs from "dayjs";
import { useContext } from "react";
import styled, { css } from "styled-components";
import { DATE_FORMAT } from "../../../constants/format";
import { CalendarContext } from "../../../context/CalendarContext";
import useHandleClickDate from "../../../hooks/useHandleClickDate";

type DateCellProps = {
  date: number;
  month: number;
  year: number;
  isOtherDay: boolean;
  lastDayOfMonth: number;
};

const DateCell = ({
  date,
  month,
  year,
  isOtherDay,
  lastDayOfMonth,
}: DateCellProps) => {
  const { bookingDates, today, calendarSettings } = useContext(CalendarContext);
  const { isRectangular, resetStyle } = calendarSettings;
  const currentDate = dayjs(new Date(year, month - 1, date));
  const { handleClickDate } = useHandleClickDate(today);
  const currentDateString = currentDate.format(DATE_FORMAT);
  const todayDateString = today.format(DATE_FORMAT);
  const isAfterLastDay = date > lastDayOfMonth;
  const checkInDateString = bookingDates.checkIn?.format(DATE_FORMAT);
  const checkOutDateString = bookingDates.checkOut?.format(DATE_FORMAT);
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

  return (
    <DatesContainer
      onClick={
        !isAfterLastDay && !isOtherDay
          ? () => handleClickDate(currentDate)
          : undefined
      }
    >
      {isSelectedDate && (
        <Highlighting isRectangular={isRectangular} resetStyle={resetStyle} />
      )}
      {isWithinRange && (
        <MiddleHighlighting
          isRectangular={isRectangular}
          resetStyle={resetStyle}
        />
      )}
      {currentDateString === todayDateString && (
        <TodayDot isHighlighting={isSelectedDate} resetStyle={resetStyle} />
      )}
      <DateNum
        isBeforeToday={currentDateString < todayDateString}
        isOtherDay={isOtherDay}
        isHighlighting={isSelectedDate}
        isRectangular={isRectangular}
        resetStyle={resetStyle}
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
  isRectangular?: boolean;
  resetStyle?: boolean;
}>`
  display: ${(props) => (props.isOtherDay ? "none" : "block")};

  color: ${(props) =>
    props.resetStyle
      ? "var(--color-black)"
      : props.isBeforeToday
      ? "var(--color-light-gray)"
      : props.isHighlighting
      ? "var(--color-white)"
      : "var(--color-black)"};

  &:hover {
    ::after {
      content: "";
      display: block;
      border: ${(props) =>
        props.resetStyle
          ? "var(--color-white)"
          : props.isBeforeToday
          ? "var(--color-white)"
          : "3px solid var(--color-main)"};
      border-radius: ${(props) => (props.isRectangular ? "4px" : "50%")};

      width: 40px;
      height: 40px;
      ${centered}
    }
  }
  cursor: pointer;
  z-index: 10;
`;

const Highlighting = styled.div<{
  isRectangular?: boolean;
  resetStyle?: boolean;
}>`
  border: ${(props) =>
    props.resetStyle ? "var(--color-white)" : "3px solid var(--color-main)"};
  background-color: ${(props) =>
    props.resetStyle ? "var(--color-white)" : "var(--color-main)"};
  border-radius: ${(props) => (props.isRectangular ? "4px" : "50%")};
  width: 40px;
  height: 40px;
  ${centered}
`;
const MiddleHighlighting = styled.div<{
  isRectangular?: boolean;
  resetStyle?: boolean;
}>`
  width: 40px;
  height: 40px;
  ${centered}
  border-radius: ${(props) => (props.isRectangular ? "4px" : "50%")};
  background-color: ${(props) =>
    props.resetStyle ? "var(--color-white)" : "var(--color-sub-main)"};
`;

const TodayDot = styled.div<{ isHighlighting: boolean; resetStyle?: boolean }>`
  background-color: ${(props) =>
    props.resetStyle
      ? "var(--color-white)"
      : props.isHighlighting
      ? "var(--color-white)"
      : "var(--color-main)"};

  border-radius: 50%;
  width: 5px;
  height: 5px;
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
