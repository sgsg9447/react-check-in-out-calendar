import "./App.css";
import Calendar from "./components/calendar";
import { BookingDatesProvider } from "./context/BookingDatesContext";
import { CurrentMonthProvider } from "./context/CurrentMonthContext";

function App() {
  return (
    <>
      <CurrentMonthProvider>
        <BookingDatesProvider>
          <Calendar numMonths={1} />
        </BookingDatesProvider>
      </CurrentMonthProvider>
    </>
  );
}

export default App;
