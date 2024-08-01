import InitialGraph from '../components/initalgraph';
import { getCycleForDay, getLastWeldBead } from '../api/api';
import GraphCycleToDay from '../components/graphCycleToDay';
import { useQuery } from '@tanstack/react-query';
import LoadingLastWelding from '../components/loadingpage/loadinglastwelding';

const Home = () => {
  const {
    data: isCycleOfPrometeusToDay,
    isLoading: isLoadingCycleOfPrometeus,
    // error: errorCycleOfPrometeus,
  } = useQuery({
    queryKey: ['cycleOfPrometeus'],
    queryFn: getCycleForDay,
    refetchInterval: 10000,
  });

  const {
    data: isWelding,
    isLoading: isLoadingWeldBead,
    // error: errorWeldBead,
  } = useQuery({
    queryKey: ['weldBead'],
    queryFn: getLastWeldBead,
    refetchInterval: 2000,
  });

  return (
    <main className=' w-full pl-[20%]'>
      <h1 className=' pt-4 pl-8 font-medium'>
        Processo de soldagem atual - {new Date().toLocaleDateString()}
      </h1>
      <section className=' grid grid-cols-3 px-8 py-4 '>
        <section className='  col-span-2 flex flex-col gap-2 py-2'>
          {isLoadingWeldBead ? <LoadingLastWelding /> : null}
          {isWelding && !isLoadingWeldBead
            ? isWelding.map((device, index) => (
                <InitialGraph device={device} key={index} />
              ))
            : null}
        </section>
        <section className='  flex flex-col gap-2 py-2'>
          {isCycleOfPrometeusToDay
            ? isCycleOfPrometeusToDay.map((device, index) => (
                <GraphCycleToDay isCycleOfPrometeusToDay={device} key={index} />
              ))
            : null}
        </section>
      </section>
    </main>
  );
};

export default Home;
