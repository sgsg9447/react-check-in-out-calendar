import React, { createContext, useState, ReactNode } from "react";
import * as dayjs from "dayjs";

// 컨텍스트에서 사용될 타입을 정의합니다.
type CurrentMonthContextType = {
  currentMonth: dayjs.Dayjs;
  setCurrentMonth: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
};

// 초기 컨텍스트 값을 설정합니다.
const initialContextValue: CurrentMonthContextType = {
  currentMonth: dayjs(),
  setCurrentMonth: () => {},
};

// 컨텍스트를 생성합니다.
const CurrentMonthContext =
  createContext<CurrentMonthContextType>(initialContextValue);

type CurrentMonthProviderProps = {
  children: ReactNode;
};

const CurrentMonthProvider = ({ children }: CurrentMonthProviderProps) => {
  const [currentMonth, setCurrentMonth] = useState<dayjs.Dayjs>(dayjs());
  const value = { currentMonth, setCurrentMonth };

  return (
    <CurrentMonthContext.Provider value={value}>
      {children}
    </CurrentMonthContext.Provider>
  );
};

export { CurrentMonthContext, CurrentMonthProvider };
