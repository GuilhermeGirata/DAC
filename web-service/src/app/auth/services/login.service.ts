import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from './../../shared/models/login.model';
import { Usuario } from './../../shared/models/usuario.model';

const LS_CHAVE: string = 'usuarioLogado';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  BASE_URL: string = 'http://localhost:8080/login/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  public get usuarioLogado(): Usuario {
    let user = localStorage[LS_CHAVE];
    return user ? JSON.parse(localStorage[LS_CHAVE]) : null;
  }

  public set usuarioLogado(usuario: Usuario) {
    localStorage[LS_CHAVE] = JSON.stringify(usuario);
  }

  login(login: Login): Observable<Usuario | null> {
    return this.httpClient.post<Usuario>(
      this.BASE_URL,
      login,
      this.httpOptions
    );
    // let usuario = new Usuario(
    //   1,
    //   'Func',
    //   login.login,
    //   login.senha,
    //   'FUNC'
    // );

    // if (login.login === login.senha) {
    //   if (login.login === 'admin') {
    //     usuario = new Usuario(
    //       1,
    //       'Admin',
    //       login.login,
    //       login.senha,
    //       'ADMIN'
    //     );
    //   } else if (login.login === 'gerente') {
    //     usuario = new Usuario(
    //       1,
    //       'Gerente',
    //       login.login,
    //       login.senha,
    //       'GERENTE'
    //     );
    //   }
    //   return of(usuario);
    // }
    // return of(null);
  }

  logout() {
    delete localStorage[LS_CHAVE];
  }
}
