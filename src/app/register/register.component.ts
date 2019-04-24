import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService : AuthenticationService,
    private router : Router) { }

  ngOnInit() {
    this.authService.setMessage('','');
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    console.log("Registered");
    this.loading = true;
    this.authService.register(this.registerForm.value)
      // .subscribe(
      //     data => {
      //         this.authService.setMessage('Registration successful', true);
      //         this.router.navigate(['/wcpredict']);
      //     },
      //     error => {
      //         this.authService.setMessage('Registration Failed', true);
      //         this.loading = false;
      //     });
    this.authService.setMessage('Registration successful. Login to start the Game', 'alert-success');
    this.router.navigate(['/wcpredict']);
  }

}
