import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { cantBeStrider } from 'src/app/shared/validators/validators.functions';

@Component({
	selector: 'app-register-pages',
	templateUrl: './register-pages.component.html',
	styles: [
	]
})
export class RegisterPagesComponent {
	
	public myForm: FormGroup = this.formBuilder.group({
		name: 		['', [ Validators.required ]],
		email: 		['', [ Validators.required ]],
		username:	['', [ Validators.required, cantBeStrider ]],
		password: 	['', [ Validators.required, Validators.minLength(6) ]],
		password2: 	['', [ Validators.required ]],
	})

	constructor( private formBuilder: FormBuilder ) {}
	
	isValidField( field: string ) {
		// TODO: obtener validacion desde un servicio
	}

	onSubmit() {
		this.myForm.markAllAsTouched();
	}

}
