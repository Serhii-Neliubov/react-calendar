import $api, {API_URL} from "../assets/http/interceptors.ts";
import toast from "react-hot-toast";
class UserService{
  logout = async() => {
    try {
      localStorage.removeItem('token');

      await $api.post(`${API_URL}/logout`);

      window.location.reload();
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
    } catch (error){
      console.error('Error with logging out:', error);
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