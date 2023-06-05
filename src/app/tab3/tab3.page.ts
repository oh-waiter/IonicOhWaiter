import { Component } from '@angular/core';
import { Reserva, ReservaCardapio } from '../service/model/reserva.model';
import { ReservaService } from '../service/reserva.service';
import { ToastController } from '@ionic/angular';

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
    email: "",
    cpf: "",
    dataReserva: ""
  };
  reservaEncontrada = false;
  error = false;
  mensagemErro = "";

  constructor(private reservaService: ReservaService,
              private toastController: ToastController) { }

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
            this.EnviarMensagem("Não foi possível trazer a reserva, verifique se o código está correto.", "error")
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
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();
    const horas = data.getHours().toString().padStart(2, '0');
    const minutos = data.getMinutes().toString().padStart(2, '0');
    return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
  }

  async EnviarMensagem(mensagem: string, status: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000, // Duração em milissegundos
      position: 'top', // Posição da snackbar na tela ('top', 'bottom' ou 'middle')
      cssClass: status // Usando o status como a classe CSS personalizada
    });
    toast.present();
  }
}