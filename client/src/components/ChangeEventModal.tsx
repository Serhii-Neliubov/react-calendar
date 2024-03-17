import {FormEvent, useState} from "react";
import {IEvent} from "../models/IEvent";
import UserService from "../services/user.service.ts";
import EventService from "../services/event.service.ts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface EventFormProps {
  setEvents: (events: IEvent[]) => void;
  setIsChangeEventModalOpen: (isEventFormOpen: boolean) => void;
  isChangeEventModalOpen: boolean;
  eventToChange: IEvent | null;
}

export const ChangeEventModal = ({setEvents, setIsChangeEventModalOpen, eventToChange, isChangeEventModalOpen}: EventFormProps) => {
  const [title, setTitle] = useState(eventToChange?.title || '');
  const [time, setTime] = useState(eventToChange?.time || '');
  const [description, setDescription] = useState(eventToChange?.description || '');
  const [selectedDate, setSelectedDate] = useState<Date | null>(eventToChange?.date ? new Date(eventToChange.date) : null);

  const getAllEvents = async () => {
    const userDto = await UserService.getDto();
    setEvents(userDto?.data.events || [])
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const eventData: IEvent = {
      title,
      date: selectedDate?.toISOString() || '',
      time,
      description
    };

    await EventService.changeEvent(eventToChange?._id || '', eventData);
    await getAllEvents();

    setTitle('');
    setTime('');
    setDescription('');
    setSelectedDate(null);

    setIsChangeEventModalOpen(false);
  };

  return (
    isChangeEventModalOpen &&
    <div onClick={() => setIsChangeEventModalOpen(false)} className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
        <div onClick={(event) => event.stopPropagation()} className="bg-white p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Change Event Form</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block font-semibold mb-1">Title</label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border rounded-md p-2" required/>
                </div>
                      <div className="mb-4">
                          <label htmlFor="time" className="block font-semibold mb-1">Time</label>
                          <input type="time" id="time" value={time} onChange={(e) => setTime(e.target.value)} className="border rounded-md p-2" required/>
                      </div>
                      <div className="mb-4">
                          <label htmlFor="date" className="block font-semibold mb-1">Date</label>
                          <DatePicker
                              id="date"
                              selected={selectedDate}
                              onChange={(date: Date | null) => setSelectedDate(date)}
                              className="border rounded-md p-2"
                              dateFormat="yyyy.MM.dd"
                              required
                          />
                      </div>
                      <div className="mb-4">
                          <label htmlFor="description" className="block font-semibold mb-1">Description</label>
                          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border rounded-md p-2 resize-none" required/>
                      </div>
                      <div className="flex justify-end">
                          <button type="submit" className="bg-blue-500 hover:bg-blue-400 transition-all text-white px-4 py-2 rounded-md mr-2">Save</button>
                          <button type="button" onClick={() => setIsChangeEventModalOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-400 transition-all">Cancel</button>
                      </div>
                  </form>
              </div>
          </div>
  );
};

