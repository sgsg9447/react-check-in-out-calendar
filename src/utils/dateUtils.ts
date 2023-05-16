// 주어진 연도(year)와 월(month)에 해당하는 달력을 출력하기 위해 필요한 날짜들을 계산하는 역할
export const generateMonthCalendar = (
  year: number,
  month: number,
  startDay: number
): Date[] => {
  // 주어진 연도와 월의 1일을 나타내는 Date객체
  const startOfMonth = new Date(year, month - 1, 1);
  // 주어진 연도와 월의 마지막 날짜를 나타내는 Date객체
  const endOfMonth = new Date(year, month, 0);
  // 주어진 연도와 월의 1일이 해당하는 요일을 나타내는 정수
  let startOfWeek = (7 + startOfMonth.getDay() - startDay) % 7;
  // 주어진 연도와 월의 마지막날이 해당하는 요일을 나타내는 정수
  let endOfWeek = (7 + endOfMonth.getDay() - startDay) % 7;

  const startDate = startOfMonth.getDate();
  const endDate = endOfMonth.getDate();
  // year와 month에 해당하는 월의 일 수에 해당하는 날짜 객체들을 만드는 부분
  const days = Array.from({ length: endDate }, (_, i) => {
    return new Date(year, month - 1, i + 1);
  });

  // 주어진 달의 첫번째 날짜가 속한 주의 시작 요일을 기준으로, 이전 달의 일부 날짜를 포함하는 배열을 생성함
  // Add dates from previous month
  const previousMonthDays = Array.from({ length: startOfWeek }, (_, i) => {
    const date = new Date(year, month - 2, startDate - startOfWeek + i);
    return date;
  });

  // 현재 월에서 다음 월로 넘어가는 일 수에 해당하는 날짜들을 구하는 부분입니다.
  // Add dates from next month
  const nextMonthDays = Array.from({ length: 6 - endOfWeek }, (_, i) => {
    const date = new Date(year, month, endDate + i + 1);
    return date;
  });
  return previousMonthDays.concat(days, nextMonthDays);
};
