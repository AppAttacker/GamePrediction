import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    //once implemented login pls remove below lines
    sessionStorage.setItem('userloggedIn','true');
    sessionStorage.setItem('userid','karth2k');
    sessionStorage.setItem('username','Karthik');
  }
}

