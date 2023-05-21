import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { Alimento } from './model/alimento.model';

@Injectable({
  providedIn: 'root'
})
export class AlimentoService {
  constructor(private http: HttpClient) { }

  url = "http://localhost:3000/";
  context = "alimentos";

  getAlimentos(){
    return this.http.get<Alimento[]>(this.url+this.context)
      .pipe(catchError(this.handleError));
  }

  getAlimentosByCategoria(categoria: string){
    return this.http.get<Alimento[]>(this.url+this.context+"?categoria="+categoria)
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