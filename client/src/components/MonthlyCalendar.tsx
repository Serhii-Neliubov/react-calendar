import { useState } from 'react';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';
import { AddEventModal } from './AddEventModal';
import { IEvent } from '../models/IEvent';

const MonthlyCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [events, setEvents] = useState<IEvent[]>([]);

  const totalDays = getDaysInMonth(date.getFullYear(), date.getMonth());
  const daysInMonth = Array.from({ length: totalDays }, (_, index) => index + 1);
  const weeklyDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const goToPreviousMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  const handleDayClick = (day: number) => {
    setSelectedDate(new Date(date.getFullYear(), date.getMonth(), day));
  };

  function getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
  }

  const filteredEvents = events.filter((event: IEvent) => {
    const eventDate = new Date(event.date);
    return selectedDate && eventDate.toDateString() === selectedDate.toDateString();
  });

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-between w-full">
        <button
          className='bg-blue-500 h-[40px] px-[10px] text-[16px] rounded-md flex items-center gap-2 hover:bg-blue-400 transition-all text-white relative'
          onClick={goToPreviousMonth}><FaLongArrowAltLeft/> Previous Month
        </button>

        <button
          className='bg-blue-500 h-[40px] px-[10px] text-[16px] rounded-md flex items-center gap-2 hover:bg-blue-400 transition-all text-white relative'
          onClick={goToNextMonth}>Next Month<FaLongArrowAltRight/></button>
      </div>

      <h2 className="mb-4 text-2xl font-bold text-center">{date.toLocaleString('default', {month: 'long'})} {date.getFullYear()}</h2>

      <div className="grid grid-cols-7 bg-gray-200 p-[15px] rounded-md gap-4">
        {weeklyDays.map(day => (
          <div key={day} className="text-center font-semibold">{day}</div>
        ))}

        {daysInMonth.map(day => (
          <div key={day} className="text-center hover:bg-gray-300 max-w-[30px] max-h-[30px] rounded-md transition-all cursor-pointer" onClick={() => handleDayClick(day)}>
            {day}
          </div>
        ))}
      </div>

      <AddEventModal setEvents={setEvents} events={events} date={selectedDate}/>

      {selectedDate && (
        <div className="mt-4">
          <h3>Events for {selectedDate.toDateString()}</h3>
          <ul className='flex flex-col mt-2 gap-2'>
            {filteredEvents.map((event: IEvent, index) => (
              <li className='p-[5px] bg-gray-200 rounded-md' key={index}>
                <strong>{event.title}</strong> - {event.time}
                <p>{event.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MonthlyCalendar;
