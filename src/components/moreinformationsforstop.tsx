import { useQuery } from '@tanstack/react-query';
import { getReasonsStop } from '../api/api';
import { TbClockPause, TbClockPlay } from 'react-icons/tb';

const MoreInformationsForStop = ({
  date,
  namePrometeus,
}: {
  date: string;
  namePrometeus: string;
}) => {
  const { data: isReasonsStop, isLoading: isLoadingReasonsStop } = useQuery({
    queryKey: ['reasonsStop'],
    queryFn: () => getReasonsStop(date, namePrometeus),
  });
  return (
    <div>
      {isLoadingReasonsStop && <div>carregando...</div>}

      <div className=' rounded rounded-l-none w-full flex flex-col items-center justify-center py-2'>
        <h2 className=' text-sm font-medium mb-2'>Motivos das paradas</h2>
        {isReasonsStop
          ? isReasonsStop[0].map((item, index) => (
              <div
                key={index}
                className=' flex flex-col items-start mb-2 p-2 gap-1 rounded border'
              >
                <h3 className=' font-semibold'>{item.motivoParada}</h3>
                <div className='flex items-center gap-2'>
                  <div className=' flex flex-col items-start'>
                    <p className=' text-red-500'>
                      <TbClockPause />
                    </p>
                    <h4 className='text-sm bg-slate-100 p-1'>
                      {new Date(item.dataDaParada).toLocaleTimeString()}
                    </h4>
                  </div>
                  <div className=' flex flex-col gap-1 items-start'>
                    <p className=' text-green-500'>
                      <TbClockPlay />
                    </p>
                    <h4 className='text-sm bg-slate-100 p-1'>
                      {new Date(item.dataDaVolta).toLocaleTimeString()}
                    </h4>
                  </div>
                </div>
              </div>
            ))
          : 'nenhuma informação'}
      </div>
    </div>
  );
};

export default MoreInformationsForStop;
