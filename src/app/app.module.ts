import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/appUser/login.component';
import { HomeComponent } from './components/home/home.component';
import { ListPersonComponent } from './components/person/list/listPerson.component';
import { InformationPersonComponent } from './components/person/information/informationPerson.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SpinnerStandComponent } from './shared/spinner/spinner.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from '@angular/common/http';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { WelcomeComponent } from './components/welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomeComponent,
    ListPersonComponent,
    InformationPersonComponent,
    WelcomeComponent
  ],
  imports: [
    NgbModule,
    NgbNavModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule ,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    SpinnerStandComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
