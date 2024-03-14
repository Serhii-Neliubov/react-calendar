import './index.css'
import {router} from "./router/Router";
import {RouterProvider} from "react-router-dom";
import {Toaster} from "react-hot-toast";
function App() {
  return (
    <div className='max-w-[1200px] mx-auto p-[15px]'>
      <RouterProvider router={router} />

      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  )
}

export default App
