import { Component } from '@angular/core';
import { UntypedFormControl, FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  readonly controls = {
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  }

  form: FormGroup = new FormGroup(this.controls);

  constructor(private authService: AuthService) { }


  onSubmit() {
    this.authService.login(this.controls.username.value, this.controls.password.value)
      ?.subscribe(response => {
        console.log('no problemo');
      })

  }
}
