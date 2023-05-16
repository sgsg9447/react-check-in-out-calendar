import { ThemeProvider } from "styled-components";
import Calendar from "./components/calendar";
import GlobalStyle from "./styles/GlobalStyles";
import { CalendarProvider } from "./context/CalendarContext";

function App(props: CalendarProps) {
  const { mainColor, subMainColor, onCheckInOutChange } = props;

  const handleCheckInOutChange = (checkInDate?: Date, checkOutDate?: Date) => {
    // check-in, check-out 날짜 변경 시 실행할 로직 작성
    console.log("checkInDate", checkInDate);
    console.log("checkOutDate", checkOutDate);
  };

  return (
    <ThemeProvider theme={{ mainColor, subMainColor }}>
      <GlobalStyle />
      <CalendarProvider
        calendarProps={props}
        // onCheckInOutChange={onCheckInOutChange}
        onCheckInOutChange={handleCheckInOutChange}
      >
        <Calendar />
      </CalendarProvider>
    </ThemeProvider>
  );
}

export default App;
