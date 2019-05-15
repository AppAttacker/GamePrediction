import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../service/message.service';
import { MatchService } from '../service/match.service';
import { User } from '../modal/user';
import { Match } from '../modal/match';
import { Players } from '../modal/players';
import { MatchQuestions } from '../modal/match-questions';
import { UserPrediction } from '../modal/user-prediction';
import { FormGroup, FormControl } from '@angular/forms';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ConfirmDialogService } from '../service/confirm-dialog.service';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';


@Component({
  selector: 'app-questionary-modal',
  templateUrl: './questionary-modal.component.html',
  styleUrls: ['./questionary-modal.component.css']
})
export class QuestionaryModalComponent implements OnInit {

  closeResult: string;

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

  @Input() matchId : number;

  constructor(private modalService: NgbModal, private activeModal : NgbActiveModal, private router: Router, private route: ActivatedRoute, private messageService: MessageService, private matchService: MatchService,private successDialogService : ConfirmDialogService) {}

  ngOnInit() {
    console.log('inside question component');
    console.log(parseInt("100"));
    console.log(sessionStorage.getItem('userid'));
    this.id = this.matchId;
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
      if (element.question.category == 4 && element.answer != "" && element.answer != null) {
        element.answer = this.winMarginType + "_" + element.answer
      }
      
      console.log(element);
      console.log(this.winMarginType);
    });
    this.userPrediction.matchQuestions = this.matchQuestionArray;
    
    this.matchService.submitPredictionQuestByUser(this.userPrediction).subscribe(
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
  }

  onSave() {
    // TODO: Use EventEmitter with form value
    this.matchQuestionArray.forEach(element => {
      if (element.question.category == 4 && element.answer != "" && element.answer != null) {
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
    this.activeModal.close();
    // this.router.navigate(['/wcpredict/dashboard']);
  }

  checkforvaluechange(){
    alert("hi");
    this.activeModal.dismiss('Cross click');
  }

  valueChangeAlert(){
    this.modalService.open(NgbdModal1Content);
  }  

}

@Component({
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Alert</h4>
      <button type="button" class="close" aria-label="Close" (click)="alertActiveModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Identified Changes. Do you want to continue without save ?</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="alertActiveModal.close('Close click')">No</button>
      <button type="button" class="btn btn-outline-dark" (click)="valueChangeAlertConfirm();">Yes</button>
    </div>
  `
})
export class NgbdModal1Content {
  constructor(private modalService: NgbModal, public alertActiveModal: NgbActiveModal) {}
  
  valueChangeAlertConfirm(){
    sessionStorage.setItem('questSessionInprogress', 'false');
    this.modalService.dismissAll();
  }
}
