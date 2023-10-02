import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Person } from 'src/app/shared/models/person/person';
import { PersonServices } from 'src/app/service/personService';
import { NgxSpinnerService } from 'ngx-spinner';
import { Alerts } from 'src/app/shared/Alerts/Errors';
import { forceValidation } from 'src/app/shared/validations/forceValidation';

@Component({
	selector: 'information-person-component',
	templateUrl: './informationPerson.component.html',
})

export class InformationPersonComponent {
	closeResult = '';
	@ViewChild('content') content: any;

	public informationUser: FormGroup = new FormGroup({});

	public personInfomation: Person = new Person();


	constructor(
		private modalService: NgbModal,
		private personServices: PersonServices,
		private spinner: NgxSpinnerService
		) {
	}

	public formGroupPerson = new FormGroup({
		Cedula: new UntypedFormControl(null,[Validators.required, Validators.minLength(7)]),
		Nombre: new UntypedFormControl(null, [Validators.required]),
		Apellido: new UntypedFormControl(null,[Validators.required]) 
	})

	async GetDataModel() {
		this.personInfomation.cedula = this.formGroupPerson.value.Cedula;
		this.personInfomation.nombre = this.formGroupPerson.value.Nombre;
		this.personInfomation.apellido = this.formGroupPerson.value.Apellido;
	}

	async SetDataModel() {
		this.formGroupPerson.controls.Cedula.setValue(this.personInfomation.cedula);
		this.formGroupPerson.controls.Nombre.setValue(this.personInfomation.nombre);
		this.formGroupPerson.controls.Apellido.setValue(this.personInfomation.apellido);
	}

	async open(id: string | null=null) {
		try {
			this.formGroupPerson.reset();
			if (id) {
				this.personInfomation = await this.personServices.GetById(id);
				await this.SetDataModel();
			} else {
				this.personInfomation = new Person();
			}
			this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static' });
		} catch (error: any) {
			this.spinner.hide();
			Alerts.warning("Error", error, "Aceptar");
		}
	}

	async close() {
		this.personInfomation = new Person();
		this.modalService.dismissAll();
	}

	async save() {
		try {
			forceValidation(this.formGroupPerson);
			if (this.formGroupPerson.valid) {
				this.spinner.show();
				this.GetDataModel();
				let response, accion;
				if (this.personInfomation.id) {
					console.log(this.personInfomation,"personInfomation")
					response = await this.personServices.UpdatePerson(this.personInfomation);
					accion = "Actualizando"
				} else {
					response = await this.personServices.AddPerson(this.personInfomation);
					accion = "Guardando"
				}
				this.spinner.hide();
				if (response) {
					Alerts.success(accion, "", "Aceptar");
					this.close();
				}
			}
		} catch (error: any) {
			this.spinner.hide();
			Alerts.warning("Error", error, "Aceptar");
		}
	}

	async deletePerson(id: string | null = null) {
		try {
			let response = await Alerts.confirmData("¿Estas seguro de eliminar esta persona?");
			if (response) {
				await this.personServices.deletePerson(id);
				Alerts.success("Eliminado", "", "Aceptar");
			}
		} catch (error:any) {
			this.spinner.hide();
			Alerts.warning("Error", error, "Aceptar");
		}
	}
}


