import { ptBR } from 'date-fns/locale';
import {
  DayPicker,
  SelectRangeEventHandler,
  DateRange,
  ActiveModifiers,
} from 'react-day-picker';
import 'react-day-picker/dist/style.css';

interface propsSelect {
  selectedRange: DateRange | undefined;
  setSelectedRange: (
    range: DateRange | undefined,
    selectedDay: Date,
    activeModifiers: ActiveModifiers,
    e: React.MouseEvent<Element, MouseEvent>
  ) => void;
}

const Calendar = ({ selectedRange, setSelectedRange }: propsSelect) => {
  const handleSelectRange: SelectRangeEventHandler = (
    range: DateRange | undefined,
    selectedDay: Date,
    activeModifiers: ActiveModifiers,
    e: React.MouseEvent<Element, MouseEvent>
  ) => {
    setSelectedRange(range, selectedDay, activeModifiers, e);
  };

  return (
    <DayPicker
      className=' opacity-0 translate-y-[-10px] animate-animationleft border w-[30%] flex justify-center p-3 rounded bg-slate-50 text-zinc-900 fixed right-10 top-12 z-10'
      showOutsideDays
      locale={ptBR}
      mode='range'
      selected={selectedRange}
      onSelect={handleSelectRange}
    />
  );
};

export default Calendar;
