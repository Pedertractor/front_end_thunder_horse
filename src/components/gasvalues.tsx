import { Line, LineChart, Tooltip, XAxis } from 'recharts';
import { TypeValuesOfGas } from '../types/TypeValuesOfGas';

const GasValues = ({ isValuesOfGas }: { isValuesOfGas: TypeValuesOfGas[] }) => {
  return (
    <div className=' mt-12  rounded w-full opacity-0 translate-y-[100px] animate-animationleft p-2 flex flex-col gap-5'>
      {isValuesOfGas.map((itens, index) => (
        <div className=''>
          <p>{itens.prometeus}</p>
          <div
            className=' flex flex-col gap-2 items-center bg-slate-50 py-2'
            key={index}
          >
            <h3>valor diário em R$</h3>
            <LineChart
              margin={{
                top: 30,
                bottom: 20,
                right: 35,
                left: 45,
              }}
              width={700}
              height={150}
              data={itens.values}
            >
              <Tooltip />
              <XAxis dataKey={'data'} fontSize={14} />

              <Line
                dataKey={'gastoComGasNoDia'}
                type='monotone'
                label={{ position: 'top' }}
              />
            </LineChart>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GasValues;
