import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	templateUrl: './dynamic-page.component.html',
	styles: [
	]
})
export class DynamicPageComponent {
   
   public newFavorite: FormControl = new FormControl('', [Validators.required]);

   public myForm: FormGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      favoriteGames: this.formBuilder.array([
         ['Metal Gear', Validators.required],
         ['League of legends', Validators.required],
      ])
   })

   constructor( private formBuilder: FormBuilder ) {}

   get favoriteGames() {
      return this.myForm.get('favoriteGames') as FormArray;
   }

   isValidField( field: string ): boolean | null {
		return this.myForm.controls[field].errors 
         && this.myForm.controls[field].touched
	}

   isValidFieldInArray ( formArray: FormArray, i: number) {
      return formArray.controls[i].errors 
         && formArray.controls[i].touched
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

   onAddToFavorites():void {
      if ( this.newFavorite.invalid ) return;
      
      const newGame = this.newFavorite.value;

      this.favoriteGames.push(
         this.formBuilder.control( newGame, Validators.required )
      );

      this.newFavorite.reset();
   }

   onDeleteFavorite( index: number ):void {
      this.favoriteGames.removeAt( index );
   }

   onSubmit() {
      if( this.myForm.invalid ) {
         this.myForm.markAllAsTouched();
			return;
      }
      console.log(this.myForm.value);
      (this.myForm.controls['favoriteGames'] as FormArray) = this.formBuilder.array([]);
      this.myForm.reset();
   }

}
