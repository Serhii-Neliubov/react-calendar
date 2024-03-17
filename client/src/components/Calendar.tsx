interface CalendarProps {
  setSelectedDate: (date: Date) => void;
  date: Date;
}

export const Calendar = ({ setSelectedDate, date }: CalendarProps) => {
  const totalDays = getDaysInMonth(date.getFullYear(), date.getMonth());
  const monthlyDays = Array.from({ length: totalDays }, (_, index) => index + 1);
  const firstDayOfWeek = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const previousMonthTotalDays = getDaysInMonth(date.getFullYear(), date.getMonth() - 1);
  const daysFromPreviousMonth = Array.from({ length: firstDayOfWeek }, (_, index) => {
    return previousMonthTotalDays - firstDayOfWeek + index + 1;
  });
  const weeklyDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handleDayClick = (day: number) => {
    setSelectedDate(new Date(date.getFullYear(), date.getMonth(), day));
  };

  function getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
  }

  return (
    <div className="grid grid-cols-7 bg-gray-200 p-[15px] rounded-md gap-4">
      {weeklyDays.map((day, index) => (
        <div key={index} className="text-center font-semibold">{day}</div>
      ))}

      {/* Days of the previous month to fill the space */}
      {daysFromPreviousMonth.map(day => (
        <div key={`previous-month-${day}`} className="text-center text-gray-400">{day}</div>
      ))}

      {/* Days of the current month */}
      {monthlyDays.map(day => (
        <div
          key={day}
          className={`text-center max-w-[30px] max-h-[30px] rounded-md cursor-pointer`}
          onClick={() => handleDayClick(day)}
        >
          {day}
        </div>
      ))}

      {/* Days of the following month to fill the space */}
      {Array.from({ length: 42 - (daysFromPreviousMonth.length + totalDays) }, (_, index) => (
        <div key={`next-month-${index}`} className="text-center text-gray-400">{index + 1}</div>
      ))}
    </div>
  );
};