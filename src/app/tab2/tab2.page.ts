import { Carrinho } from './../service/model/carrinho.model';
import { CarrinhoService } from './../service/carrinho.service';
import { Component, OnInit } from '@angular/core';
import { Cardapio } from '../service/model/cardapio.model';
import { Reserva, ReservaCardapio } from '../service/model/reserva.model';
import { ReservaService } from '../service/reserva.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  minDate: string | null = "";
  reservaStatus = "";
  carrinho: Carrinho = {"cardapios": []}
  reserva: Reserva = {
    id: null,
    codigo: "",
    status: "",
    reservaCardapios: [],
    tempoTotalPreparo: 0,
    precoTotal: 0,
    nomeCliente: "",
    cpf: "",
    dataReserva: this.minDate = new Date().toISOString()
  };

  constructor(private carrinhoService: CarrinhoService, private reservaService: ReservaService) {
  }

  ngOnInit(): void {
    this.carrinho = this.carrinhoService.getCarrinho();
  }

  addQuantidade(cardapio: Cardapio){
    this.carrinhoService.addCarrinho(cardapio);
  }

  removerQuantidade(cardapio: Cardapio){
    this.carrinhoService.removeCarrinho(cardapio);
  }

  ajustarReserva() {
    let tempoTotalPreparo = 0;
    let precoTotal = 0;

    this.carrinho.cardapios.forEach((cardapio) => {
      tempoTotalPreparo += cardapio.tempoDePreparo * cardapio.quantidade;
      precoTotal += cardapio.preco * cardapio.quantidade;
    });

    this.reserva.tempoTotalPreparo = tempoTotalPreparo;
    this.reserva.precoTotal = precoTotal;

    this.reserva.reservaCardapios = this.carrinho.cardapios.map((cardapio) => ({
      id: null,
      reserva: null,
      cardapio: { ...cardapio },
      quantidade: cardapio.quantidade,
    }));

    this.gerarCodigo(this.reserva);
    this.reserva.status = 'RESERVADO';
    this.reservar();
  }

  gerarCodigo(reserva: Reserva) {
    const RE = 'RE';
    const cpfNumeros = reserva.cpf.replace(/\D/g, '');
    const cpfUltimosDigitos = cpfNumeros.slice(-3);
    const numeros = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    const codigo = RE + numeros.toString() + cpfUltimosDigitos;

    reserva.codigo = codigo;
  }

  reservar() {
    try {
      this.reservaService.criarReserva(this.reserva).subscribe(() => {
        this.reservaStatus = 'success';
        this.reserva = {
          id: null,
          codigo: "",
          status: "",
          reservaCardapios: [],
          tempoTotalPreparo: 0,
          precoTotal: 0,
          nomeCliente: "",
          cpf: "",
          dataReserva: this.minDate = new Date().toISOString()
        };
      });
    } catch (error) {
      this.reservaStatus = 'error';
    }
  }
}