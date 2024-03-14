import './index.css'
import {router} from "./router/Router.tsx";
import {RouterProvider} from "react-router-dom";
function App() {
  return (
    <div className='max-w-[1200px] mx-auto h-screen p-[15px]'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
