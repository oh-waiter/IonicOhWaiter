import { Alimento } from './../service/model/alimento.model';
import { CarrinhoService } from './../service/carrinho.service';
import { Categoria } from './../service/model/categoria.model';
import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../service/categoria.service';
import { AlimentoService } from '../service/alimento.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  categorias: Categoria[] = [];
  alimentos: Alimento[] = [];

  constructor(private categoriaService: CategoriaService, 
              private alimentoService: AlimentoService, 
              private carrinhoService: CarrinhoService) {}

  ngOnInit(): void {
    this.categoriaService.getCategorias().subscribe((data: Categoria[]) => {this.categorias = data});  
    this.alimentoService.getAlimentos().subscribe((data: Alimento[]) => {this.alimentos = data}); 
  }

  handleChange(e: any) {
    if(e.detail.value === 'Todos'){
      this.alimentoService.getAlimentos().subscribe((data: Alimento[]) => {this.alimentos = data}); 
    }else{
      this.alimentoService.getAlimentosByCategoria(e.detail.value).subscribe((data: Alimento[]) => {this.alimentos = data}); 
    }
  }

  adicionarAlimentoCarrinho(alimento: Alimento){
    this.carrinhoService.addCarrinho(alimento);
  }

}
