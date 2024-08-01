export const url = import.meta.env.VITE_BASE_URL_URL_API;

export async function getAllDevices() {
  const url: string = import.meta.env.VITE_BASE_URL_URL_API;
  const response = await fetch(`${url}/allprocess`);
  const data = await response.json();

  return data;
}

export async function getPriceGas(ids: string, from: string, to: string) {
  if (ids) {
    const response = await fetch(`${url}/gasconsumption/${ids}/${from}/${to}`);
    const data = await response.json();
    return data;
  }
}

export async function getCycleForDay(ids: string) {
  if (ids) {
    const response = await fetch(`${url}/lastcycle/${ids}`);
    const data = await response.json();
    return data;
  }
}

export async function getLastWeldBead(ids: string) {
  const url: string = import.meta.env.VITE_BASE_URL_URL_API;
  if (ids) {
    const response = await fetch(`${url}/lastweldbead/${ids}`);
    const data = await response.json();
    return data;
  }
}

export async function teste() {}
