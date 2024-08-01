import { LiaHorseHeadSolid } from 'react-icons/lia';
import { BiUser } from 'react-icons/bi';
import { GoGear } from 'react-icons/go';
import { IoHomeOutline, IoHardwareChipOutline } from 'react-icons/io5';
import { VscGraph } from 'react-icons/vsc';
import { TbDeviceComputerCamera } from 'react-icons/tb';
import { Link, useLocation } from 'react-router-dom';

const RightMenu = () => {
  const location = useLocation();

  const isActiveLink = (pathname: string) => {
    return pathname === location.pathname;
  };

  return (
    <menu className=' fixed w-[20%] h-full py-4 px-4 flex flex-col items-center justify-between transition opacity-0 translate-x-[-100px] animate-animationleft'>
      <section className='flex flex-col items-center w-full'>
        <div className='flex items-center gap-2 justify-center'>
          <LiaHorseHeadSolid size={30} />
          <h2 className=' text-lg font-bold'>Thunder Horse</h2>
        </div>
      <p className='  text-sm'>
      pedertractor&tractorcomponents
      </p>
      </section>

      <section className=' list-none flex flex-col items-center w-full gap-2 py-1 '>
        <Link
          to={'/'}
          className={`w-full gap-3 flex items-center p-1 font-semibold text-zinc-900 tracking-wide rounded transition hover:bg-slate-200 hover:text-zinc-950 hover:cursor-pointer ${
            isActiveLink('/')
              ? ' border-l-2 border-[#234476] rounded-none hover:rounded bg-slate-200'
              : ''
          }`}
        >
          <span>
            <IoHomeOutline size={20} />
          </span>
          Home
        </Link>
        <Link
          to={'/dispositivos'}
          className={`w-full gap-3 flex items-center p-1 font-semibold text-zinc-900 tracking-wide rounded transition hover:bg-slate-200 hover:text-zinc-950 hover:cursor-pointer ${
            isActiveLink('/dispositivos')
              ? ' border-l-2 border-[#234476] rounded-none hover:rounded bg-slate-200'
              : ''
          }`}
        >
          <span>
            <IoHardwareChipOutline size={20} />
          </span>
          Dispositivos
        </Link>
        <Link
          to={'/ciclodeservico'}
          className={`w-full gap-3 flex items-center p-1 font-semibold text-zinc-900 tracking-wide rounded transition hover:bg-slate-200 hover:text-zinc-950 hover:cursor-pointer ${
            isActiveLink('/ciclodeservico')
              ? ' border-l-2 border-[#234476] rounded-none hover:rounded bg-slate-200'
              : ''
          }`}
        >
          <span>
            <VscGraph size={20} />
          </span>
          Ciclo de serviço
        </Link>
        <Link
          to={'/monitoramento'}
          className={`w-full gap-3 flex items-center p-1 font-semibold text-zinc-900 tracking-wide rounded transition hover:bg-slate-200 hover:text-zinc-950 hover:cursor-pointer ${
            isActiveLink('/monitoramento')
              ? ' border-l-2 border-[#234476] rounded-none hover:rounded bg-slate-200'
              : ''
          }`}
        >
          <span>
            <TbDeviceComputerCamera size={20} />
          </span>
          Monitoramento
        </Link>
      </section>

      <section className=' flex items-center w-full justify-between px-4 py-1'>
        <div className=' rounded-full p-2 text-white bg-[#234476] relative'>
          <BiUser />
          <div className=' w-2 h-2 rounded-full bg-green-500 absolute bottom-0 right-0 animate-pulse'></div>
        </div>
        <div>
          <h3 className=' font-semibold text-sm'>usuário</h3>
          <p className='  text-xs'>ver perfil</p>
        </div>
        <GoGear />
      </section>
    </menu>
  );
};

export default RightMenu;
