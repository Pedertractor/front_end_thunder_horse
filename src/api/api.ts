import { DateRange } from 'react-day-picker';
import {
  TypeCycleOfPrometeusToDay,
  TypeDevicesCycle,
} from '../types/TypeCycle';
import {
  TypeDevice,
  TypePerformancePrometeus,
  TypeResumeDevice,
} from '../types/TypeDevice';

export const url = import.meta.env.VITE_BASE_URL_URL_API;

export async function getAllDevices() {
  const response = await fetch(`${url}/allprocess`);
  const data: TypeDevice[] = await response.json();

  const sortByPrometeus = data.sort((a, b) => {
    const numA = parseInt(a.prometeusCode.replace('prometeus', ''));
    const numB = parseInt(b.prometeusCode.replace('prometeus', ''));

    return numA - numB;
  });
  return sortByPrometeus;
}

export async function getPriceGas(ids: string, from: string, to: string) {
  if (ids) {
    const response = await fetch(`${url}/gasconsumption/${ids}/${from}/${to}`);
    const data = await response.json();
    return data;
  }
}

export async function getCycleForDay() {
  const response = await fetch(`${url}/lastcycle`);
  const data: TypeCycleOfPrometeusToDay[] = await response.json();

  const sortByPrometeus = data.sort((a, b) => {
    const numA = parseInt(a.prometeus.replace('prometeus', ''));
    const numB = parseInt(b.prometeus.replace('prometeus', ''));

    return numA - numB;
  });
  return sortByPrometeus;
}

export async function getLastWeldBead() {
  const response = await fetch(`${url}/lastweldbead`);
  const data: TypePerformancePrometeus[] = await response.json();

  const sortByPrometeus = data.sort((a, b) => {
    const numA = parseInt(a.prometeus.replace('prometeus', ''));
    const numB = parseInt(b.prometeus.replace('prometeus', ''));

    return numA - numB;
  });
  return sortByPrometeus;
}

export async function listDevicesForCheck() {
  const devices = await getAllDevices();

  const arrayWithResumeDevice: TypeResumeDevice[] = [];

  devices.map((device) => {
    arrayWithResumeDevice.push({
      id: device.id,
      prometeusCode: device.prometeusCode,
    });
  });
  console.log(arrayWithResumeDevice);
  return arrayWithResumeDevice;
}

export async function getFullCicly({
  selectedRange,
  isSelectDevices,
  setButton,
  setListOfPrometeus,
}: {
  selectedRange: DateRange | undefined;
  isSelectDevices: string[] | null;
  setButton: (props: boolean) => void;
  setListOfPrometeus: (props: boolean) => void;
}) {
  if (
    selectedRange &&
    selectedRange.from &&
    selectedRange.to &&
    isSelectDevices
  ) {
    setButton(false);
    setListOfPrometeus(false);
    const from = selectedRange.from.toISOString().slice(0, 10);
    const to = selectedRange.to.toISOString().slice(0, 10);
    const result: string = isSelectDevices.join(',');

    const response = await fetch(`${url}/servicecycle/${result}/${from}/${to}`);

    const data: TypeDevicesCycle[] = await response.json();

    return data;
  }
}

// export async function getValuesOfGas(selectedRange) {}
