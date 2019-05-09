import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../service/authentication.service';
import { Login } from '../modal/login';
import { Observable } from 'rxjs';

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
  login : Login;
  

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

    this.verifyApplication();
    this.checkforAlert();
  }

  checkforAlert(){
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
    this.login = new Login();
    this.login.userName = this.f.username.value;
    this.login.password = this.f.password.value;

    this.loading = true;
    this.showAlert = false;
    this.authService.login(this.login)
    .subscribe(
      data => {
        if(null == data){
          this.authService.setMessage('Invalid Credentials. Please try again...','alert-danger');
          this.showAlert = true;
          this.loading = false;
        }else{
          this.router.navigate(['/wcpredict/dashboard']);
        }
      },
      error => {
        this.authService.setMessage('Login Failed. Please try again...','alert-danger');
        this.showAlert = true;
        this.loading = false;
      }
    );    
  }

  verifyApplication(){
    this.authService.verifyApplicationStatus()
    .subscribe(
      data => {
        if("FAILURE" == data){
          console.log("DB/ Service Failure");
          this.authService.setMessage('I am Under Maintainance. Will get back to you soon...','alert-primary');
          this.checkforAlert();
        }
      },
      error => {
        console.log("Service Unavailable");
        this.authService.setMessage('I am Under Maintainance. Will get back to you soon...','alert-primary');
        this.checkforAlert();
      }      
    );
  }
}

