import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { LocalStorageService } from "../services/localStorageService";

@Injectable({
    providedIn: 'root'
})
export class AuthGuardLogin {
    constructor(
        private localStorage: LocalStorageService,
        private router: Router) { }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) {
        let isLoggedIn = this.localStorage.getSession()
        if (isLoggedIn == "true") {
            this.router.navigate(['/Home']);
            return false;
        }
        return true;
    }
}