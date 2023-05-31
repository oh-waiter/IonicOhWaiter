import { Component } from '@angular/core';
import { Reserva, ReservaCardapio } from '../service/model/reserva.model';
import { ReservaService } from '../service/reserva.service';
import { Cardapio } from '../service/model/cardapio.model';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  reserva: Reserva = {
    id: null,
    codigo: "",
    status: "",
    reservaCardapios: [],
    tempoTotalPreparo: 0,
    precoTotal: 0,
    nomeCliente: "",
    cpf: "",
    dataReserva: ""
  };
  reservaEncontrada = false;
  error = false;
  mensagemErro = "";

  constructor(private reservaService: ReservaService) { }

  buscarReserva() {
    if (this.reserva.codigo) {
      this.reservaService.obterReservaPorCodigo(this.reserva.codigo)
        .subscribe(
          reserva => {
            this.reserva = reserva;
            this.reservaEncontrada = true;
          },
          error => {
            this.reservaEncontrada = false;
            this.error = true;
            this.mensagemErro = error;
          }
        );
    } else {
      this.reservaEncontrada = false;
    }
  }

  calcularPrecoTotal(cardapio: ReservaCardapio): number {
    return cardapio.cardapio.preco * cardapio.quantidade;
  }

  formatarData(dataReserva: string): string {
    const data = new Date(dataReserva);
    const dia = data.getDate();
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }
}