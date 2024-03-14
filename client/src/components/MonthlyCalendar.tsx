import {FormEvent, useState} from 'react';
import {FaCalendarPlus, FaLongArrowAltLeft, FaLongArrowAltRight} from "react-icons/fa";

const MonthlyCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [events, setEvents] = useState<IEvent[]>([]);
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);

  const goToPreviousMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  const handleDayClick = (day: number) => {
    setSelectedDate(new Date(date.getFullYear(), date.getMonth(), day));
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const totalDays = getDaysInMonth(date.getFullYear(), date.getMonth());
  const daysInMonth = Array.from({ length: totalDays }, (_, index) => index + 1);

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

        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-semibold">{day}</div>
        ))}

        {daysInMonth.map(day => (
          <div key={day} className="text-center hover:bg-gray-300 max-w-[30px] max-h-[30px] rounded-md transition-all cursor-pointer" onClick={() => handleDayClick(day)}>
            {day}
          </div>
        ))}
      </div>

      {selectedDate && (
        <div className="mt-4">
          <h3>Events for {selectedDate.toDateString()}</h3>
          <ul>
            {filteredEvents.map((event: IEvent) => (
              <li key={event.id}>
                <strong>{event.title}</strong> - {event.time}
                <p>{event.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button onClick={() => setIsEventFormOpen(true)} className="hover:bg-blue-400 flex items-center gap-2 transition-all bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
        Add Event <FaCalendarPlus />
      </button>

      {isEventFormOpen && <EventForm setEvents={setEvents} events={events} date={selectedDate} onClose={() => setIsEventFormOpen(false)}/>}

    </div>
  );
};

interface EventFormProps {
  date: string | null | Date;
  onClose: () => void;
  setEvents: (events: IEvent[]) => void;
  events: IEvent[];
}

const EventForm = ({date, onClose, setEvents, events}: EventFormProps) => {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const eventData: IEvent = {
      title,
      date: date as string,
      time,
      description
    };

    setEvents([...events, eventData]);
    onClose();
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Add New Event</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block font-semibold mb-1">Title</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border rounded-md p-2" required />
          </div>
          <div className="mb-4">
            <label htmlFor="time" className="block font-semibold mb-1">Time</label>
            <input type="time" id="time" value={time} onChange={(e) => setTime(e.target.value)} className="border rounded-md p-2" required />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block font-semibold mb-1">Description</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border rounded-md p-2" required />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">Save</button>
            <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-md">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MonthlyCalendar;
