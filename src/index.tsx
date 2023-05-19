import { ThemeProvider } from 'styled-components'
import Calendar from './components/calendar'
import GlobalStyle from './styles/GlobalStyles'
import { CalendarProvider } from './context/CalendarContext'
import { CalendarProps } from './type'

function App(props: CalendarProps) {
  const { mainColor, subMainColor, onCheckInOutChange } = props

  return (
    <ThemeProvider theme={{ mainColor, subMainColor }}>
      <GlobalStyle />
      <CalendarProvider calendarProps={props} onCheckInOutChange={onCheckInOutChange}>
        <Calendar />
      </CalendarProvider>
    </ThemeProvider>
  )
}

export default App
