import { Carrinho } from './../service/model/carrinho.model';
import { CarrinhoService } from './../service/carrinho.service';
import { Component, OnInit } from '@angular/core';
import { Cardapio } from '../service/model/cardapio.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  carrinho: Carrinho = {"cardapios": []}
  mostrarBotao = false;

  constructor(private carrinhoService: CarrinhoService) {}

  ngOnInit(): void {
    this.carrinho = this.carrinhoService.getCarrinho();
  }

  addQuantidade(cardapio: Cardapio){
    this.carrinhoService.addCarrinho(cardapio);
  }

  removerQuantidade(cardapio: Cardapio){
    this.carrinhoService.removeCarrinho(cardapio);
  }

  reservar(){
    
  }

}
