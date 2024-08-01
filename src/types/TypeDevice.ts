export interface TypeDevice {
  cartao: number;
  createdAt: Date;
  diametroArame: string;
  gas: string;
  id: string;
  prometeusCode: string;
  setor: number;
  soldador: string;
  vazaoDoGas: string;
  velocidadeArame: string;
  localizationRow: number;
  localizationCol: number;
}

export interface TypeResumeDevice {
  prometeusCode: string;
  id: string;
  setor?: number;
}

export interface TypePerformancePrometeus {
  prometeus: string;
  lastWelding: {
    amperagem: number;
    capture: string;
    createdAt: Date | string;
    id: string;
    weldingId: string;
  }[];
}
