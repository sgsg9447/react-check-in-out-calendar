import { useContext } from "react";
import { BookingDatesContext } from "../../context/BookingDatesContext";
import styled from "styled-components";

const BookingDatesView = () => {
  const { bookingDates } = useContext(BookingDatesContext);

  return (
    <BookingDatesViewContainer>
      <BookingDatesViewBox>
        <BookingDatesTitle>
          체크인 {bookingDates.checkIn?.format("YYYY-MM-DD")}
        </BookingDatesTitle>
      </BookingDatesViewBox>
      <BookingDatesViewBox>
        <BookingDatesTitle>
          체크아웃 {bookingDates.checkOut?.format("YYYY-MM-DD")}
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

const BookingDatesTitle = styled.p`

`;
