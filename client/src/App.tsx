import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Register } from './pages/Register.tsx';
import { NotFound } from './pages/NotFound.tsx';
import { Login } from './pages/Login.tsx';
import { Toaster } from 'react-hot-toast';
import $api, {API_URL} from "./assets/http/interceptors.ts";
import { Home } from "./pages/Home.tsx";

function App() {
  const [isAuth, setIsAuth] = useState(false);


  const checkAuth = async () => {
    try {
      const response = await $api.get(`${API_URL}/refresh`);

      localStorage.setItem('token', response.data.accessToken);

      const token = localStorage.getItem('token');

      if(token){
        setIsAuth(true);
      }
    } catch (error) {
      console.error('Error with updating token:', error);
      setIsAuth(false);
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className='max-w-[1200px] mx-auto p-[15px]'>
      <BrowserRouter>
        {isAuth ?
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/*' element={<NotFound isAuth={isAuth}/>}/>
            </Routes> :
            <Routes>
              <Route path='/login' element={<Login setIsAuth={setIsAuth}/>}/>
              <Route path='/signup' element={<Register/>}/>
              <Route path='/*' element={<NotFound isAuth={isAuth}/>}/>
            </Routes>
        }
      </BrowserRouter>

      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  )
}

export default App;
