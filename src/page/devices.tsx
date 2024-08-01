import GridMap from '../components/gripmap';
import StatusDevices from '../components/statusdevices';

function Devices() {
  return (
    <main className=' w-full pl-[20%]'>
      <section className=' w-full  h-screen flex flex-col px-8  py-4 gap-8 '>
        <StatusDevices otherpage={true} />

        <div className=' px-2 py-4 rounded bg-slate-50 border'>
          <p className=' font-bold mb-5'>Localização dos dispositivos</p>
          <GridMap />
        </div>
      </section>
    </main>
  );
}

export default Devices;
