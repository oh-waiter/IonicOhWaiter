import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { Alimento } from './model/alimento.model';
import { Carrinho } from './model/carrinho.model';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  constructor(private http: HttpClient) { }

  url = "http://localhost:3000/";
  context = "carrinho";
  carrinho: Carrinho = { "alimentos": []};

  getCarrinho(){
    return this.carrinho;
  }

  addCarrinho(alimento: Alimento){

    let existe = false;
    if(this.carrinho.alimentos.length !== 0 ){
        this.carrinho.alimentos.map((alimentos) => {
            if(alimentos.nome === alimento.nome){
                existe = true;
                alimentos.quantidade++;
            }
        })
    }

    if(existe === false){
        alimento.quantidade = 1;
        this.carrinho.alimentos.push(alimento);
    }

  }

  removeCarrinho(alimento: Alimento){
    if(this.carrinho.alimentos.length !== 0 ){
        this.carrinho.alimentos.map((alimentos) => {
            if(alimentos.nome === alimento.nome){
                alimentos.quantidade--;
                this.carrinho.alimentos = this.carrinho.alimentos.filter(alimento => alimento.quantidade > 0);
            }
        })
    }
  }

  private handleError(error: HttpErrorResponse){
    if(error.status === 0){
      console.error('Ocorreu um erro:', error.error);
    } else {
      console.error(`Codigo de retorno do erro ${error.status}, e o corpo do erro é: `, error.error);
    }  
    return throwError(() => new Error('Algo não deu certo; Tente novamente mais tarde'));
  }

}