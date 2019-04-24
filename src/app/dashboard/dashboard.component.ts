import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IdleTimeOutService } from '../service/idle-time-out.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  title = 'GamePrediction';
  admin = "admin_1";
  username: string;
  
  constructor(private router: Router, private idletimeout: IdleTimeOutService) { }

  ngOnInit() {
    this.username = sessionStorage.getItem('username');
    console.log('inside dashboard..');
    if(this.username==null){
      this.router.navigateByUrl('');
    }
  }
  resetUserDetails(){
    //alert("logout");
    sessionStorage.clear();
    //alert(sessionStorage.getItem('username'));
    this.username = sessionStorage.getItem('username');
    this.router.navigateByUrl('/wcpredict/dashboard').then(e => {
      if(this.username==null){
        this.router.navigateByUrl('/wcpredict');
      }
    });
  }

}
