import { useContext } from "react";
import { BookingDatesContext } from "../../context/BookingDatesContext";
import styled from "styled-components";

const BookingDatesView = ({ language = "ko" }: CalendarProps) => {
  const { bookingDates } = useContext(BookingDatesContext);
  const checkInText = language === "ko" ? "체크인" : "Check-In";
  const checkOutText = language === "ko" ? "체크아웃" : "Check-Out";

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
