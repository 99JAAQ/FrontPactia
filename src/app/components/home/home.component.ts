import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { LocalStorageService } from "src/app/shared/services/localStorageService";

@Component({
    selector: 'home-page',
    templateUrl: './home.component.html'
  })
  export class HomeComponent{
  
    constructor(
      private router: Router,
      private localStorageService:LocalStorageService) { }

      logOut(){
        this.localStorageService.clear();
        this.router.navigate(['/Login']);
      }
    
  }