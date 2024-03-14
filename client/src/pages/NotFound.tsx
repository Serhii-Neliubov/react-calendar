import {Link} from "react-router-dom";

export const NotFound = ({isAuth}: {isAuth: boolean}) => {
  return (
    <div className='flex flex-col gap-4 justify-center items-center h-[100vh]'>
      <h1 className='text-3xl font-bold'>404 | Not Found</h1>
      <Link to={isAuth ? '/' : '/login'}>
        <button className='font-semibold bg-blue-400 rounded-md text-white hover:bg-blue-300 p-[10px] transition-all'>{isAuth ? 'Back to homepage' : 'Back to login page'}</button>
      </Link>
    </div>
  );
}