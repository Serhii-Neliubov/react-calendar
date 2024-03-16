import loadingImg from '../assets/images/loading.svg';

export const Loading = () => {
  return (
    <div className='h-screen w-full justify-center items-center flex'>
      <img src={loadingImg} alt="Loading"/>
    </div>
  )
}