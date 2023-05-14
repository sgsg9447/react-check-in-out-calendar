import { ThemeProvider } from "styled-components";
import Calendar from "./components/calendar";
import { BookingDatesProvider } from "./context/BookingDatesContext";
import { CurrentMonthProvider } from "./context/CurrentMonthContext";
import GlobalStyle from "./styles/GlobalStyles";

function App(props: CalendarProps) {
  return (
    <ThemeProvider
      theme={{ mainColor: props.mainColor, subMainColor: props.subMainColor }}
    >
      <GlobalStyle />
      <CurrentMonthProvider>
        <BookingDatesProvider>
          <Calendar {...props} />
        </BookingDatesProvider>
      </CurrentMonthProvider>
    </ThemeProvider>
  );
}

export default App;
