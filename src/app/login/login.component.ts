import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';

interface Alert {
  type: string;
  message: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  alert : Alert;
  showAlert : boolean = false;
  

  constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthenticationService) {}

  ngOnInit() {
    if(null != sessionStorage.getItem('username')){
      this.router.navigate(['/wcpredict/dashboard']);
    }
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.alert = this.authService.getMessage();
    if(null != this.alert.message && '' != this.alert.message){
      this.showAlert = true;
    }

  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.authService.setMessage('','');
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    console.log("Submitted");

    this.loading = true;
    this.authService.login(this.f.username.value, this.f.password.value)
    // .subscribe(
    //     data => {
    //         this.router.navigate(['/wcpredict/dashboard']);
    //     },
    //     error => {
    //       console.log("Failed");
    //       this.authService.setMessage('Login Failed','alert-danger');
    //       this.showAlert = true;
    //       this.loading = false;
    //     });

    this.router.navigate(['/wcpredict/dashboard']);
  }
}

