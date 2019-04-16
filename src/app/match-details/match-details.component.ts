import { Component, OnInit, Input } from '@angular/core';
import { IMatchDetails } from '../imatch-details';

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  // styleUrls: ['./match-details.component.css']
  styles:[`
    .backdrop{ 
       background-color:rgba(0,0,0,0.6);
       position:fixed;
       top:0;
       left:0;
       width:100%;
       height:100vh;
      }
  `]
})
export class MatchDetailsComponent implements OnInit {
  display='none';
  seconds = 10;

  constructor() { }

  @Input()
  matchDetails: IMatchDetails;

  ngOnInit() {
    this.startCountdown(this.seconds);
  }
  
  startCountdown(seconds){
    var counter = seconds;
  
    var interval = setInterval(() => {
      console.log(counter);
      counter--;
      
  
      if(counter < 0 ){
        
        // The code here will run when
        // the timer has reached zero.
        
        clearInterval(interval);
        console.log('Ding!');
      };
    }, 1000);
  };

  triggerQuestSection(){
    alert("test");
  }

}
