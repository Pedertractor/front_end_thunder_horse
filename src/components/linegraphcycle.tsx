import {
  XAxis,
  Tooltip,
  BarChart,
  Bar,
  Rectangle,
  Legend,
  ComposedChart,
} from 'recharts';
import {
  DeviceCycle,
  TypeDevicesCycle,
  TypeOrganization,
} from '../types/TypeCycle';
import { useEffect, useState } from 'react';
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md';
import LevelForEffetiveCapacity from './levelforeffectivecapacity';

interface Props {
  isDaysCycle: TypeDevicesCycle[];
}

const LineGraphCycle = ({ isDaysCycle }: Props) => {
  const [isLittleList, setLittleList] = useState<boolean>(false);
  const [isDataForGraph, setDataForGraph] = useState<TypeOrganization>();
  const [openLists, setOpenLists] = useState<boolean[]>(
    new Array(isDaysCycle.length).fill(false)
  );

  useEffect(() => {
    const organizationDatas: TypeOrganization = {
      porcentagemTrabalhado: [],
      porcentagemParado: [],
    };

    const forLine: DeviceCycle[] = [];
    if (isDaysCycle) {
      isDaysCycle.forEach((item) => {
        item.weldingCycle[0].map((cycle) => {
          forLine.push({
            prometeus: item.prometeus,
            data: cycle.data,
            porcentagemCapacidadeEfetiva: cycle.porcentagemCapacidadeEfetiva,
            porcentagemParado: cycle.porcentagemParado,
            porcentagemTrabalhando: cycle.porcentagemTrabalhando,
            quantidadeDeCordoesDeSolda: cycle.quantidadeDeCordoesDeSolda,
            tempoParado: cycle.tempoParado,
            tempoTrabalhado: cycle.tempoTrabalhado,
          });
        });
      });
    }
    console.log(isDaysCycle);

    forLine.forEach((item) => {
      let foundTrabalhado = organizationDatas.porcentagemTrabalhado.find(
        (data) => data.data === item.data
      );
      let foundParado = organizationDatas.porcentagemParado.find(
        (data) => data.data === item.data
      );

      if (!foundTrabalhado) {
        foundTrabalhado = {
          data: item.data,
        };
        organizationDatas.porcentagemTrabalhado.push(foundTrabalhado);
      }

      if (!foundParado) {
        foundParado = {
          data: item.data,
        };
        organizationDatas.porcentagemParado.push(foundParado);
      }

      foundTrabalhado[item.prometeus] = item.porcentagemTrabalhando;
      foundParado[item.prometeus] = item.porcentagemParado;
    });

    console.log(organizationDatas);
    setDataForGraph(organizationDatas);
  }, [isDaysCycle]);

  const toggleList = (index: number) => {
    const updatedOpenLists = [...openLists];
    updatedOpenLists[index] = !updatedOpenLists[index];
    setOpenLists(updatedOpenLists);
  };

  return (
    <section className=' w-full rounded  shadow flex flex-col justify-center gap-2 items-start p-2 mt-16'>
      <h2 className=' font-bold mb-5'>Ciclo de serviço diário</h2>
      <div className=' w-full flex flex-col gap-2'>
        {isDaysCycle.map((cycles, index) => (
          <div className='' key={index}>
            <button
              onClick={() => toggleList(index)}
              className={` py-1 w-1/4 shadow flex rounded items-center justify-around gap-10 transition ${
                openLists[index]
                  ? 'bg-slate-400 shadow-none text-white'
                  : 'ease-out'
              }`}
            >
              {cycles.prometeus}
              {openLists[index] ? (
                <MdOutlineKeyboardArrowDown />
              ) : (
                <MdOutlineKeyboardArrowRight />
              )}
            </button>
            {openLists[index] && (
              <div
                className={`grid grid-cols-3 p-2 items-center justify-between transition gap-2 ${
                  openLists[index]
                    ? 'opacity-0 translate-y-[-10px] animate-animationleft'
                    : ''
                }`}
              >
                {cycles.weldingCycle[0].map((item, subindex) => (
                  <div
                    key={subindex}
                    className='p-2 rounded border flex flex-col gap-4 items-center justify-center text-center'
                  >
                    <div className=' w-full '>
                      <p className='text-sm flex items-center gap-1 justify-center'>
                        Data:
                        <span>
                          {new Date(item.data).toISOString().slice(0, 10)}
                        </span>
                      </p>
                    </div>
                    <div className=' w-full flex items-center justify-around'>
                      <p className='text-sm flex  flex-col items-center gap-1 justify-center text-red-600'>
                        Parado
                        <span className=' font-bold'>
                          {item.porcentagemParado} %
                        </span>
                      </p>

                      <p className='text-sm flex flex-col items-center gap-1 justify-center text-green-600'>
                        Trabalhando
                        <span className=' font-bold'>
                          {item.porcentagemTrabalhando} %
                        </span>
                      </p>
                    </div>
                    <div className=' flex flex-col items-center gap-1 justify-center'>
                      Capacidade efetiva
                      <LevelForEffetiveCapacity
                        capacity={item.porcentagemCapacidadeEfetiva}
                      />
                    </div>

                    <button
                      className=' bg-slate-400 p-1 font-bold w-full text-sm rounded'
                      onClick={() => setLittleList(!isLittleList)}
                    >
                      mais informações
                    </button>
                    {isLittleList && (
                      <>
                        <div className=' w-full flex items-center justify-between'>
                          <p className='text-sm flex  flex-col items-center gap-1 justify-center'>
                            tempo parado
                            <span> {item.tempoParado} sec</span>
                          </p>

                          <p className='text-sm flex flex-col items-center gap-1 justify-center'>
                            Trabalhando
                            <span> {item.tempoTrabalhado} sec</span>
                          </p>
                        </div>
                        <p className='text-sm'>Quantidade de soldas</p>
                        {item.quantidadeDeCordoesDeSolda} cordões
                      </>
                    )}
                  </div>
                ))}
                <div className=' col-span-3 w-full bg-slate-50 rounded border flex flex-col justify-center items-center p-2'>
                  <h2>trabalhado x parado (%) </h2>
                  <ComposedChart
                    margin={{
                      top: 20,
                      right: 20,
                      bottom: 20,
                      left: 20,
                    }}
                    data={cycles.weldingCycle[0]}
                    width={800}
                    height={300}
                    barSize={30}
                  >
                    <XAxis dataKey='data' />
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
                      fill='#0a3888'
                      activeBar={<Rectangle fill='pink' stroke='blue' />}
                      label={{ position: 'top' }}
                    />
                  </ComposedChart>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <h2 className=' font-bold mb-2 mt-5'>
        Porcentagem diária - tempo trabalhando - (8h: 56min)
      </h2>
      <div className='w-full bg-slate-50 rounded border flex flex-col items-center justify-center p-4'>
        {isDataForGraph ? (
          <BarChart
            data={isDataForGraph.porcentagemTrabalhado}
            width={970}
            height={200}
            margin={{
              top: 20,
            }}
          >
            <XAxis dataKey='data' />
            <Legend />

            <Tooltip />
            <Bar
              dataKey={'prometeus01'}
              fill='#0a881d'
              activeBar={<Rectangle fill='pink' stroke='blue' />}
              label={{ position: 'top' }}
            />
            <Bar
              dataKey={'prometeus02'}
              fill='#38c515'
              activeBar={<Rectangle fill='pink' stroke='blue' />}
              label={{ position: 'top' }}
            />
            <Bar
              dataKey={'prometeus03'}
              fill='#053e04'
              activeBar={<Rectangle fill='pink' stroke='blue' />}
              label={{ position: 'top' }}
            />
            <Bar
              dataKey={'prometeus04'}
              fill='#0a881d'
              activeBar={<Rectangle fill='pink' stroke='blue' />}
              label={{ position: 'top' }}
            />
            <Bar
              dataKey={'prometeus05'}
              fill='#053e04'
              activeBar={<Rectangle fill='pink' stroke='blue' />}
              label={{ position: 'top' }}
            />
          </BarChart>
        ) : null}
      </div>
    </section>
  );
};

export default LineGraphCycle;
