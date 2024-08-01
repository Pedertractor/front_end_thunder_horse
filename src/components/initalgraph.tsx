import { AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { TypePerformancePrometeus } from '../types/TypeDevice';
import { useContext } from 'react';
import { GlobalContext } from '../globalcontext/globalcontext';

const InitialGraph = ({ device }: { device: TypePerformancePrometeus }) => {
  const { isStatusPrometeusGlobal } = useContext(GlobalContext);

  const formatedDate = (date: string) =>
    new Date(date).toLocaleTimeString('pt-br');

  return (
    <div className=' rounded rounded-r-none w-full flex flex-col items-center justify-center bg-slate-100 p-2'>
      <h2 className=' text-sm font-medium'>
        Ultimo cordão de solda executado - {device.prometeus}
      </h2>
      <AreaChart
        margin={{
          top: 30,
          bottom: 20,
        }}
        data={device.lastWelding}
        width={600}
        height={150}
      >
        <YAxis dataKey={'amperagem'} fontSize={12} />
        <XAxis dataKey={'createdAt'} tickFormatter={formatedDate} />

        <Area dataKey='amperagem' type='monotone' />
        <Tooltip />
      </AreaChart>
      {isStatusPrometeusGlobal ? (
        <div className=' text-xs font-bold'>
          {isStatusPrometeusGlobal.map((de, index) => (
            <div className='flex items-center gap-1' key={index}>
              {de.prometeus === device.prometeus ? (
                <p className=' flex items-center gap-1'>
                  <span
                    className={` w-2 h-2  rounded-full ${
                      de.status === 'funcionando'
                        ? ' bg-green-600 animate-pulse'
                        : 'bg-red-600'
                    }`}
                  ></span>
                  {de.status}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      ) : (
        <p className=' text-xs font-bold'></p>
      )}
    </div>
  );
};

export default InitialGraph;
