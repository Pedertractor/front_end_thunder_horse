import { useEffect, useState } from 'react';
import InitialGraph from '../components/initalgraph';
import { TypeDevice, TypePerformancePrometeus } from '../types/TypeDevice';
import { getAllDevices, getCycleForDay, getLastWeldBead } from '../api/api';
import { TypeCycleOfPrometeusToDay } from '../types/TypeCycle';
import GraphCycleToDay from '../components/graphCycleToDay';

const Home = () => {
  // const [isInfoDevice, setInfoDevice] = useState<[] | TypeResumeDevice[]>([]);
  const [isIds, setIds] = useState<string>('');
  const [isCycleOfPrometeusToDay, setCycleOfPrometeusToDay] = useState<
    null | TypeCycleOfPrometeusToDay[]
  >(null);
  const [isWelding, setWelding] = useState<TypePerformancePrometeus[] | null>(
    null
  );

  useEffect(() => {
    async function getInfoDevices() {
      const devices: TypeDevice[] = await getAllDevices();

      const ids = devices.map((item) => item.id).join(',');

      setIds(ids);
    }

    getInfoDevices();
  }, []);

  useEffect(() => {
    async function getPerformancePrometeus() {
      const data: TypePerformancePrometeus[] = await getLastWeldBead(isIds);

      setWelding(data);
    }

    const time = setInterval(() => {
      getPerformancePrometeus();
    }, 2000);

    return () => clearInterval(time);
  }, [isIds]);

  useEffect(() => {
    async function getPerformancePrometeus() {
      const cycles = await getCycleForDay(isIds);
      setCycleOfPrometeusToDay(cycles);

      console.log(cycles);
    }

    getPerformancePrometeus();
    const time = setInterval(() => {
      getPerformancePrometeus();
    }, 20000);

    return () => clearInterval(time);
  }, [isIds]);

  //devices error, now i need answer how can i get one informations
  return (
    <main className=' w-full pl-[20%]'>
      <h1 className=' pt-4 pl-8 font-medium'>
        Processo de soldagem atual - {new Date().toLocaleDateString()}
      </h1>
      <section className=' grid grid-cols-3 px-8 py-4 '>
        <section className='  col-span-2 flex flex-col gap-2 py-2'>
          {isWelding
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
