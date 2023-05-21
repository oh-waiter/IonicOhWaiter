import { Alimento } from './../service/model/alimento.model';
import { Carrinho } from './../service/model/carrinho.model';
import { CarrinhoService } from './../service/carrinho.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  carrinho: Carrinho = {"alimentos": []}
  mostrarBotao = false;

  constructor(private carrinhoService: CarrinhoService) {}

  ngOnInit(): void {
    this.carrinho = this.carrinhoService.getCarrinho();
  }

  addQuantidade(alimento: Alimento){
    this.carrinhoService.addCarrinho(alimento);
  }

  removerQuantidade(alimento: Alimento){
    this.carrinhoService.removeCarrinho(alimento);
  }

  reservar(){
    
  }

}
