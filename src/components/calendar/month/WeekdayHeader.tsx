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
      <WeekdayHeaderText>
        {getFormattedDateText(year, month, language)}
      </WeekdayHeaderText>
    </WeekdayHeaderContainer>
  );
};

export default WeekdayHeader;

const WeekdayHeaderContainer = styled.div`
  display: flex;
  width: 100%;
  height: 5vh;
  margin: 1.5rem 0;
  position: relative;
`;

const WeekdayHeaderText = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`;
