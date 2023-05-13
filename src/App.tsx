import "./App.css";
import Calendar from "./components/calendar";
import { BookingDatesProvider } from "./context/BookingDatesContext";
import { CurrentMonthProvider } from "./context/CurrentMonthContext";

interface CalendarProps {
  mainColor: string;
  subMainColor: string;
  startFromMonday?: boolean;
  numMonths: number;
}

function App(props: CalendarProps) {
  return (
    <>
      <CurrentMonthProvider>
        <BookingDatesProvider>
          <Calendar {...props} />
        </BookingDatesProvider>
      </CurrentMonthProvider>
    </>
  );
}

export default App;
