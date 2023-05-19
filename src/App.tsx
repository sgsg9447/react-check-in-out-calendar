import { ThemeProvider } from "styled-components";
import Calendar from "./components/calendar";
import GlobalStyle from "./styles/GlobalStyles";
import { CalendarProvider } from "./context/CalendarContext";
import { CalendarProps } from "./types";

/**
 * Calendar component props
 *
 * @property {string} [mainColor] - The main color for the calendar. (optional)
 * @property {string} [subMainColor] - The sub main color for the calendar. (optional)
 * @property {0|1|2|3|4|5|6} [startDay] - The start day of the week. (optional)
 * @property {1|2|3|4} [numMonths] - The number of months to be shown. (optional)
 * @property {"ko"|"en"} [language] - The language for the calendar. (optional)
 * @property {number} [maximumMonths] - The maximum number of months that the calendar can display. (optional)
 * @property {string | Dayjs} [defaultCheckIn] - "YYYY-MM-DD" (optional)
 * @property {string | Dayjs} [defaultCheckOut] - "YYYY-MM-DD" (optional)
 * @property {function} [onCheckInOutChange] - Callback function when check-in or check-out date changes. (optional)
 */

function App(props: CalendarProps) {
  const { mainColor, subMainColor, onCheckInOutChange } = props;

  return (
    <ThemeProvider theme={{ mainColor, subMainColor }}>
      <GlobalStyle />
      <CalendarProvider
        calendarProps={props}
        onCheckInOutChange={onCheckInOutChange}
      >
        <Calendar />
      </CalendarProvider>
    </ThemeProvider>
  );
}

export default App;
