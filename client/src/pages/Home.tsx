import {useEffect, useState} from 'react';
import {FaLongArrowAltLeft, FaLongArrowAltRight} from 'react-icons/fa';
import {IEvent} from '../models/IEvent';
import UserService from "../services/user.service.ts";
import {AddEventModal} from "../components/AddEventModal.tsx";

interface HomeProps {
  setIsAuth: (isAuth: boolean) => void;
}

export const Home = ({setIsAuth}: HomeProps) => {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [events, setEvents] = useState<IEvent[]>([]);

  const currentDate = new Date();
  const totalDays = getDaysInMonth(date.getFullYear(), date.getMonth());
  const monthlyDays = Array.from({ length: totalDays }, (_, index) => index + 1);
  const firstDayOfWeek = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const previousMonthTotalDays = getDaysInMonth(date.getFullYear(), date.getMonth() - 1);
  const daysFromPreviousMonth = Array.from({ length: firstDayOfWeek }, (_, index) => {
    return previousMonthTotalDays - firstDayOfWeek + index + 1;
  });


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

  const logoutHandler = async () => {
    try {
      await UserService.logout();
      setIsAuth(false);
    } catch (error){
      console.error('Error with logging out:', error);
    }
  }

  const filteredEvents = events
    .filter((event: IEvent) => {
      const eventDate = new Date(event.date);
      return selectedDate && eventDate.toDateString() === selectedDate.toDateString();
    })
    .sort((a, b) => {
      const timeA = new Date(`2000-01-01T${a.time}`).getTime();
      const timeB = new Date(`2000-01-01T${b.time}`).getTime();

      return timeA - timeB;
    });

  const isEventPassed = (eventTime: string) => {
    const currentTime = new Date();
    const [eventHour, eventMinute] = eventTime.split(':').map(Number);
    const eventDateTime = new Date(
      currentTime.getFullYear(),
      currentTime.getMonth(),
      currentTime.getDate(),
      eventHour,
      eventMinute
    );
    return currentTime > eventDateTime;
  };

  const getLineClassName = (eventTime: string) => {
    return isEventPassed(eventTime) ? 'line-below' : 'line-above';
  };

  const getAllEvents = async () => {
    const userDto = await UserService.getDto();

    setEvents(userDto?.data.events || [])
  }

  const deleteEvent = async (id: string) => {
    const data = await UserService.deleteEvent(id);

    if(data) {
      setEvents(data?.data.events)
    }
  }

  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <div className="flex flex-col items-center">
          <div className="flex justify-between w-full">
            <button
              className='bg-blue-500 h-[40px] px-[10px] text-[16px] rounded-md flex items-center gap-2 hover:bg-blue-400 transition-all text-white relative'
              onClick={goToPreviousMonth}><FaLongArrowAltLeft/> Previous Month
            </button>

            <button
              className='bg-blue-500 h-[40px] px-[10px] text-[16px] rounded-md flex items-center gap-2 hover:bg-blue-400 transition-all text-white relative'
              onClick={goToNextMonth}>Next Month<FaLongArrowAltRight/>
            </button>
          </div>
          <h1 className='underline font-semibold'>Today is: {currentDate.getDate()}.{currentDate.getMonth()}.{currentDate.getFullYear()}</h1>
          <h2 className="mb-4 text-2xl font-bold text-center">{date.toLocaleString('default', {month: 'long'})} {date.getFullYear()}</h2>

          {/* Grid for days of the week and days of the month */}
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
              <div key={day}
                   className="text-center hover:bg-gray-300 max-w-[30px] max-h-[30px] rounded-md transition-all cursor-pointer"
                   onClick={() => handleDayClick(day)}>
                {day}
              </div>
            ))}

            {/* Days of the following month to fill the space */}
            {Array.from({length: 42 - (daysFromPreviousMonth.length + totalDays)}, (_, index) => (
              <div key={`next-month-${index}`} className="text-center text-gray-400">{index + 1}</div>
            ))}
          </div>

          <AddEventModal setEvents={setEvents} events={events} date={selectedDate}/>

          {/* Display events for the selected date */}
          {selectedDate &&
              <div className="mt-4">
                  <h3 className='bg-gray-200 py-[5px] px-[10px] rounded-md'>Events
                      for {selectedDate.toDateString()}</h3>
                  <ul className='max-w-[290px] flex flex-col mt-2 gap-2'>
                    {filteredEvents.map((event: IEvent) => (
                      <li className={`p-[5px] bg-gray-200 rounded-md gap-2 items-center flex justify-between ${getLineClassName(event.time)}`} key={event._id}>
                        <div>
                          <strong className='break-words'>{event.title}</strong> - {event.time}
                          <p className='break-words'>{event.description}</p>
                        </div>
                        <button className='bg-black text-white rounded-md py-2 px-[10px]' onClick={() => deleteEvent(event._id as string)}>Delete</button>
                      </li>
                    ))}
                  </ul>
              </div>
          }

      <button
        className='fixed bottom-4 left-4 bg-red-500 text-white py-[10px] px-[15px] rounded-md hover:bg-red-400 transition-all'
        onClick={logoutHandler}>
        Logout
      </button>
    </div>
  );
};