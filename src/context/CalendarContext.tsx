import { createContext, useState, ReactNode, useEffect } from 'react'
import dayjs from 'dayjs'
import { CalendarProps } from '../type'

const defaultProps: CalendarProps = {
  startDay: 0,
  numMonths: 2,
  language: 'ko',
}

// 컨텍스트에서 사용될 타입을 정의합니다.
type CalendarContextType = {
  today: dayjs.Dayjs
  currentMonth: dayjs.Dayjs
  setCurrentMonth: (num: number) => void
  bookingDates: {
    checkIn?: dayjs.Dayjs
    checkOut?: dayjs.Dayjs
  }
  setBookingDates: React.Dispatch<
    React.SetStateAction<{
      checkIn?: dayjs.Dayjs
      checkOut?: dayjs.Dayjs
    }>
  >
  calendarSettings: CalendarProps
  setCalendarSettings: React.Dispatch<React.SetStateAction<CalendarProps>>
  onCheckInOutChange?: (checkInDate?: Date, checkOutDate?: Date) => void
}

// 초기 컨텍스트 값을 설정합니다.
const initialContextValue: CalendarContextType = {
  today: dayjs(),
  currentMonth: dayjs(),
  setCurrentMonth: () => {},
  bookingDates: {
    checkIn: undefined,
    checkOut: undefined,
  },
  setBookingDates: () => {},
  calendarSettings: {
    numMonths: 2,
    language: 'ko',
    startDay: 0,
  },
  setCalendarSettings: () => {},
  onCheckInOutChange: () => {},
}

// 컨텍스트를 생성합니다.
const CalendarContext = createContext<CalendarContextType>(initialContextValue)

type CalendarProviderProps = {
  children: ReactNode
  calendarProps: CalendarProps
  onCheckInOutChange?: (checkInDate?: Date, checkOutDate?: Date) => void
}

const CalendarProvider = ({
  children,
  calendarProps = defaultProps,
  onCheckInOutChange,
}: CalendarProviderProps) => {
  const [currentMonth, _setCurrentMonth] = useState<dayjs.Dayjs>(dayjs())
  const [bookingDates, setBookingDates] = useState<{
    checkIn?: dayjs.Dayjs
    checkOut?: dayjs.Dayjs
  }>({
    checkIn: dayjs().add(7, 'day'),
    checkOut: dayjs().add(8, 'day'),
  })

  const setCurrentMonth = (num: number) => {
    _setCurrentMonth(prevMonth => prevMonth.add(num, 'month'))
  }
  const [calendarSettings, setCalendarSettings] = useState<CalendarProps>({
    ...defaultProps,
    ...calendarProps,
  })

  useEffect(() => {
    const periodData = localStorage.getItem('stayPeriod')
    if (periodData) {
      const { checkIn, checkOut } = JSON.parse(periodData)
      setBookingDates({
        checkIn: dayjs(checkIn),
        checkOut: dayjs(checkOut),
      })
    }
  }, [])

  useEffect(() => {
    if (onCheckInOutChange) {
      onCheckInOutChange(bookingDates.checkIn?.toDate(), bookingDates.checkOut?.toDate())
    }
  }, [bookingDates, onCheckInOutChange])

  const value: CalendarContextType = {
    today: dayjs(),
    currentMonth,
    setCurrentMonth,
    bookingDates,
    setBookingDates,
    calendarSettings,
    setCalendarSettings,
    onCheckInOutChange,
  }

  return <CalendarContext.Provider value={value}>{children}</CalendarContext.Provider>
}

export { CalendarContext, CalendarProvider }
