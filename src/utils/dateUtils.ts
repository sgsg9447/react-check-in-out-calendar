//date를 입력받으면 ISO포맷의 문자열을 만들어주는 함수임

// YYYY-MM-DD 형식의 문자열을 반환 함수
// getFullYear() 메서드를 사용하여 연도를 가져옴
// getMonth() 메서드를 사용하여 월을 가져옴 (단, 월은 0부터 시작하므로 +1), 더해준 결과가 10보다 작으면 앞에 "0"을 붙여 형식 맞춤.
// getDate() 메서드를 사용하여 날짜를 가져옴 날짜가 10보다 작으면 앞에 "0"을 붙여줌
export const convertDateToString = (date: Date): string => {
  return `${date.getFullYear()}-${
    date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
  }-${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}`;
};

// 주어진 날짜에 일정한 월 수를 더한 새로운 날짜를 반환하는 함수
// 예를 들어, new Date('2023-05-09'),3을 addMonthsToDate 함수에 전달하면, new Date('2023-08-09')가 반환
// 전달된 숫자는 변경하고자 하는 월 수. 음수를 전달하면 이전 월로 이동하고, 양수를 전달하면 이후 월로 이동.
// 전달된 date를 기반으로 새로운 Date 객체를 생성함.
// setMonth() 메서드를 사용하여 새로운 Date 객체의 월을 변경함. 전달된 num 값을 월에 더해줌.
// 변경된 Date 객체를 반환
export const addMonthsToDate = (date: Date, num: number): Date => {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + num);
  return newDate;
};

// 주어진 날짜에 일정한 일 수를 더한 새로운 날짜를 반환하는 함수
// 예를 들어, new Date('2023-05-09'), 3을 addDaysToDate 함수에 전달하면, new Date('2023-05-12')가 반환
// 전달된 숫자는 변경하고자 하는 일 수. 음수를 전달하면 이전 날짜로 이동하고, 양수를 전달하면 이후 날짜로 이동.
// 전달된 date를 기반으로 새로운 Date 객체를 생성함.
// setDate() 메서드를 사용하여 새로운 Date 객체의 일을 변경함. 전달된 day 값을 일에 더해줌
// 변경된 Date 객체를 반환
export const addDaysToDate = (date: Date, day: number): Date => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + day);
  return newDate;
};

// 두 날짜 간의 차이를 구하는 함수
// 함수 내부에서는 전달된 d1과 d2의 값에 대해 각각 new Date()를 이용하여 복사하고,
// getTime()을 사용하여 밀리초 단위로 변환한 다음, 차이를 계산함. 이렇게 계산된 차이를 일(day) 단위로 변환하여 반환함.
// Math.abs() 함수는 인자로 전달된 값의 절댓값을 반환함.(이 함수는 음수 값이 전달되는 경우를 대비하여 사용됨)
// Math.floor() 함수는 Math.abs() 함수를 통해 구한 날짜 차이를 일(day) 단위로 변환하기 위해 사용됨.
export const getDateDiff = (d1: Date, d2: Date): number => {
  const date1 = new Date(d1);
  const date2 = new Date(d2);

  //밀리초 -> 초로 변환하기위해 1000으로 나눠줌
  const diffDate = date1.getTime() / 1000 - date2.getTime() / 1000;

  return Math.floor(Math.abs(diffDate / (60 * 60 * 24))); // 초 * 분 * 시 = 일
};
