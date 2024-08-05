const LoadingBlocAllCycle = () => {
  return (
    <div className=' w-full h-full flex items-center justify-center space-x-2 overflow-y-hidden'>
      <div className='w-2 h-2 bg-blue-950 rounded-full animate-bounce delay-100'></div>
      <div className='w-2 h-2 bg-blue-950 rounded-full animate-bounce delay-200'></div>
      <div className='w-2 h-2 bg-blue-950 rounded-full animate-bounce delay-300'></div>
    </div>
  );
};

export default LoadingBlocAllCycle;
