const LoadingCycleToday = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className='gap-3  rounded rounded-l-none w-full flex flex-col items-center justify-center bg-slate-100 p-2'
        >
          <h2 className='h-5 w-full text-sm font-medium  rounded animate-pulse bg-zinc-200 flex items-center text-center gap-1'></h2>
          <div className=' bg-zinc-200 animate-pulse w-[250px] rounded h-[123px]'></div>
          <div className=' bg-zinc-200 animate-pulse w-[80px] rounded h-5'></div>
        </div>
      ))}
    </>
  );
};

export default LoadingCycleToday;
