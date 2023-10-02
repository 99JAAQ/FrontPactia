import { FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { loginModel } from 'src/app/shared/models/appUser/loginModel';
import { AppUserService } from 'src/app/service/appUserService';
import { Alerts } from 'src/app/shared/Alerts/Errors';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalStorageService } from 'src/app/shared/services/localStorageService';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginPageComponent {

  //Variables
  public loginModel: loginModel = new loginModel();
  //Forms
  public formGroup = new FormGroup({
    txtEmail: new UntypedFormControl(null, [Validators.required]),
    txtPassword: new UntypedFormControl(null, Validators.required),
  })

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private localStorageService: LocalStorageService,
    private appUser: AppUserService) { }

  username: string = '';
  password: string = '';

  async btnLogin() {
    try {
      this.spinner.show();
      this.loginModel.password = this.formGroup.value.txtPassword;
      this.loginModel.email = this.formGroup.value.txtEmail;

      let response = await this.appUser.login(this.loginModel);
      if (response) {
        this.localStorageService.setSession("true");
        this.router.navigate(['/Home']);
      }

      this.spinner.hide();
    } catch (error: any) {
      this.spinner.hide();
      Alerts.warning("Error", error, "Aceptar");
    }

  }

}