import { CarrinhoService } from './../service/carrinho.service';
import { Categoria } from './../service/model/categoria.model';
import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../service/categoria.service';
import { CardapioService } from '../service/cardapio.service';
import { Cardapio } from '../service/model/cardapio.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  categorias: Categoria[] = [];
  cardapios: Cardapio[] = [];

  constructor(private categoriaService: CategoriaService, 
              private cardapioService: CardapioService, 
              private carrinhoService: CarrinhoService) {}

  ngOnInit(): void {
    this.categoriaService.buscarTodasCategorias().subscribe((data: Categoria[]) => {
      this.categorias = data
      this.categorias.push({id: 0, nome: 'Todos'});
    });  
    this.cardapioService.buscarTodosCardapios().subscribe((data: Cardapio[]) => {this.cardapios = data});
    
  }

  handleChange(e: any) {
    if(e.detail.value === '0'){
      this.cardapioService.buscarTodosCardapios().subscribe((data: Cardapio[]) => {this.cardapios = data}); 
    }else{
      this.cardapioService.buscarCardapioPorCategoria(e.detail.value).subscribe((data: Cardapio[]) => {this.cardapios = data}); 
    }
  }

  adicionarAlimentoCarrinho(cardapio: Cardapio){
    this.carrinhoService.addCarrinho(cardapio);
  }

}
