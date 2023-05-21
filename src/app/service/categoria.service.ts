import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Categoria } from './model/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  constructor(private http: HttpClient) { }

  url = "http://localhost:3000/";
  context = "categorias";

  getCategorias(){
    return this.http.get<Categoria[]>(this.url+this.context)
      .pipe(catchError(this.handleError));
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