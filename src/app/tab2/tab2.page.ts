import { Carrinho } from './../service/model/carrinho.model';
import { CarrinhoService } from './../service/carrinho.service';
import { Component, OnInit } from '@angular/core';
import { Cardapio } from '../service/model/cardapio.model';
import { Reserva } from '../service/model/reserva.model';
import { ReservaService } from '../service/reserva.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { cpf } from 'cpf-cnpj-validator';

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
    email: "",
    cpf: "",
    dataReserva: this.minDate = new Date().toISOString()
  };
  reservaCodigo = "";
  showSuccessToast = false;

  constructor(private carrinhoService: CarrinhoService, 
              private reservaService: ReservaService,
              private router: Router,
              private toastController: ToastController) {
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
    if (!cpf.isValid(this.reserva.cpf)) {
      this.EnviarMensagem("CPF inválido, coloque no padrão ou verifique os números", 'error');
      return; // Abortar a função se o CPF for inválido
    }

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
      this.reservaService.criarReserva(this.reserva).subscribe((reservaApi) => {
        this.reservaStatus = 'success';
        this.reserva = {
          id: null,
          codigo: "",
          status: "",
          reservaCardapios: [],
          tempoTotalPreparo: 0,
          precoTotal: 0,
          nomeCliente: "",
          email: "",
          cpf: "",
          dataReserva: this.minDate = new Date().toISOString()
        };
        this.reservaCodigo = reservaApi.codigo;
        this.EnviarMensagem(`Reserva efetuada com sucesso código da reserva é: ${this.reservaCodigo} também enviamos via email`, 'success');
        this.router.navigate(['/cardapio']);
        
      });
    } catch (error) {
      this.EnviarMensagem("Ocorreu um erro ao tentar criar a reserva.", 'error'); // Passando 'error' como segundo parâmetro
      this.reservaStatus = 'error';
    }
  }

  async EnviarMensagem(mensagem: string, status: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 20000, // Duração em milissegundos
      position: 'top', // Posição da snackbar na tela ('top', 'bottom' ou 'middle')
      cssClass: status === 'success' ? 'toast-success' : 'toast-error' // Usando o status como a classe CSS personalizada
    });
    toast.present();
  }
  
}