import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../modal/user';
import { Match } from '../modal/match';
import { Players } from '../modal/players';
import { MatchQuestions } from '../modal/match-questions';
import { UserPrediction } from '../modal/user-prediction';
import { MatchService } from '../service/match.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {

  winMarginType: string = "R";
  user: User;
  match: Match;
  player: Players;
  playerArray: Players[] = [];
  matchQuestion: MatchQuestions;
  matchQuestionArray: MatchQuestions[];
  userPrediction: UserPrediction;

  matchSchedule: Match;
  matchScheduleArray: Match[] = [];

  id: any;
  username: string;
  userId: number;

  constructor(private router: Router, private route: ActivatedRoute, private matchService: MatchService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.username = sessionStorage.getItem('username');
    this.userId = parseInt(sessionStorage.getItem('userid'));
    this.getMatchList();
    // this.loadQuestions();
  }
  
  loadQuestions(event: Event){
    alert("inside answer comp -  load qiestion"+event.target);
    const userQuestObserve = this.matchService.getPredictionQuest(this.userId, this.id);
    userQuestObserve.subscribe((userPrediction: UserPrediction) => {
      this.userPrediction = userPrediction; 
      this.user = userPrediction.user;
      this.match = userPrediction.match;
      this.playerArray = userPrediction.players;
      this.matchQuestionArray = userPrediction.matchQuestions;
    });
  }

  getMatchList(){
    return this.matchService.getMatchScheduleList().subscribe(
        // matchObj => this.matchList = matchObj
        matchObj => this.matchScheduleArray = matchObj
    );
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.matchQuestionArray.forEach(element => {
      if (element.question.category == 2) {
        element.answer = this.winMarginType + "_" + element.answer
      }

      console.log(element);
      console.log(this.winMarginType);
    });
    this.userPrediction.matchQuestions = this.matchQuestionArray;
    
    this.matchService.submitPredictionQuest(this.userPrediction);
    sessionStorage.setItem('questSessionInprogress', 'false');
    this.router.navigateByUrl('/wcpredict/dashboard');
    // window.location.href = "/wcpredict/dashboard";
  }

  closeSession() {
    this.router.navigate(['/wcpredict/dashboard']);
  }

}
