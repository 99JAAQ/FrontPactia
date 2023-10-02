import { Component, OnInit, ViewChild } from '@angular/core';
import { Person } from 'src/app/shared/models/person/person';
import { PersonServices } from 'src/app/service/personService';
import { InformationPersonComponent } from '../information/informationPerson.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Alerts } from 'src/app/shared/Alerts/Errors';

@Component({
  selector: 'list-person-component',
  templateUrl: './listPerson.component.html',
})
export class ListPersonComponent implements OnInit {

  @ViewChild(InformationPersonComponent) childModalPerson: InformationPersonComponent | undefined;

  isOffcanvasVisible: boolean = false;
  public lsPerson: Person[] = []

  constructor(
    private spinner: NgxSpinnerService,
    private personServices: PersonServices) {
  }

  async ngOnInit() {
    try {
      this.spinner.show();
      this.listOfPerson();
      this.spinner.hide();
    } catch (error: any) {
      this.spinner.hide();
      Alerts.warning("Error", error, "Aceptar");
    }
  }
  async open(id:  string | null=null) {
    await this.childModalPerson?.open(id);
  }
  async close() {
    this.childModalPerson?.close();
  }


  async deletePerson(id: string | null) {
    await this.childModalPerson?.deletePerson(id);
    this.listOfPerson();
  }

  async listOfPerson() {
    try {
      this.lsPerson= await this.personServices.GetAll().then((data: any) => { return data; }).catch((err) => { throw err; });
    } catch (error: any) {
      this.spinner.hide();
      Alerts.warning("Error", error, "Aceptar");
    }
  }

}

