import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { LoginRequest, AuthResponse } from '../models/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user = new BehaviorSubject<any>(null);
  private _isLoggedIn = new BehaviorSubject<boolean>(!!this.getAccessToken());

  constructor(private http: HttpClient) {
  }

  getTokenType(): string {
    return localStorage.getItem('token_type');
  }

  getAccessToken(): string {
    return localStorage.getItem('access_token');
  }

  isLoggedIn(): Observable<boolean> {
    return this._isLoggedIn.asObservable();
  }

  login(data: Partial<LoginRequest>): Observable<boolean> {
    const payload: LoginRequest = {
      grant_type: 'password',
      username: data.username,
      password: data.password,
      scope: 'offline_access openid profile'
    };

    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const body = new URLSearchParams();

    for (const prop in payload) {
      if (payload[prop]) {
        body.set(prop, payload[prop]);
      }
    }

    return this.http.post<AuthResponse>(`${environment.authApi}/connect/token`, body.toString(), options)
      .pipe(
        switchMap((authData: AuthResponse) => {
          this.setAuthData(authData);
          this._isLoggedIn.next(true);
          return of(true);
        }),
        catchError(error => {
          return throwError(error);
        })
      );
  }

  logout(): void {
    this.deleteAuthData();
    this._isLoggedIn.next(false);
  }

  private setAuthData(data: AuthResponse) {
    localStorage.setItem('access_token', data['access_token']);
    localStorage.setItem('expires_in', String(data['expires_in']));
    localStorage.setItem('refresh_token', data['refresh_token']);
    localStorage.setItem('id_token', data['id_token']);
    localStorage.setItem('token_type', data['token_type']);
  }

  private deleteAuthData(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_in');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('token_type');
  }
}
