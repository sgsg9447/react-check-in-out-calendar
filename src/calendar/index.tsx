import { useEffect, useState } from "react";
import Body from "./Body";
import { addDaysToDate, addMonthsToDate, convertDateToString } from "../utils/dateUtils";
import styled from "styled-components";


type CheckInOutType = {
  checkIn?: Date;
  checkOut?: Date;
};

const Calendar = () => {
  const today = new Date(convertDateToString(new Date()));
  const [initialMonthDate, setInitialMonthDate] = useState(
    new Date(convertDateToString(new Date()))
  );

  const [checkIn, setCheckIn] = useState<Date | undefined>(addDaysToDate(today, 7));
  const [checkOut, setCheckOut] = useState<Date | undefined>(addDaysToDate(today, 8));

  const [todayDate, setTodayDate] = useState(today);
  const [showMonthDate, setShowMonthDate] = useState(initialMonthDate);
  const [checkInOut, setCheckInOut] = useState<CheckInOutType>({
    checkIn: checkIn,
    checkOut: checkOut,
  });
  useEffect(() => {
    const periodData: string | null = localStorage.getItem("stayPeriod");
    setCheckIn(
      periodData ? new Date(JSON.parse(periodData).checkIn) : addDaysToDate(today, 7)
    );
    setCheckOut(
      periodData ? new Date(JSON.parse(periodData).checkOut) : addDaysToDate(today, 8)
    );
  }, []);

  const handleChangePrevButton = () => {
    const currentDate = addMonthsToDate(new Date(showMonthDate), -1);
    setShowMonthDate(currentDate);
  };
  const handleChangeNextButton = () => {
    const currentDate = addMonthsToDate(new Date(showMonthDate), +1);
    setShowMonthDate(currentDate);
  };

  const handleClickDate = (date: Date) => {
    const todayString = convertDateToString(today);
    const dateString = convertDateToString(date);
    //오늘날짜보다 클릭한 날짜가 작으면 아무일도 일어나지않게 return
    if (todayString > dateString) {
      return;
    }
    //체크인값이 없는경우 ||checkIn값과 checkOut값이 있는경우 체크인 값을 오늘날짜로 해주기
    if (!checkInOut.checkIn || (checkInOut.checkIn && checkInOut.checkOut)) {
      setCheckInOut({
        checkIn: new Date(date),
        checkOut: undefined,
      });
      //클릭한 날의 값이 체크인의 값보다 큰경우 즉 오늘날짜 4일 클릭날짜 10일 -> 오늘일이 기본적으로 체크인에 되어있을테니 체크아웃 값설정
    } else if (date > checkInOut.checkIn) {
      setCheckInOut({
        ...checkInOut,
        checkOut: new Date(date),
      });
      // 클릭한 날이 체크인 값 보다 작을경우, 즉 오늘날짜로 기본 셋팅되었을텐데 그거보다 이전 날짜를 클릭하면 체크인을 오늘날짜로 설정해줘야지 그러며 초기화!
    } else if (date < checkInOut.checkIn) {
      setCheckInOut({
        checkIn: new Date(date),
        checkOut: undefined,
      });
    }
  };

  const laterMonthDate = addMonthsToDate(todayDate, 11);

  return (
    <div>
      <HeadContainer>
        <ButtonContainer>
          {todayDate.getFullYear() >= showMonthDate.getFullYear() &&
          todayDate.getMonth() >= showMonthDate.getMonth() ? (
            <div></div>
          ) : (
            <Button onClick={handleChangePrevButton}>&lt;</Button>
          )}
          {laterMonthDate.getFullYear() <= showMonthDate.getFullYear() &&
          laterMonthDate.getMonth() <= showMonthDate.getMonth() ? (
            <div></div>
          ) : (
            <Button onClick={handleChangeNextButton}>&gt;</Button>
          )}
        </ButtonContainer>
      </HeadContainer>

      <Body
        today={today}
        month={showMonthDate.getMonth() + 1}
        year={showMonthDate.getFullYear()}
        handleClickDate={handleClickDate}
        
      />
    </div>
  );
};

export default Calendar;

const HeadContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
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
  border: none;
  background: transparent;
  &:active {
    transform: scale(1.2);
  }
`;
