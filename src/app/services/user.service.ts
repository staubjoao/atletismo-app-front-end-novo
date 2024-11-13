import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/api/usuario`;

  constructor(private http: HttpClient) {}

  getAllUserByClube(clubCod: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/clube/${clubCod}`);
  }


  alterarSenha(senhaAtual: string, novaSenha: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/alterar-senha`, { senhaAtual, novaSenha });
  }

  atualizarNomeEmail(body: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/atualizar-usuario`, body);
  }

  consultarNomeEmail(): Observable<any> {
    return this.http.get(`${this.apiUrl}/obter-usuario-ativo`);
  }

}
