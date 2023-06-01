import dayjs from "dayjs";
import { useContext } from "react";
import styled from "styled-components";
import { DATE_FORMAT } from "../../constants/format";
import { languageTextMap } from "../../constants/languages";
import { CalendarContext } from "../../context/CalendarContext";

const BookingDatesView = () => {
  const { bookingDates, calendarSettings } = useContext(CalendarContext);
  const { language = "en" } = calendarSettings;

  const { checkIn: checkInText, checkOut: checkOutText } =
    languageTextMap[language];

  const renderDateView = (title: string, date?: dayjs.Dayjs) => (
    <BookingDatesViewBox>
      <BookingDatesTitle>
        {title} {date?.format(DATE_FORMAT)}
      </BookingDatesTitle>
    </BookingDatesViewBox>
  );

  return (
    <BookingDatesViewContainer>
      {renderDateView(checkInText, bookingDates.checkIn)}
      {renderDateView(checkOutText, bookingDates.checkOut)}
    </BookingDatesViewContainer>
  );
};

export default BookingDatesView;

const BookingDatesViewContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 30px;
`;
const BookingDatesViewBox = styled.div`
  padding: 20px;
`;

const BookingDatesTitle = styled.p``;
