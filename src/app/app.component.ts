import { Component, OnInit } from '@angular/core';
import { HTTPStatus } from './httpstatus';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GamePrediction';
  admin = "admin";
  HTTPActivity: boolean;
  constructor(private httpStatus: HTTPStatus, private router: Router) {
    this.httpStatus.getHttpStatus().subscribe((status: boolean) => {this.HTTPActivity = status; console.log(status)});
  }
  
  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
    };
  
    this.router.events.subscribe((evt) => {
      console.log(evt);
        if (evt instanceof NavigationEnd) {
            this.router.navigated = false;
            window.scrollTo(0, 0);
        }
    });
  }

 }
