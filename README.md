# react-check-in-out-calendar

<img width="1502" alt="image" src="https://github.com/sgsg9447/react-check-in-out-calendar-core/assets/87474789/9c3e6bc3-22d7-4ecd-8e86-c391dd9f71e9">


<img width="1510" alt="image" src="https://github.com/sgsg9447/react-check-in-out-calendar-core/assets/87474789/c947c43e-5438-4016-8f7b-6554cc6bd20d">



This package provides a simple and customizable calendar component for React applications. It uses the power of styled-components for styling, the flexibility of React context for state management, and the dayjs library for all the date manipulations.

## Installation

Use the package manager npm to install react-check-in-out-calendar

```
npm install react-check-in-out-calendar
```

Or with yarn:

```
yarn add react-check-in-out-calendar
```

## Props

| Prop Name          | Type                                              | Description                                                                       | Default                 |
| ------------------ | ------------------------------------------------- | --------------------------------------------------------------------------------- | ----------------------- |
| mainColor          | string                                            | The primary color of the calendar                                                 | '#ff375c'               |
| subMainColor       | string                                            | The primary color of the calendar                                                 | '#FEC0CA'               |
| startDay           | 0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6                   | The starting day of the week                                                      | 0                       |
| numMonths          | 1 \| 2 \| 3 \| 4                                  | The number of months to be shown in the calendar                                  | 2                       |
| language           | "ko" \| "en"                                      | The language for the calendar                                                     | 'en'                    |
| maximumMonths      | number                                            | The maximum number of months that the calendar can display. (i.e 12, 24, 36, ...) | 12                      |
| defaultCheckIn     | string \| Dayjs                                   | The check-in date in "YYYY-MM-DD" format.                                         | 7 days from current day |
| defaultCheckOut    | string \| Dayjs                                   | The check-out date in "YYYY-MM-DD" format.                                        | 8 days from current day |
| isRectangular      | boolean                                           | Determines if the date cells should be displayed as rectangles instead of circles | false                   |
| onCheckInOutChange | (checkInDate?: Date, checkOutDate?: Date) => void | Callback function when check-in or check-out date changes.                        |                         |

## Usage

```jsx
import { Calendar } from "react-check-in-out-calendar";

function App() {
  return (
    <Calendar
      mainColor="#ff6347"
      subMainColor="#ffa07a"
      startDay={0}
      numMonths={2}
      language="ko"
      maximumMonths={12}
      defaultCheckIn="2023-06-01"
      defaultCheckOut="2023-06-15"
      isRectangular={true}
      onCheckInOutChange={(checkInDate, checkOutDate) => {
        console.log("Check-in: ", checkInDate, " Check-out: ", checkOutDate);
      }}
    />
  );
}
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

The MIT License.

## Planned Updates

Custom Styling: We are working on resetting the default styles of the calendar component to provide more flexibility for customization. Soon, users will be able to apply their own styling by providing custom class names and overriding the default styles.

Core Library and UI Library Separation: We are also planning to separate the core functionality of the calendar from the UI components. This will allow users to use their preferred UI libraries or build their own UI components while still leveraging the calendar's powerful date manipulation capabilities.

Stay tuned for these upcoming updates, and feel free to reach out with any questions or suggestions you may have.

## Core Library
[react-check-in-out-calendar-core](https://www.npmjs.com/package/react-check-in-out-calendar-core)

## Contact

If you have any questions or suggestions, please feel free to contact me. I'm always open to improving this package and would love to hear any ideas or solve any issues you may have.

- Email: sgsg9447@gmail.com
- GitHub: [sgsg9447](https://github.com/sgsg9447)
