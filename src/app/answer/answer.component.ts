import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../modal/user';
import { Match } from '../modal/match';
import { Players } from '../modal/players';
import { MatchQuestions } from '../modal/match-questions';
import { UserPrediction } from '../modal/user-prediction';
import { MatchService } from '../service/match.service';
import { MatchDetails } from '../modal/match-details';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {

  winMarginType: string = "R";
  matchResult: string;
  user: User;
  match: Match;
  player: Players;
  playerArray: Players[] = [];
  matchQuestion: MatchQuestions;
  matchQuestionArray: MatchQuestions[];
  userPrediction: UserPrediction;

  matchSchedule: Match;
  matchScheduleArray: Match[] = [];

  matchDetails:MatchDetails;

  id: any;
  username: string;
  userId: number;
  selectedMatch: string;
  isSummaryVisible: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private matchService: MatchService) { }

  ngOnInit() {
    this.username = sessionStorage.getItem('username');
    this.userId = parseInt(sessionStorage.getItem('userid'));
    this.getMatchList();
    // this.loadQuestions();
  }
  
  loadQuestions(){
    // alert("inside answer comp -  load question");
    if(this.selectedMatch!=""){
      var str: string = this.selectedMatch.split("-")[0].split(" ")[1];
      // var matchId = str.substr str.length
      console.log(str);
      const userQuestObserve = this.matchService.getPredictionQuest(this.userId, parseInt(str));
      userQuestObserve.subscribe((userPrediction: UserPrediction) => {
        this.userPrediction = userPrediction; 
        this.user = userPrediction.user;
        this.match = userPrediction.match;
        this.playerArray = userPrediction.players;
        this.matchQuestionArray = userPrediction.matchQuestions;
        this.userPrediction.matchQuestions.forEach(element => {
          if (element.question.category == 4 && element.answer != "") {
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
        this.isSummaryVisible = this.userPrediction.matchQuestions.length>0
      });
    }
  }

  getMatchList(){
    return this.matchService.getMatchScheduleList(this.userId).subscribe(
        // matchObj => this.matchList = matchObj
        matchObj => this.matchScheduleArray = matchObj
    );
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.matchQuestionArray.forEach(element => {
      if (element.question.category == 2 && (element.answer != null || element.answer != "")) {
        element.answer = this.winMarginType + "_" + element.answer
      }

      console.log(element);
      console.log(this.winMarginType);
    });
    this.userPrediction.match.matchResult = this.matchResult;
    this.userPrediction.matchQuestions = this.matchQuestionArray;
    
    this.matchService.submitPredictionQuestByAdmin(this.userPrediction);
    this.router.navigateByUrl('/wcpredict/dashboard');
    // window.location.href = "/wcpredict/dashboard";
  }

  closeSession() {
    this.router.navigate(['/wcpredict/dashboard']);
  }

}
