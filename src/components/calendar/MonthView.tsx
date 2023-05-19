import { useContext, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { calculateNewDates, generateMonthCalendar } from '../../utils/dateUtils'
import DateCell from './DateCell'
import { DAYS_OF_WEEK_EN, DAYS_OF_WEEK_KO } from '../../constants/daysOfWeek'
import { CalendarContext } from '../../context/CalendarContext'

const MonthView = ({ index }: { index: number }) => {
  const { currentMonth, calendarSettings } = useContext(CalendarContext)
  const { language = 'ko', startDay = 0 } = calendarSettings
  const [dates, setDates] = useState(calculateNewDates(currentMonth, index))

  const DAYS_OF_WEEK: string[] = useMemo(() => {
    const daysOfWeek = language === 'ko' ? DAYS_OF_WEEK_KO : DAYS_OF_WEEK_EN
    return [...daysOfWeek.slice(startDay), ...daysOfWeek.slice(0, startDay)]
  }, [language, startDay])

  useEffect(() => {
    setDates(calculateNewDates(currentMonth, index))
  }, [currentMonth, index])

  const totalDate = useMemo(() => {
    return generateMonthCalendar(dates.newYear, dates.newMonth, startDay)
  }, [dates.newYear, dates.newMonth, startDay])

  return (
    <Container>
      <WeekdayHeaderContainer>
        {language === 'ko' ? (
          <WeekdayHeaderText>
            {dates.newYear}년 {dates.newMonth}월
          </WeekdayHeaderText>
        ) : (
          <WeekdayHeaderText>
            {dates.newYear}. {dates.newMonth}
          </WeekdayHeaderText>
        )}
      </WeekdayHeaderContainer>
      <BodyContentContainer>
        <Days>
          {DAYS_OF_WEEK.map(elm => (
            <div key={elm}>{elm}</div>
          ))}
        </Days>

        <DatesContainer>
          {totalDate.map(date => (
            <DateCell
              key={date.toString()}
              year={date.getFullYear()}
              month={date.getMonth() + 1}
              date={date.getDate()}
              isOtherDay={date.getMonth() + 1 !== dates.newMonth}
            />
          ))}
        </DatesContainer>
      </BodyContentContainer>
    </Container>
  )
}

export default MonthView

const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`

const WeekdayHeaderContainer = styled.div`
  display: flex;
  width: 100%;
  height: 5vh;
  margin: 1.5rem 0;
  position: relative;
`

const WeekdayHeaderText = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`

const BodyContentContainer = styled.div`
  margin: 20px;
`

const Days = styled.div`
  display: flex;
  color: var(--color-black);
  width: 100%;
  height: 2rem;
  justify-content: space-around;
  align-items: center;
`

const DatesContainer = styled.ul`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
`
