export interface TypeDayCycle {
  data: string;
  porcentagemCapacidadeEfetiva: number;
  porcentagemParado: number;
  porcentagemTrabalhando: number;
  quantidadeDeCordoesDeSolda: number;
  tempoParado: number;
  tempoTrabalhado: number;
}

export interface TypeCycleOfPrometeusToDay {
  prometeus: string;
  cycles: TypeDayCycle[];
}

export interface TypeAllCycle {
  porcentagemCapacidadeEfetiva: number;
  porcentagemParado: number;
  porcentagemTrabalhando: number;
  quantidadeDeSolda: number;
  tempoParado: number;
  tempoTrabalhado: number;
}

export interface TypeDevicesCycle {
  prometeus: string;
  weldingCycle: {
    0: TypeDayCycle[];
    1: TypeAllCycle[];
  };
}

export interface DeviceCycle {
  prometeus: string;
  data: string;
  porcentagemCapacidadeEfetiva: number; // ajuste os tipos conforme necessário
  porcentagemParado: number;
  porcentagemTrabalhando: number;
  quantidadeDeCordoesDeSolda: number;
  tempoParado: number;
  tempoTrabalhado: number;
}

export type TypeOrganization = {
  porcentagemTrabalhado: {
    data: string;
    [key: string]: string | number;
  }[];
  porcentagemParado: {
    data: string;
    [key: string]: string | number;
  }[];
};
