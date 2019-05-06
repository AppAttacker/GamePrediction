import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { UserPrediction } from '../modal/user-prediction';
import { UserDashboard } from '../modal/user-dashboard';
import { Leaderboard } from '../modal/leaderboard';
import { Match } from '../modal/match';
import { MatchQuestions } from '../modal/match-questions';
import { error } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private http: HttpClient) { }

  // 10.252.52.157
  restURL: string = 'http://localhost:8080/game/matchschedule';
  questionUrl: string = 'http://localhost:8084/gameprediction/api/getQuestions';
  questionSaveUrl: string = 'http://localhost:8084/gameprediction/api/saveDetails';
  userdashgboardUrl: string = 'http://localhost:8084/gameprediction/api/userdashboard';
  leaderUrl: string = 'http://localhost:8084/gameprediction/api/leaderdashboard';
  matchScheduleUrl: string = 'http://localhost:8084/gameprediction/api/matchfixture';


  getMatchScheduleList(): Observable<Match[]> {
    // return this.http.get<IMatchDetails[]>(this.restURL);
    return this.http.get<Match[]>(this.matchScheduleUrl);
  }

  getPredictionQuest(userId: number, matchId: number): Observable<UserPrediction> {
    //?matchId=1&userId=1
    const params = new HttpParams().set('userId', userId + "").set('matchId', matchId + "");
    return this.http.get<UserPrediction>(this.questionUrl, { params });
  }

  submitPredictionQuest(userPrediction: UserPrediction) {
    
    console.log("inside submitPredictionQuest");
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

  getUserDashboard(userid: string): Observable<UserDashboard[]> {
    console.log("inside getUserDashboard...");
    const params = new HttpParams().set('userId', "1");
    return this.http.get<UserDashboard[]>(this.userdashgboardUrl, { params })
  }

  getLeaderboard() {
    console.log("inside getLeaderboard...");
    return this.http.get<Leaderboard[]>(this.leaderUrl);
  }
}
