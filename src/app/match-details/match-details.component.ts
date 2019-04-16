import { Component, OnInit, Input } from '@angular/core';
import { IMatchDetails } from '../imatch-details';
import { interval } from 'rxjs';

// const secondsCounter = interval(1000);

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.css']
})


export class MatchDetailsComponent implements OnInit {
  
  secondsCounter: any;
  today: number = Date.now();
  todate: number = Date.parse("05/30/2019 09:30:00 AM");
  distance: number;
  remTimer: string;
  remainDays: number; 
  constructor() { }

  @Input()
  matchDetails: IMatchDetails;

  ngOnInit() {
    // this.distance = this.todate - this.today;
    this.secondsCounter = setInterval(() => { 
      this.getDateCountDown(); 
      }, 1000);
  }
  
  triggerQuestSection(){
    alert("test");
  }

  getDateCountDown(){
    this.todate = Date.parse(this.matchDetails.startDate);
    this.today = Date.now();
    this.distance = this.todate - this.today;
    var days = Math.floor(this.distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((this.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((this.distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    this.remainDays = days;
    this.remTimer = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
  }

}
