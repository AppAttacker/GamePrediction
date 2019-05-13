import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Question } from '../modal/question';
import { MessageService } from '../service/message.service';
import { MatchService } from '../service/match.service';
import { UserPrediction } from '../modal/user-prediction';
import { User } from '../modal/user';
import { Match } from '../modal/match';
import { Players } from '../modal/players';
import { MatchQuestions } from '../modal/match-questions';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WarningDialogComponent } from '../warning-dialog/warning-dialog.component';
import { AuthenticationService } from '../service/authentication.service';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { ConfirmDialogService } from '../service/confirm-dialog.service';

@Component({
  selector: 'app-questionary',
  templateUrl: './questionary.component.html',
  styleUrls: ['./questionary.component.css']
})
export class QuestionaryComponent implements OnInit {

  winMarginType: string = "R";
  user: User;
  match: Match;
  player: Players;
  playerArray: Players[] = [];
  matchQuestion: MatchQuestions;
  matchQuestionArray: MatchQuestions[];
  userPrediction: UserPrediction;

  questionForm = new FormGroup({
    question: new FormControl('Who will win this match:'),
    answer: new FormControl(''),
  });
  
  questionList = [];

  id: any;
  username: string;
  userId: number;
  // matchDetails: any;

  constructor(private router: Router, 
              private route: ActivatedRoute, 
              private messageService: MessageService, 
              private matchService: MatchService,
              private modalService: NgbModal,
              private successDialogService : ConfirmDialogService) { }

  ngOnInit() {
    console.log('inside question component');
    console.log(parseInt("100"));
    console.log(sessionStorage.getItem('userid'));
    this.id = this.route.snapshot.paramMap.get('id');
    this.username = sessionStorage.getItem('username');
    this.userId = parseInt(sessionStorage.getItem('userid'));
    
    this.loadQuestions();
  }

  sendMessage(questSessionStatus: string): void {
    // send message to subscribers via observable subject
    this.messageService.sendMessage(questSessionStatus);
  }

  loadQuestions(){
    const userQuestObserve = this.matchService.getPredictionQuest(this.userId, this.id);
    userQuestObserve.subscribe((userPrediction: UserPrediction) => {
      this.userPrediction = userPrediction; 
      this.user = userPrediction.user;
      this.match = userPrediction.match;
      this.playerArray = userPrediction.players;
      this.matchQuestionArray = userPrediction.matchQuestions;
      this.userPrediction.matchQuestions.forEach(element => {
        if (element.question.category == 4 && element.answer != "" && element.answer != null) {
          this.winMarginType = element.answer.split("_")[0];
          element.answer = element.answer.split("_")[1];
          
        }
        // if (element.question.category == 2 && (element.answer)) {
        //   let winMargin = element.answer.split("(")[1];
        //   element.answer = winMargin[0];
        // }
      
        console.log(element);
        console.log(this.winMarginType);
      });
      

    });
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.matchQuestionArray.forEach(element => {
      if (element.question.category == 4 && element.answer != "") {
        element.answer = this.winMarginType + "_" + element.answer
      }
      
      console.log(element);
      console.log(this.winMarginType);
    });
    this.userPrediction.matchQuestions = this.matchQuestionArray;
    
    var userQuestObserve = this.matchService.submitPredictionQuestByUser(this.userPrediction).subscribe(
      data => {
        if("SUCCESS"==data){
          this.successDialogService.setMessage('You prediction successfully submitted...', 'Info');
          this.modalService.open(SuccessDialogComponent);
        }
        if("FAILURE"==data){
          this.successDialogService.setMessage('Failure to submit your prediction. Please try again after sometimes...', 'Info');
          this.modalService.open(SuccessDialogComponent);
        }
      },
      error => {
        console.log("Error");
        console.log(error);
        this.successDialogService.setMessage('Something went wrong. Please try again after sometimes...', 'Warning');
        this.modalService.open(SuccessDialogComponent);
      }
    );
    
    sessionStorage.setItem('questSessionInprogress', 'false');
    this.sendMessage('submitted');
    this.router.navigateByUrl('/wcpredict/dashboard');
    // window.location.href = "/wcpredict/dashboard";
  }

  onSave() {
    // TODO: Use EventEmitter with form value
    this.matchQuestionArray.forEach(element => {
      if (element.question.category == 4 && element.answer != "") {
        element.answer = this.winMarginType + "_" + element.answer
      }
      
      console.log(element);
      console.log(this.winMarginType);
    });
    this.userPrediction.matchQuestions = this.matchQuestionArray;
    
    this.matchService.savePredictionQuest(this.userPrediction).subscribe(
      data => {
        if("SUCCESS"==data){
          this.successDialogService.setMessage('Successfully Saved...', 'Info');
          this.modalService.open(SuccessDialogComponent);
        }
        if("FAILURE"==data){
          this.successDialogService.setMessage('Failure to save your prediction. Please try again after sometimes...', 'Info');
          this.modalService.open(SuccessDialogComponent);
        }
      },
      error => {
        console.log("Error");
        console.log(error);
        this.successDialogService.setMessage('Something went wrong. Please try again after sometimes...', 'Warning');
        this.modalService.open(SuccessDialogComponent);
      }
    );
    
    sessionStorage.setItem('questSessionInprogress', 'false');
    this.sendMessage('saved');
    this.router.navigateByUrl('/wcpredict/dashboard');
    // window.location.reload();
    // window.location.href = "/wcpredict/dashboard";
  }

  gotoDashboard() {
    if (sessionStorage.getItem('questSessionInprogress') == 'true') {
      // alert('Please Save/Submit your current question session');
      this.modalService.open(ConfirmDialogComponent);
      return false;
    } else {
      sessionStorage.setItem('questSessionInprogress', 'false');
      this.sendMessage('closed');
      this.router.navigate(['/wcpredict/dashboard']);

    }
  }

  public inputValidator(event: any) {
    //console.log(event.target.value);
    const pattern = /^[a-zA-Z0-9]*$/;   
    //let inputChar = String.fromCharCode(event.charCode)
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-zA-Z0-9]/g, "");
      // invalid character, prevent input

    }
  }

  closeSession() {
    sessionStorage.setItem('questSessionInprogress', 'false');
    this.sendMessage('closed');
    this.router.navigate(['/wcpredict/dashboard']);

  }

  valueChangeAlert(){
    this.modalService.open(WarningDialogComponent);
  }
}
