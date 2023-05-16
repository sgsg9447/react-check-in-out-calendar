import { ThemeProvider } from "styled-components";
import Calendar from "./components/calendar";
import GlobalStyle from "./styles/GlobalStyles";
import { CalendarProvider } from "./context/CalendarContext";

function App(props: CalendarProps) {
  const { mainColor, subMainColor } = props;

  return (
    <ThemeProvider theme={{ mainColor, subMainColor }}>
      <GlobalStyle />
      <CalendarProvider calendarProps={props}>
        <Calendar />
      </CalendarProvider>
    </ThemeProvider>
  );
}

export default App;
