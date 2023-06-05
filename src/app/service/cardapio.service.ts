import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cardapio } from './model/cardapio.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CardapioService {
   private apiUrl = `${environment.urlApi}cardapios`;

  constructor(private http: HttpClient) { }

  salvarCardapio(cardapio: Cardapio): Observable<Cardapio> {
    return this.http.post<Cardapio>(this.apiUrl, cardapio);
  }

  alterarCardapio(cardapio: Cardapio): Observable<Cardapio> {
    const url = `${this.apiUrl}/${cardapio.id}`;
    return this.http.put<Cardapio>(url, cardapio);
  }

  buscarTodosCardapios(): Observable<Cardapio[]> {
    return this.http.get<Cardapio[]>(this.apiUrl);
  }

  buscarCardapioPorCategoria(idCategoria: number): Observable<Cardapio[]> {
    const url = `${this.apiUrl}/por-categoria/${idCategoria}`;
    return this.http.get<Cardapio[]>(url);
  }

  buscarCardapioPorId(id: number): Observable<Cardapio> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Cardapio>(url);
  }

  excluirCardapio(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

}
