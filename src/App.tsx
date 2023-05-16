import { ThemeProvider } from "styled-components";
import Calendar from "./components/calendar";
import GlobalStyle from "./styles/GlobalStyles";
import { CalendarProvider } from "./context/CalendarContext";

function App(props: CalendarProps) {
  return (
    <ThemeProvider
      theme={{ mainColor: props.mainColor, subMainColor: props.subMainColor }}
    >
      <GlobalStyle />
      <CalendarProvider>
        <Calendar {...props} />
      </CalendarProvider>
    </ThemeProvider>
  );
}

export default App;
