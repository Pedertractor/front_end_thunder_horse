const LoadingLastWelding = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className=' rounded rounded-r-none w-full gap-3 flex flex-col items-center justify-center bg-slate-100 p-2'
        >
          <h2 className=' text-sm font-medium  flex items-center text-center gap-1'>
            Ultimo cordão de solda executado
            <span className='h-5 w-[50px] rounded animate-pulse bg-zinc-200'></span>
          </h2>
          <div className=' bg-zinc-200 animate-pulse w-[600px] rounded h-[123px]'></div>
          <div className=' bg-zinc-200 animate-pulse w-[80px] rounded h-5'></div>
        </div>
      ))}
    </>
  );
};

export default LoadingLastWelding;
