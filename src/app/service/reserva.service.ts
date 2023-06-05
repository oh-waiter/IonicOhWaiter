import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Reserva } from './model/reserva.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private apiUrl = `${environment.urlApi}reservas`;

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

  private handleError(error: any): Observable<never> {
    console.error('Ocorreu um erro:', error);
    return throwError('Erro ao processar a solicitação. Por favor, tente novamente mais tarde.');
  }
}
