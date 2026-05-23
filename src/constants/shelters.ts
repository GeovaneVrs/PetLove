export type Shelter = {
  id: string;
  name: string;
  address: string;
  neighborhood: string;
  latitude: number;
  longitude: number;
};

/** Abrigos fictícios em Recife — PE (coordenadas aproximadas) */
export const RECIFE_SHELTERS: Shelter[] = [
  {
    id: 's1',
    name: 'Abrigo Amigo de Quatro Patas',
    address: 'Av. Boa Viagem, 1200 — Boa Viagem',
    neighborhood: 'Boa Viagem',
    latitude: -8.1267,
    longitude: -34.901,
  },
  {
    id: 's2',
    name: 'ONG Patinhas de Recife',
    address: 'Rua Prof. Joaquim Cavalcanti, 450 — Casa Forte',
    neighborhood: 'Casa Forte',
    latitude: -8.0133,
    longitude: -34.8417,
  },
  {
    id: 's3',
    name: 'Instituto Vida Animal PE',
    address: 'Av. Conselheiro Rosa e Silva, 800 — Derby',
    neighborhood: 'Derby',
    latitude: -8.0578,
    longitude: -34.8829,
  },
  {
    id: 's4',
    name: 'Lar Temporário Recife Pet',
    address: 'Rua José Bonifácio, 220 — Torre',
    neighborhood: 'Torre',
    latitude: -8.0889,
    longitude: -34.8944,
  },
  {
    id: 's5',
    name: 'Projeto Adote um Amigo',
    address: 'Rua do Príncipe, 310 — Boa Vista',
    neighborhood: 'Boa Vista',
    latitude: -8.0604,
    longitude: -34.8812,
  },
  {
    id: 's6',
    name: 'Casa do Pet Recife',
    address: 'Av. Norte, 2540 — Espinheiro',
    neighborhood: 'Espinheiro',
    latitude: -8.0523,
    longitude: -34.8815,
  },
];

export const RECIFE_CENTER = {
  latitude: -8.0476,
  longitude: -34.877,
};
