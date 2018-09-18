import { throwError as observableThrowError, Observable } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class NoAuthInterceptor implements HttpInterceptor {

    private authService: AuthService;

    constructor(
        private injector: Injector,
        private router: Router,
        private toastr: ToastrService
    ) {
        this.authService = this.injector.get(AuthService);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next
            .handle(req).pipe(
                catchError((error: any) => {
                    if (error.status === 401) {
                        // TODO: refresh token
                        this.toastr.error(`Token expired. Please login again.`);
                        this.authService.logout();
                        this.router.navigate(['/login']);
                    }

                    return observableThrowError(error);
                }));
    }
}
