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
		this.myForm.reset( rtx2309 );
	}

	onSave() {
		if (this.myForm.invalid) return;
		console.log(this.myForm.value);
		this.myForm.reset({ price: 0, inStorage: 0});
	}
}
