import $api, {API_URL} from "../assets/http/interceptors.ts";
import toast from "react-hot-toast";

class UserService{
  getDto = async () => {
    try {
      return await $api.get(`${API_URL}/refresh`);
    } catch (error){
      console.error('Error with getting user id:', error);
    }
  }

  deleteEvent = async (eventId: string) => {
    try {
      return await $api.delete(`/events/${eventId}`);
    } catch (error) {
      console.error('Error with deleting event:', error);
    }
  }

  logout = async() => {
    try {
      localStorage.removeItem('token');
      await $api.post(`${API_URL}/logout`);
    } catch (error){
      console.error('Error with logging out:', error);
    }
  }

  login = async(email: FormDataEntryValue | null, password: FormDataEntryValue | null) => {
    try {
      const accessToken = await $api.post('/login', {
        email: email,
        password: password
      });

      localStorage.setItem('token', accessToken.data.token);
      toast.success('Logged in successfully');
      return {status: 'success'};
    } catch (error){
      console.error('Error with logging out:', error);
      return {status: 'error'};
    }
  }

  register = async(email: FormDataEntryValue | null, password: FormDataEntryValue | null) => {
    try {
      await $api.post('/registration', {
        email: email,
        password: password
      });

      toast.success('Registered successfully');
    } catch (error){
      console.error('Error with registering:', error);
    }
  }
}

export default new UserService();