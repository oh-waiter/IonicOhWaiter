import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Carrinho } from './model/carrinho.model';
import { Cardapio } from './model/cardapio.model';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  constructor(private http: HttpClient) { }

  url = "http://localhost:3000/";
  context = "carrinho";
  carrinho: Carrinho = { "cardapios": [] };

  getCarrinho() {
    return this.carrinho;
  }

  addCarrinho(cardapio: Cardapio) {
    let existe = false;
    if (this.carrinho.cardapios.length !== 0) {
      this.carrinho.cardapios.map((cardapio) => {
        if (cardapio.nome === cardapio.nome) {
          existe = true;
          cardapio.quantidade++;
        }
      })
    }

    if (existe === false) {
      cardapio.quantidade = 1;
      this.carrinho.cardapios.push(cardapio);
    }

  }

  removeCarrinho(cardapio: Cardapio) {
    if (this.carrinho.cardapios.length !== 0) {
      this.carrinho.cardapios.map((cardapio) => {
        if (cardapio.nome === cardapio.nome) {
          cardapio.quantidade--;
          this.carrinho.cardapios = this.carrinho.cardapios.filter(cardapio => cardapio.quantidade > 0);
        }
      })
    }
  }

}