import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { LocalStorageService } from "../services/localStorageService";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {
    constructor(
        private localstorage: LocalStorageService,
        private router: Router) { }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) {
        let isLoggedIn = this.localstorage.getSession();
        if (isLoggedIn == "true") {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}