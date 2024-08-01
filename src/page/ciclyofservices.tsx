import Calendar from '../components/calendar';
import LineGraphCycle from '../components/linegraphcycle';
import BlocsAllCycle from '../components/blocsallcycle';
import ButtonSelectDevices from '../components/buttonselectdevices';
import GasValues from '../components/gasvalues';

import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { IoCalendarClearOutline } from 'react-icons/io5';
import { getFullCicly, getPriceGas, listDevicesForCheck } from '../api/api';
import { TypeValuesOfGas } from '../types/TypeValuesOfGas';
import { useQuery } from '@tanstack/react-query';

const CiclyOfService = () => {
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(
    undefined
  );

  const [isListOfPrometeus, setListOfPrometeus] = useState<boolean>(false);
  const [isButton, setButton] = useState<boolean>(false);
  const [isSelectDevices, setSelectDevices] = useState<null | string[]>(null);

  const [isGasPage, setGasPage] = useState<boolean>(false);
  const [isValuesOfGas, setValuesOfGas] = useState<null | TypeValuesOfGas[]>(
    null
  );

  const { data: isAllIdDevices, isLoading: isLoadingAllIdDevices } = useQuery({
    queryKey: ['listDevicesForCheck'],
    queryFn: listDevicesForCheck,
  });

  const { data: isDaysCycle, isLoading: isLoadingFullCycle } = useQuery({
    queryKey: ['getFullCycle'],
    queryFn: () => {
      if (selectedRange && isSelectDevices) {
        getFullCicly({
          selectedRange,
          isSelectDevices,
          setButton,
          setListOfPrometeus,
        });
      }
    },
  });

  useEffect(() => {
    async function getValuesOfGas() {
      if (
        selectedRange &&
        selectedRange.from &&
        selectedRange.to &&
        isSelectDevices
      ) {
        const from = selectedRange.from.toISOString().slice(0, 10);
        const to = selectedRange.to.toISOString().slice(0, 10);
        const ids = isSelectDevices.join(',');

        const valuesGas: TypeValuesOfGas[] = await getPriceGas(ids, from, to);

        valuesGas.forEach((item) => item.values.reverse());
        valuesGas.map((item) =>
          item.values.map(
            (value) =>
              (value.data = new Date(value.data).toISOString().slice(0, 10))
          )
        );
        setValuesOfGas(valuesGas);
        console.log(valuesGas);
      }
    }

    getValuesOfGas();
  }, [isSelectDevices, selectedRange]);

  async function handleClickGas() {
    setButton(false);
    setListOfPrometeus(false);
    setGasPage(!isGasPage);
  }

  function handleSelectDate() {
    setButton(!isButton);
    setGasPage(false);
    setListOfPrometeus(false);
  }

  return (
    <main className=' w-full pl-[20%]'>
      <section className=' w-full  h-screen flex flex-col px-8 py-4 gap-2'>
        {isAllIdDevices && (
          <ButtonSelectDevices
            setButton={setButton}
            setGasPage={setGasPage}
            isListOfPrometeus={isListOfPrometeus}
            setListOfPrometeus={setListOfPrometeus}
            isAllIdDevices={isAllIdDevices}
            isSelectDevices={isSelectDevices}
            setSelectDevices={setSelectDevices}
          />
        )}

        <button
          onClick={handleSelectDate}
          className={` ${
            isButton ? ' bg-zinc-700' : 'bg-[#234476]'
          } w-40 p-2 text-white text-sm rounded flex items-center justify-center gap-2 absolute top-[3%] right-14`}
        >
          {isButton ? (
            <p className=' w-40 flex items-center justify-center rounded opacity-0 translate-x-[-10px] animate-animationleft'>
              fechar
            </p>
          ) : (
            <>
              <IoCalendarClearOutline size={18} />
              selecione a data
            </>
          )}
        </button>
        {isButton ? (
          <Calendar
            selectedRange={selectedRange}
            setSelectedRange={setSelectedRange}
          />
        ) : null}
        <button
          className={`${
            isGasPage ? ' bg-zinc-700 ' : 'bg-[#234476]'
          } text-white absolute top-[3%] right-[35%] rounded p-2 text-sm`}
          onClick={handleClickGas}
        >
          Gastos com gás
        </button>
        {isGasPage && isValuesOfGas ? (
          <GasValues isValuesOfGas={isValuesOfGas} />
        ) : (
          <div>
            {isDaysCycle ? <LineGraphCycle isDaysCycle={isDaysCycle} /> : null}
            {isDaysCycle ? (
              <BlocsAllCycle isAllCycle={isDaysCycle} />
            ) : (
              <p className=' mt-20'>Ensira as informações</p>
            )}
          </div>
        )}
      </section>
    </main>
  );
};

export default CiclyOfService;
