import Calendar from '../components/calendar';
import LineGraphCycle from '../components/linegraphcycle';
import BlocsAllCycle from '../components/blocsallcycle';
import ButtonSelectDevices from '../components/buttonselectdevices';
import GasValues from '../components/gasvalues';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { IoCalendarClearOutline } from 'react-icons/io5';
import { getFullCicly, getValuesOfGas, listDevicesForCheck } from '../api/api';
import { useQuery } from '@tanstack/react-query';
import LoadingBlocAllCycle from '../components/loadingpage/loadingblocallcycle';
import LoadingButtonGas from '../components/loadingpage/loadingbuttongas';

const CiclyOfService = () => {
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(
    undefined
  );

  const [isListOfPrometeus, setListOfPrometeus] = useState<boolean>(false);
  const [isButton, setButton] = useState<boolean>(false);
  const [isSelectDevices, setSelectDevices] = useState<null | string[]>(null);

  const [isGasPage, setGasPage] = useState<boolean>(false);

  const { data: isAllIdDevices } = useQuery({
    queryKey: ['listDevicesForCheck'],
    queryFn: listDevicesForCheck,
  });

  const { data: isDaysCycle, isLoading: isLoadingFullCycle } = useQuery({
    queryKey: ['getFullCycle', selectedRange, isSelectDevices],
    queryFn: () =>
      getFullCicly(
        selectedRange,
        isSelectDevices,
        setButton,
        setListOfPrometeus
      ),
  });

  const { data: isValuesOfGas, isLoading: isLoadingValuesOfGas } = useQuery({
    queryKey: ['valuesOfGas', selectedRange, isSelectDevices],
    queryFn: () => getValuesOfGas(selectedRange, isSelectDevices),
  });

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
          disabled={isLoadingFullCycle}
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
          disabled={isLoadingValuesOfGas}
          className={`${
            isGasPage ? ' bg-zinc-700 ' : 'bg-[#234476]'
          } text-white absolute top-[3%] right-[35%] rounded p-2 text-sm`}
          onClick={handleClickGas}
        >
          {isLoadingValuesOfGas ? <LoadingButtonGas /> : 'Gastos com gás'}
        </button>
        {isGasPage && isValuesOfGas ? (
          <GasValues isValuesOfGas={isValuesOfGas} />
        ) : (
          <div className=' w-full h-screen'>
            {isLoadingFullCycle ? (
              <LoadingBlocAllCycle />
            ) : (
              <>
                {isDaysCycle && isDaysCycle.length > 0 ? (
                  <LineGraphCycle isDaysCycle={isDaysCycle} />
                ) : null}
                {isDaysCycle && isDaysCycle.length > 0 ? (
                  <BlocsAllCycle isAllCycle={isDaysCycle} />
                ) : (
                  <p className=' mt-20'>Ensira as informações</p>
                )}
              </>
            )}
          </div>
        )}
      </section>
    </main>
  );
};

export default CiclyOfService;
