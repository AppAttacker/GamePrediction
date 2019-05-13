import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '../service/message.service';
import { Subscription } from 'rxjs';
import { Match } from '../modal/match';
import { ConfirmDialogService } from '../service/confirm-dialog.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionaryModalComponent } from '../questionary-modal/questionary-modal.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { UserDashboard } from '../modal/user-dashboard';
import { MatchDetails } from '../modal/match-details';

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
  seconds: number;
  hours: number;
  days : number;
  remainDays: number; 
  inProgress: boolean;
  message: string;
  subscription: Subscription;
  userType: string;
  userScore: number;

  constructor(private router: Router, 
              public route: ActivatedRoute, 
              private messageService: MessageService,
              private confirmDialogService: ConfirmDialogService, 
              private modalService : NgbModal) {
      this.subscription = this.messageService.getMessage().subscribe(message => { this.message = message.text; });
      this.message = sessionStorage.getItem('questSessionInprogress');
   }

  // @Input()
  // matchDetails: IMatchDetails;

  @Input()
  matchDetails: Match;

  @Input()
  userMatchDetails: UserDashboard;

  @Input()
  menuType: string;

  ngOnInit() {
    // this.distance = this.todate - this.today;
    this.userType = sessionStorage.getItem('userType');
    this.secondsCounter = setInterval(() => { 
      this.getDateCountDown(); 
      }, 1000);
      this.userScore = parseInt(sessionStorage.getItem('userScore'));
      if(this.menuType=='completed'){
        this.matchDetails = this.userMatchDetails.match;
      }
    
  }
  
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
  
  triggerQuestSection(){
    
    if(sessionStorage.getItem('questSessionInprogress')=='true'){
      // alert('Please Save/Submit your current question session');
      this.modalService.open(ConfirmDialogComponent);
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
      // alert('Please Save/Submit your current question session');
      this.modalService.open(ConfirmDialogComponent);
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
    this.seconds = seconds;
    this.hours = hours;
    this.days = days;
  }

  triggerQuestSectionInModal() {
    const modalref = this.modalService.open(QuestionaryModalComponent, {
      backdrop: 'static',
      size: 'lg',
      keyboard: false
    });
    modalref.componentInstance.matchId = this.matchDetails.matchid;
  }

  gotoMatchDashboard(){
    if (sessionStorage.getItem('questSessionInprogress') == 'true') {
      this.modalService.open(ConfirmDialogComponent);
      return false;
    } else {
      sessionStorage.setItem('questSessionInprogress', 'false');
      this.sendMessage('closed');
      this.router.navigate([ 'matchdashboard', this.matchDetails.matchid ], { relativeTo: this.route });
    }
  }
  sendMessage(questSessionStatus: string): void {
    // send message to subscribers via observable subject
    this.messageService.sendMessage(questSessionStatus);
  }
}
