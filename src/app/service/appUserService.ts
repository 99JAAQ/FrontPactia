import { HttpClient, HttpContext } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environments";
import { loginModel } from "../shared/models/appUser/loginModel";
import { Alerts } from "../shared/Alerts/Errors";

@Injectable({
    providedIn: 'root'
})

export class AppUserService{
    url:string | null=null;
    constructor(private http: HttpClient ){
        this.url = environment.url;
    }

    login(model: loginModel) {
        return new Promise<any>((resolve, reject) => {
            this.http.post<any>(`${environment.url}User/Authenticate`, model,
                {
                }).subscribe({
                    next: (data: any) => {
                        resolve(data);
                    },
                    error: (ex: any) => {                                                
                        reject("Usuario o contraseña incorrecta");      
                    }
                });
        });
    }
}