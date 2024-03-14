import './index.css'
import { router } from "./router/Router";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import React from 'react';

function App() {
  return (
    <React.Fragment>
      <div className='max-w-[1200px] mx-auto p-[15px]'>
        <RouterProvider router={router}/>
      </div>

      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </React.Fragment>
  )
}

export default App
