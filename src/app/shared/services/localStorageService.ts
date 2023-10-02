import { Injectable } from '@angular/core';
//import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() { }

  setSession(Session: string) {
    localStorage.setItem('Session', Session);
  }

  getSession() {
    return localStorage.getItem("Session");
  }

  clear() {
    localStorage.clear();
  }

}