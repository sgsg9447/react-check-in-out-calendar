import styled from "styled-components";

type WeekdayHeaderProps = {
  year: number;
  month: number;
  language: string;
};

const WeekdayHeader = ({ year, month, language }: WeekdayHeaderProps) => {
  const getFormattedDateText = (
    year: number,
    month: number,
    language: string
  ) => (language === "ko" ? `${year}년 ${month}월` : `${month}. ${year}`);

  return (
    <WeekdayHeaderContainer>
      {getFormattedDateText(year, month, language)}
    </WeekdayHeaderContainer>
  );
};

export default WeekdayHeader;

const WeekdayHeaderContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 5vh;
  margin: 1.5rem 0;
`;
