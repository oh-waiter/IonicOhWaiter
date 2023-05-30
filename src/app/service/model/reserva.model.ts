import { Cardapio } from "./cardapio.model";

export interface Reserva {
  id: number | null;
  codigo: string;
  status: string;
  reservaCardapios: ReservaCardapio[];
  tempoTotalPreparo: number;
  precoTotal: number;
  nomeCliente: string;
  cpf: string;
  dataReserva: string;
}

export interface ReservaCardapio {
  id: number | null;
  cardapio: Cardapio;
  quantidade: number;
}