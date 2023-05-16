import { useContext } from "react";
import styled from "styled-components";
import { CalendarContext } from "../../context/CalendarContext";
import { languageTextMap } from "../../constants/languages";

const BookingDatesView = ({ language = "ko" }: CalendarProps) => {
  const { bookingDates } = useContext(CalendarContext);
  const { checkIn: checkInText, checkOut: checkOutText } =
    languageTextMap[language];

  return (
    <BookingDatesViewContainer>
      <BookingDatesViewBox>
        <BookingDatesTitle>
          {checkInText} {bookingDates.checkIn?.format("YYYY-MM-DD")}
        </BookingDatesTitle>
      </BookingDatesViewBox>
      <BookingDatesViewBox>
        <BookingDatesTitle>
          {checkOutText} {bookingDates.checkOut?.format("YYYY-MM-DD")}
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
