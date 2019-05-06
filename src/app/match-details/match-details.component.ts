import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '../service/message.service';
import { Subscription } from 'rxjs';
import { Match } from '../modal/match';

// const secondsCounter = interval(1000);

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.css']
})

export class MatchDetailsComponent implements OnInit {
  
  secondsCounter: any;
  today: number = Date.now();
  todate: number = Date.parse("2019-05-30T09:30:00.000+0000");
  distance: number;
  remTimer: string;
  remainDays: number; 
  inProgress: boolean;
  message: string;
  subscription: Subscription;

  constructor(private router: Router, public route: ActivatedRoute, private messageService: MessageService) {
      this.subscription = this.messageService.getMessage().subscribe(message => { this.message = message.text; });
      this.message = sessionStorage.getItem('questSessionInprogress');
   }

  // @Input()
  // matchDetails: IMatchDetails;

  @Input()
  matchDetails: Match;

  @Input()
  menuType: string;

  ngOnInit() {
    // this.distance = this.todate - this.today;
    this.secondsCounter = setInterval(() => { 
      this.getDateCountDown(); 
      }, 1000);
      
  }
  
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  triggerQuestSection(){
    if(sessionStorage.getItem('questSessionInprogress')=='true'){
      alert('Please Save/Submit your current question session');
      return false;
    }else{
      this.inProgress = true;
      this.message= "inprogress";
      sessionStorage.setItem('questSessionInprogress','true');
      this.router.navigate([ 'predictionPage', this.matchDetails.matchid ], { relativeTo: this.route });
    }
  }

  triggerMatchDetail(){
    if(sessionStorage.getItem('questSessionInprogress')=='true'){
      alert('Please Save/Submit your current question session');
      
    }else{
      alert("match details");
    }
    return false;
  }

  getDateCountDown(){
    this.todate = Date.parse(this.matchDetails.startTime);
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
