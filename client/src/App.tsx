import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Home } from './pages/Home.tsx';
import { Register } from './pages/Register.tsx';
import { NotFound } from './pages/NotFound.tsx';
import { Login } from './pages/Login.tsx';
import { Toaster } from 'react-hot-toast';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if(token){
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);

  if(isAuth){
    return (
      <div className='max-w-[1200px] mx-auto p-[15px]'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/*' element={<NotFound isAuth={isAuth}/>} />
          </Routes>
        </BrowserRouter>

        <Toaster
          position="top-center"
          reverseOrder={false}
        />
      </div>
    )
  } else {
    return (
      <div className='max-w-[1200px] mx-auto p-[15px]'>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<Login setIsAuth={setIsAuth}/>} />
            <Route path='/signup' element={<Register />} />
            <Route path='/*' element={<NotFound isAuth={isAuth}/>} />
          </Routes>
        </BrowserRouter>

        <Toaster
          position="top-center"
          reverseOrder={false}
        />
      </div>
    )
  }
}

export default App;
