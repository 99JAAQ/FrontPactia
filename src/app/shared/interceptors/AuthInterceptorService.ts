import { HttpContextToken, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { Alerts } from "../Alerts/Errors";
import { of } from "rxjs";
import { NgxSpinnerService } from "ngx-spinner";
import { LocalStorageService } from "../services/localStorageService";

export const BYPASS_LOG = new HttpContextToken(() => false);

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(
        private _cookie: CookieService,
        private _ruta: Router,
        private spinner: NgxSpinnerService,
        private localStorageService: LocalStorageService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        let isLoggedIn = this.localStorageService.getSession()
        if (isLoggedIn == "false") {
            return next.handle(request)
        } else {
            this.localStorageService.clear();
                this._ruta.navigate(['login']);
                Alerts.warning("Error", "La sesión se venció", "ok");
                this.spinner.hide();
                return of();
        }
    }
}
