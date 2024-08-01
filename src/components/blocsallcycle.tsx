import { TypeDevicesCycle } from '../types/TypeCycle';
import LevelForEffetiveCapacity from './levelforeffectivecapacity';

const BlocsAllCycle = ({ isAllCycle }: { isAllCycle: TypeDevicesCycle[] }) => {
  return (
    <section className=' w-full rounded shadow flex flex-col justify-center gap-2 p-2 mt-2'>
      <h1 className=' font-bold mb-2'>levantamento total</h1>
      <div className=' grid grid-cols-2 w-full items-center justify-center gap-2  '>
        {isAllCycle.map((item, index) => (
          <div
            key={index}
            className=' w-full items-center justify-center flex flex-col border rounded p-2'
          >
            <p className=' font-bold mb-2'>{item.prometeus}</p>

            {item.weldingCycle[1].map((item, subindex) => (
              <div
                key={subindex}
                className=' flex flex-col items-center justify-center w-full gap-2'
              >
                <div
                  className={`rounded flex gap-2 items-center justify-center`}
                >
                  <p>Capacidade efetiva:</p>
                  <LevelForEffetiveCapacity
                    capacity={item.porcentagemCapacidadeEfetiva}
                  />
                </div>
                <div className=' w-full flex items-center justify-around'>
                  <div className=' rounded flex gap-2 items-center justify-center text-red-600 font-bold'>
                    <p>Tempo parado</p>
                    {item.porcentagemParado}%
                  </div>
                  <div className=' rounded flex gap-2 items-center justify-center text-green-600 font-bold'>
                    <p>Tempo trabalhando</p>
                    {item.porcentagemTrabalhando}%
                  </div>
                </div>

                <div className=' rounded flex gap-2 items-center justify-center'>
                  <p>Quantidade de solda:</p>
                  {item.quantidadeDeSolda} cordões
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlocsAllCycle;
