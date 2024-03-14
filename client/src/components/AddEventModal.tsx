import {FormEvent, useState} from "react";
import {IEvent} from "../models/IEvent";

interface EventFormProps {
  date: string | null | Date;
  onClose: () => void;
  setEvents: (events: IEvent[]) => void;
  events: IEvent[];
}

export const AddEventModal = ({date, onClose, setEvents, events}: EventFormProps) => {
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
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
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