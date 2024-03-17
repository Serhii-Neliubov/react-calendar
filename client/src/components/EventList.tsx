import {IEvent} from "../models/IEvent.ts";
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import {Fragment, useEffect, useState} from "react";
import UserService from "../services/user.service.ts";
import { HiDocumentDuplicate } from "react-icons/hi";
import EventService from "../services/event.service.ts";
import userService from "../services/user.service.ts";
import {ChangeEventModal} from "./ChangeEventModal.tsx";

interface EventListProps {
  selectedDate: Date | null;
  events: IEvent[];
  setEvents: (events: IEvent[]) => void;
}

export const EventList = ({selectedDate, events, setEvents}: EventListProps) => {
  const [passedEvents, setPassedEvents] = useState<string[]>([]);
  const [isChangeEventModalOpen, setIsChangeEventModalOpen] = useState(false);

  const [eventToChange, setEventToChange] = useState<IEvent | null>(null);

  useEffect(() => {
    const handleTimeChange = () => {
      const passedEventIds = events
        .filter(event => isEventPassed(event.time))
        .map(event => event._id);
      setPassedEvents(passedEventIds as string[]);
      requestAnimationFrame(handleTimeChange);
    };

    const requestId = requestAnimationFrame(handleTimeChange);

    return () => cancelAnimationFrame(requestId);
  }, [events]);

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

  const getLineClassName = (eventTime: string) => {
    return isEventPassed(eventTime) ? 'line-below' : 'line-above';
  };

  const deleteEvent = async (id: string) => {
    const data = await EventService.deleteEvent(id);

    if(data) {
      setEvents(data?.data.events)
    }
  }

  const changeEvent = async (event: IEvent) => {
    setEventToChange(event);
    console.log(event);
    setIsChangeEventModalOpen(true);
  }

  const getAllEvents = async () => {
    const userDto = await UserService.getDto();
    setEvents(userDto?.data.events || [])
  }

  const duplicateEvent = async (event: IEvent) => {
    const userDto = await userService.getDto();
    await EventService.addEvent({...event}, userDto?.data.user.id);
    await getAllEvents();
  }

  return (
    selectedDate &&
    <Fragment>
        <div className="mt-4">
          {!filteredEvents.length &&
              <h3 className='bg-gray-200 py-[5px] px-[10px] rounded-md'>
                  You have no events for {selectedDate.toDateString()}
              </h3>
          }
            <ul className='max-w-[290px] flex flex-col mt-2 gap-2'>
              {filteredEvents.map((event: IEvent) => (
                <li
                  className={`p-[5px] bg-gray-200 rounded-md gap-2 items-center flex justify-between ${getLineClassName(event.time)} ${passedEvents.includes(event._id as string) ? 'event-passed' : ''}`}
                  key={event._id}>
                  <div>
                    <strong className='break-words'>{event.title}</strong> - {event.time}
                    <p className='break-words'>{event.description}</p>
                  </div>
                  <div className='flex gap-1'>
                    <button className='bg-blue-500 hover:bg-blue-400 transition-all text-white rounded-md py-1 px-[5px]'
                            onClick={() => changeEvent(event)}><FaPen className='w-[15px]'/></button>
                    <button
                      className='bg-green-500 hover:bg-green-400 transition-all text-white rounded-md py-1 px-[5px]'
                      onClick={() => duplicateEvent(event)}><HiDocumentDuplicate className='w-[15px]'/></button>
                    <button className='bg-red-500 ml-1 hover:bg-red-400 transition-all text-white rounded-md py-1 px-[5px]'
                            onClick={() => deleteEvent(event._id as string)}><MdDelete className='w-[15px]'/></button>
                  </div>
                </li>
              ))}
            </ul>
        </div>
      {isChangeEventModalOpen && <ChangeEventModal eventToChange={eventToChange} setEvents={setEvents}
                                                   setIsChangeEventModalOpen={setIsChangeEventModalOpen}
                                                   isChangeEventModalOpen={isChangeEventModalOpen}/>}
    </Fragment>

  );
};