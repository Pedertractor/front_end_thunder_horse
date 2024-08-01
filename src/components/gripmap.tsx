import { useContext, useEffect, useState } from 'react';
import { getAllDevices } from '../api/api';
import { TypeDevice } from '../types/TypeDevice';
import { IoLocationSharp } from 'react-icons/io5';
import { GlobalContext } from '../globalcontext/globalcontext';

interface TypeLocalization {
  row: number;
  col: number;
  prometeus: string;
  setor: number;
  status: string;
}
const GridMap = () => {
  const [isLocalization, setLocalization] = useState<TypeLocalization[] | []>(
    []
  );
  const [hoveredLocalization, setHoveredLocalization] =
    useState<TypeLocalization | null>(null);

  const { isStatusPrometeusGlobal } = useContext(GlobalContext);

  useEffect(() => {
    async function getDatas() {
      const datas: TypeDevice[] = await getAllDevices();
      const localization = datas.map((item) => ({
        prometeus: item.prometeusCode,
        setor: item.setor,
        col: item.localizationCol,
        row: item.localizationRow,
        status: 'parado',
      }));

      if (isStatusPrometeusGlobal) {
        localization.forEach((loc) => {
          const foundStatus = isStatusPrometeusGlobal.find(
            (s) => s.prometeus === loc.prometeus
          );
          if (foundStatus) loc.status = foundStatus.status;
        });
      }

      setLocalization(localization);
      console.log(localization);
    }

    getDatas();
  }, [isStatusPrometeusGlobal]);

  const gridSize = 23;
  const cells = [];

  for (let row = 1; row < gridSize; row++) {
    for (let col = 1; col < gridSize; col++) {
      const cellKey = `${row}-${col}`;
      const isLocalized = isLocalization.find(
        (item) => item.col === col && item.row === row
      );
      cells.push(
        <button
          key={cellKey}
          onMouseEnter={() => {
            if (isLocalized) {
              setHoveredLocalization(isLocalized);
            }
          }}
          onMouseLeave={() => {
            setHoveredLocalization(null);
          }}
          className=' flex justify-center items-center z-10 relative '
        >
          {isLocalized ? (
            <>
              <IoLocationSharp
                className={`absolute bottom-2 right-1 hover:animate-none ${
                  isLocalized.status === 'funcionando'
                    ? 'text-green-800 hover:text-green-400 animate-bounce'
                    : 'text-red-700 hover:text-red-400'
                }`}
                size={25}
              />
              {hoveredLocalization === isLocalized && (
                <div className=' flex flex-col items-start absolute bg-white p-2 rounded-lg shadow-md border border-gray-200 bottom-9 left-0'>
                  <p className=' font-bold'>{hoveredLocalization.prometeus}</p>
                  <p>Setor: {hoveredLocalization.setor}</p>
                  <p>Coluna: {hoveredLocalization.col}</p>
                  <p>Linha: {hoveredLocalization.row}</p>
                </div>
              )}
            </>
          ) : (
            '.'
          )}
        </button>
      );
    }
  }

  return (
    <section className=' grid grid-cols-30 grid-rows-20 gap-1 relative opacity-0 translate-x-[20px] animate-animationleft border rounded bg-slate-50'>
      <img
        src='/planta-empresa.png'
        alt='planta baixa'
        className=' absolute z-0 w-full h-full'
      />
      {cells}
    </section>
  );
};

export default GridMap;
