import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { Register } from '../modal/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  register: Register;
  loading = false;
  submitted = false;
  registrationStatus: String;
  showAlert = false;

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
    this.showAlert = false;
  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.showAlert = false;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    console.log("Registered");
    this.loading = true;
    this.register = new Register();
    this.register.firstName = this.registerForm.get('firstName').value;
    this.register.lastName = this.registerForm.get('lastName').value;
    this.register.userName = this.registerForm.get('username').value;
    this.register.password = this.registerForm.get('password').value;
    this.authService.register(this.register)
    .subscribe(
      data => {
        console.log(data);
        if("SUCCESS" == data) {
          this.authService.setMessage('Registration successful. Login to start the Game', 'alert-success');
          this.router.navigate(['/wcpredict']);
        } else if("CONFLICT" == data) {
          this.registrationStatus = "UserName already Exists. Try with different UserName..";
          this.showAlert = true;
        } else {
          this.registrationStatus = "Registration Failed. Please Register Again..";
          this.showAlert = true;
        }
        this.loading = false;
      },
      error => {
        console.log("error");
        console.log(error);
        this.registrationStatus = "Registration Failed. Please Register Again..";
        this.showAlert = true;
        this.loading = false;
      }
    );
      // .subscribe(
      //     data => {
      //         this.authService.setMessage('Registration successful', true);
      //         this.router.navigate(['/wcpredict']);
      //     },
      //     error => {
      //         this.authService.setMessage('Registration Failed', true);
      //         this.loading = false;
      //     });
    // this.router.navigate(['/wcpredict']);
  }

}
