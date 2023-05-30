import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Reserva } from './model/reserva.model';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private apiUrl = 'http://localhost:8080/reservas';

  constructor(private http: HttpClient) { }

  criarReserva(reserva: Reserva): Observable<Reserva> {
    return this.http.post<Reserva>(this.apiUrl, reserva)
      .pipe(
        catchError(this.handleError)
      );
  }

  obterReservaPorCodigo(codigo: string): Observable<Reserva> {
    const url = `${this.apiUrl}/${codigo}`;
    return this.http.get<Reserva>(url)
      .pipe(
        catchError((error) => {
          if (error.status === 404) {
            return throwError('Reserva não encontrada.');
          }
          return this.handleError(error);
        })
      );
  }

  cancelarReserva(id: number): Observable<string> {
    const url = `${this.apiUrl}/${id}/cancelar`;
    return this.http.put<string>(url, {})
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('Ocorreu um erro:', error);
    return throwError('Erro ao processar a solicitação. Por favor, tente novamente mais tarde.');
  }
}
