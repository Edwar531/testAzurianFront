import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor(private authS: AuthService, private toastr: ToastrService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('access_token');

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    
    return this.validate(next, request);
  }

  validate(next: HttpHandler, request: HttpRequest<any>) {
    return next.handle(request).pipe(
      catchError((err) => {
        if(err?.error?.errorAuth){
        }else if (err.status === 401) {
          this.toastr.warning('El usuario no ha sido autenticado.', 'Error');
          this.authS.logoutOffline();
        } else if (err.error.message) {
          this.toastr.warning(err.error.message, 'Error');
        } else {
          this.toastr.warning('No se pudo conectar con el servidor.', 'Error');
          this.authS.logoutOffline();
        }
        return throwError(err);
      })
    );
  }
}
