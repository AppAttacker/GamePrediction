import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { UserPrediction } from '../modal/user-prediction';
import { UserDashboard } from '../modal/user-dashboard';
import { Leaderboard } from '../modal/leaderboard';
import { Match } from '../modal/match';
import { MatchQuestions } from '../modal/match-questions';
import { error } from '@angular/compiler/src/util';
import { User } from '../modal/user';
import { MatchDetails } from '../modal/match-details';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private http: HttpClient) { }

  // 10.252.52.157
  hostURL: string ='localhost';
  // hostURL: string ='10.252.52.157';

  restURL: string = 'http://localhost:8080/game/matchschedule';
  questionUrl: string = 'http://'+this.hostURL+':8084/gameprediction/api/getQuestions';

  questionSaveUrl: string = 'http://'+this.hostURL+':8084/gameprediction/api/saveDetails';
  questionSubmitUrl: string = 'http://'+this.hostURL+':8084/gameprediction/api/submitDetails';
  questionAdminSubmitUrl: string = 'http://'+this.hostURL+':8084/gameprediction/api/submitfinalanswer';

  userDashgboardUrl: string = 'http://'+this.hostURL+':8084/gameprediction/api/userdashboard';
  leaderBoardUrl: string = 'http://'+this.hostURL+':8084/gameprediction/api/leaderdashboard';
  // matchScheduleUrl: string = 'http://'+this.hostURL+':8084/gameprediction/api/matchfixture';
  matchScheduleUrl: string = 'http://'+this.hostURL+':8084/gameprediction/api/matchdetails';


  getMatchScheduleList(userId: number): Observable<MatchDetails> {
    // return this.http.get<IMatchDetails[]>(this.restURL);
    const params = new HttpParams().set('userId', "1");
    return this.http.get<MatchDetails>(this.matchScheduleUrl,{params});
  }

  getPredictionQuest(userId: number, matchId: number): Observable<UserPrediction> {
    //?matchId=1&userId=1
    const params = new HttpParams().set('userId', userId + "").set('matchId', matchId + "");
    return this.http.get<UserPrediction>(this.questionUrl, { params });
  }

  savePredictionQuest(userPrediction: UserPrediction) {
    console.log("inside savePredictionQuest");
    console.log(userPrediction);
    this.http.post(this.questionSaveUrl, userPrediction).subscribe(
      data => {
        console.log("POST Request is successful ", data);
      },
      error => {
        console.log("Error", error);
      }
    );
  }

  submitPredictionQuestByUser(userPrediction: UserPrediction) {
    console.log("inside submitPredictionQuestByUser");
    console.log(userPrediction);
    this.http.post(this.questionSubmitUrl, userPrediction).subscribe(
      data => {
        console.log("POST Request is successful ", data);
      },
      error => {
        console.log("Error", error);
      }
    );
  }

  submitPredictionQuestByAdmin(userPrediction: UserPrediction) {
    console.log("inside submitPredictionQuestByAdmin");
    console.log(userPrediction);
    this.http.post(this.questionAdminSubmitUrl, userPrediction).subscribe(
      data => {
        console.log("POST Request is successful ", data);
      },
      error => {
        console.log("Error", error);
      }
    );
  }

  getUserDashboard(userid: string): Observable<UserDashboard[]> {
    console.log("inside getUserDashboard...");
    const params = new HttpParams().set('userId', "1");
    return this.http.get<UserDashboard[]>(this.userDashgboardUrl, { params })
  }

  getLeaderboard() {
    console.log("inside getLeaderboard...");
    return this.http.get<User[]>(this.leaderBoardUrl);
  }
  
}
