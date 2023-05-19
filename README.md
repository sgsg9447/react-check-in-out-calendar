# react-check-in-out-calendar

react-check-in-out-calendar library는 React 기반의 체크인 체크아웃 기능을 가진 달력 컴포넌트 라이브러리입니다.

## 설치

npm을 사용하여 패키지를 설치할 수 있습니다.

```
npm install react-check-in-out-calendar
```
## 사용법
다음은 기본적인 사용법 예시입니다.

```
import { Calendar } from "react-check-in-out-calendar";

function App() {
  const test = (start, end) => {
    console.log(start, end);
  };
  return (
    <>
    <Calendar />
    </>
  );
}

export default App;
```

## Props
react-check-in-out-calendar library는 는 다양한 프로퍼티를 통해 사용자 정의할 수 있습니다.

| Prop               | Type                                    | Description                                    |
| ------------------ | --------------------------------------- | ---------------------------------------------- |
| mainColor          | string                                  | 주 색상 설정                                    |
| subMainColor       | string                                  | 보조 색상 설정                                  |
| startDay           | 0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6         | 주의 시작 요일 설정                             |
| numMonths          | 1 \| 2 \| 3 \| 4                        | 표시할 달의 개수 설정                           |
| language           | "ko" \| "en"                            | 언어 설정                                       |
| onCheckInOutChange | (checkInDate?: Date, checkOutDate?: Date) => void | 체크인 체크아웃 날짜 변경 시 호출되는 콜백 함수 |

## 예제
```
import React, { useState } from "react";
import { Calendar } from "your-calendar-library";

const App = () => {
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);

  const handleCheckInOutChange = (checkIn?: Date, checkOut?: Date) => {
    setCheckInDate(checkIn);
    setCheckOutDate(checkOut);
  };

  return (
    <div>
      <h1>체크인 체크아웃 달력</h1>
      <Calendar
        mainColor="#ff0000"
        subMainColor="#ff9999"
        startDay={0}
        numMonths={2}
        language="ko"
        onCheckInOutChange={handleCheckInOutChange}
      />
      <p>체크인 날짜: {checkInDate?.toLocaleDateString()}</p>
      <p>체크아웃 날짜: {checkOutDate?.toLocaleDateString()}</p>
    </div>
  );
};

export default App;
```

## 기여
이 프로젝트에 관심을 가져주셔서 감사합니다! 기여는 언제든 환영합니다. 버그 리포트, 기능 제안, 코드 개선 등을 포함하여 어떠한 형태의 기여도 환영합니다. 기여하시려는 경우, 이 저장소를 포크한 후 Pull Request를 보내주십시오.

- 현재 기능 수정중입니다. 