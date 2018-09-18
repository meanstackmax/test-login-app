import { Injectable, Injector } from '@angular/core';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class ApiTokenInterceptor implements HttpInterceptor {
    private authService: AuthService;

    constructor(
        private injector: Injector,
        private router: Router
    ) {
        this.authService = this.injector.get(AuthService);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (!req.url.includes(environment.api)) {
            return next.handle(req);
        }

        const authReq = req.clone({
            headers: req.headers.set('Authorization', `${this.authService.getTokenType()} ${this.authService.getAccessToken()}}`)
        });

        return next.handle(authReq);
    }
}
