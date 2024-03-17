import $api from "../assets/http/interceptors.ts";
import {IEvent} from "../models/IEvent.ts";

class EventService{
  deleteEvent = async (eventId: string) => {
    try {
      return await $api.delete(`/events/${eventId}`);
    } catch (error) {
      console.error('Error with deleting event:', error);
    }
  }

  addEvent = async (eventData: IEvent, userId: string) => {
    try {
      return await $api.post('/events', {eventData, userId});
    } catch (error) {
      console.error('Error with adding event:', error);
    }
  }
}

export default new EventService();