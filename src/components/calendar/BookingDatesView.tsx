import { useContext } from "react";
import styled from "styled-components";
import { CalendarContext } from "../../context/CalendarContext";
import { languageTextMap } from "../../constants/languages";
import { DATE_FORMAT } from "../../constants/format";
import { CalendarProps } from "../../types";

const BookingDatesView = () => {
  const { bookingDates, calendarSettings } = useContext(CalendarContext);
  const { language = "en" } = calendarSettings;

  const { checkIn: checkInText, checkOut: checkOutText } =
    languageTextMap[language];

  return (
    <BookingDatesViewContainer>
      <BookingDatesViewBox>
        <BookingDatesTitle>
          {checkInText} {bookingDates.checkIn?.format(DATE_FORMAT)}
        </BookingDatesTitle>
      </BookingDatesViewBox>
      <BookingDatesViewBox>
        <BookingDatesTitle>
          {checkOutText} {bookingDates.checkOut?.format(DATE_FORMAT)}
        </BookingDatesTitle>
      </BookingDatesViewBox>
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
