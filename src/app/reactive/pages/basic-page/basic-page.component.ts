import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

const rtx2309 = {
	name: 'rtx2309',
	price: 2450,
	inStorage: 5
}
@Component({
	templateUrl: './basic-page.component.html',
	styles: [
	]
})
export class BasicPageComponent implements OnInit {
	
	// public myForm: FormGroup = new FormGroup({
	// 	name: new FormControl(''),
	// 	price: new FormControl(0),
	// 	inStorage: new FormControl(0)
	// })

	public myForm: FormGroup = this.formBuilder.group({
		name: 		['', [ Validators.required, Validators.minLength(3) ]],
		price: 		[0, [ Validators.required, Validators.min(0) ]],
		inStorage: 	[0, [ Validators.required, Validators.min(0) ]]
	})

	constructor( private formBuilder: FormBuilder ) {}

	ngOnInit(): void {
		// this.myForm.reset( rtx2309 );
	}

	isValidField( field: string ): boolean | null {
		return this.myForm.controls[field].errors && 
			this.myForm.controls[field].touched
	}

	getFieldError( field: string ): string | null {
		
		if( !this.myForm.controls[field] ) return null;

		const errors = this.myForm.controls[field].errors || {};

		for (const key of Object.keys(errors)) {
			switch( key ) {
				case 'required': 
					return 'Este campo es requerido';
				case 'minlength':
					return `Este campo requiere minimo ${ errors['minlength'].requiredLength } letras`;
			}
		}

		return null;

	}

	onSave() {
		if (this.myForm.invalid) {
			this.myForm.markAllAsTouched();
			return;
		}
		console.log(this.myForm.value);
		this.myForm.reset({ price: 0, inStorage: 0});
	}
}
