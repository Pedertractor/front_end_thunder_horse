import { TypeResumeDevice } from '../types/TypeDevice';

const ButtonSelectDevices = ({
  setButton,
  setGasPage,
  isAllIdDevices,
  isSelectDevices,
  setSelectDevices,
  isListOfPrometeus,
  setListOfPrometeus,
}: {
  setButton: (isButton: boolean) => void;
  setGasPage: (isGasPage: boolean) => void;
  isListOfPrometeus: boolean;
  setListOfPrometeus: (isListOfPrometeus: boolean) => void;
  isAllIdDevices: TypeResumeDevice[];
  isSelectDevices: string[] | null;
  setSelectDevices: (isSelectDevices: string[]) => void;
}) => {
  const handleCheckBoxChange = (deviceId: string) => {
    if (isSelectDevices) {
      if (isSelectDevices.includes(deviceId)) {
        setSelectDevices(isSelectDevices.filter((id) => id !== deviceId));
      } else {
        setSelectDevices([...isSelectDevices, deviceId]);
      }
    } else {
      setSelectDevices([deviceId]);
    }
  };

  function handleSelectListOfPrometeus() {
    setButton(false);
    setGasPage(false);
    setListOfPrometeus(!isListOfPrometeus);
  }

  return (
    <>
      <button
        onClick={handleSelectListOfPrometeus}
        className={`${
          isListOfPrometeus ? ' bg-zinc-700' : 'bg-[#234476] '
        } p-2 text-white  text-sm rounded flex items-center justify-center gap-2 absolute top-[3%]`}
      >
        selecione os dispositivos
      </button>

      {isAllIdDevices && isListOfPrometeus && (
        <div className=' opacity-0 translate-y-[-10px] animate-animationleft border w-[60%] p-3 rounded bg-slate-50 text-zinc-900 fixed  top-[10%] z-10 flex justify-between'>
          {isAllIdDevices.map((devices) => (
            <label
              key={devices.id}
              className={`${
                isSelectDevices?.includes(devices.id)
                  ? 'bg-zinc-700'
                  : 'bg-[#234476]'
              } flex text-sm items-center gap-1  p-2 rounded text-white`}
            >
              <input
                type='checkbox'
                checked={
                  isSelectDevices ? isSelectDevices.includes(devices.id) : false
                }
                onChange={() => handleCheckBoxChange(devices.id)}
                value={devices.id}
                name=''
                id=''
              />
              {devices.prometeusCode}
            </label>
          ))}
        </div>
      )}
      {}
    </>
  );
};

export default ButtonSelectDevices;
