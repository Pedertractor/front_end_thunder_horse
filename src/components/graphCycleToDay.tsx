import { Bar, BarChart, Rectangle, Tooltip } from 'recharts';
import { TypeCycleOfPrometeusToDay } from '../types/TypeCycle';

const GraphCycleToDay = ({
  isCycleOfPrometeusToDay,
}: {
  isCycleOfPrometeusToDay: TypeCycleOfPrometeusToDay;
}) => {
  return (
    <div className=' rounded rounded-l-none w-full flex flex-col items-center justify-center bg-slate-100 p-2'>
      <h2 className=' text-sm font-medium'>
        funcionando/parado x capacidade efetiva (%)
      </h2>

      <BarChart
        data={isCycleOfPrometeusToDay.cycles}
        barSize={40}
        width={250}
        height={150}
        margin={{
          top: 30,
          bottom: 20,
        }}
      >
        <Tooltip />
        <Bar
          dataKey={'porcentagemTrabalhando'}
          fill='#0a881d'
          activeBar={<Rectangle fill='pink' stroke='blue' />}
          label={{ position: 'top' }}
        />

        <Bar
          dataKey={'porcentagemParado'}
          fill='#880a0a'
          activeBar={<Rectangle fill='pink' stroke='blue' />}
          label={{ position: 'top' }}
        />
        <Bar
          dataKey={'porcentagemCapacidadeEfetiva'}
          fill='#0a3088'
          label={{ position: 'top' }}
          activeBar={<Rectangle fill='pink' stroke='blue' />}
        />
      </BarChart>
      <p className=' text-xs font-bold'>{isCycleOfPrometeusToDay.prometeus}</p>
    </div>
  );
};

export default GraphCycleToDay;
