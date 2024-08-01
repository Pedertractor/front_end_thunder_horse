import { TypeCycleOfPrometeusToDay } from '../types/TypeCycle';
import { TypeDevice, TypePerformancePrometeus } from '../types/TypeDevice';

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
