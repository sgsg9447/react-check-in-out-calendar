import React, { createContext, useState, ReactNode } from "react";

// 컨텍스트에서 사용될 타입을 정의합니다.
type CurrentMonthContextType = {
  currentMonth: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
};

// 초기 컨텍스트 값을 설정합니다.
const initialContextValue: CurrentMonthContextType = {
  currentMonth: new Date(),
  setCurrentMonth: () => {},
};

// 컨텍스트를 생성합니다.
const CurrentMonthContext =
  createContext<CurrentMonthContextType>(initialContextValue);

type CurrentMonthProviderProps = {
  children: ReactNode;
};

const CurrentMonthProvider = ({ children }: CurrentMonthProviderProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const value = { currentMonth, setCurrentMonth };

  return (
    <CurrentMonthContext.Provider value={value}>
      {children}
    </CurrentMonthContext.Provider>
  );
};

export { CurrentMonthContext, CurrentMonthProvider };
