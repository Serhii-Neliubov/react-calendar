import {useEffect, useState} from 'react';
import {FaLongArrowAltLeft, FaLongArrowAltRight} from 'react-icons/fa';
import {IEvent} from '../models/IEvent';
import UserService from "../services/user.service.ts";
import {AddEventModal} from "../components/AddEventModal.tsx";
import {EventList} from "../components/EventList.tsx";
import {Calendar} from "../components/Calendar.tsx";

interface HomeProps {
  setIsAuth: (isAuth: boolean) => void;
}

export const Home = ({setIsAuth}: HomeProps) => {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [events, setEvents] = useState<IEvent[]>([]);

  const currentDate = new Date();


  const goToPreviousMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  const logoutHandler = async () => {
    try {
      await UserService.logout();
      setIsAuth(false);
    } catch (error){
      console.error('Error with logging out:', error);
    }
  }


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

  const returnToCurrentDateHandler = () => {
    setSelectedDate(new Date());
    setDate(new Date());
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

      <button onClick={returnToCurrentDateHandler} className='bg-blue-500 text-white p-[10px] transition-all rounded-md hover:bg-blue-400 font-semibold'>
        Today is: {currentDate.getDate()}.{currentDate.getMonth()}.{currentDate.getFullYear()}
      </button>

      <h2 className="mb-4 text-2xl font-bold text-center">{date.toLocaleString('default', {month: 'long'})} {date.getFullYear()}</h2>

      <Calendar setSelectedDate={setSelectedDate} date={date}/>
      <AddEventModal setEvents={setEvents} events={events} date={selectedDate}/>
      <EventList selectedDate={selectedDate} events={events} deleteEvent={deleteEvent}/>

      <button className='fixed bottom-4 left-4 bg-red-500 text-white py-[10px] px-[15px] rounded-md hover:bg-red-400 transition-all' onClick={logoutHandler}>
        Logout
      </button>
    </div>
  );
};