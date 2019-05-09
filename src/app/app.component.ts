import { Component } from '@angular/core';
import { HTTPStatus } from './httpstatus';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GamePrediction';
  admin = "admin_11";
  HTTPActivity: boolean;
  constructor(private httpStatus: HTTPStatus) {
    this.httpStatus.getHttpStatus().subscribe((status: boolean) => {this.HTTPActivity = status; console.log(status)});
  }

 }
