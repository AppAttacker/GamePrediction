import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { UserPrediction } from '../modal/user-prediction';
import { UserDashboard } from '../modal/user-dashboard';
import { Match } from '../modal/match';
import { User } from '../modal/user';


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
  matchScheduleUrl: string = 'http://'+this.hostURL+':8084/gameprediction/api/matchfixture';
  // matchScheduleUrl: string = 'http://'+this.hostURL+':8084/gameprediction/api/matchdetails';


  // getMatchScheduleList(userId: number): Observable<MatchDetails> {
  //   // return this.http.get<IMatchDetails[]>(this.restURL);
  //   const params = new HttpParams().set('userId', userId+"");
  //   return this.http.get<MatchDetails>(this.matchScheduleUrl,{params});
  // }

  getMatchScheduleList(userId: number): Observable<Match[]> {
    // return this.http.get<IMatchDetails[]>(this.restURL);
    const params = new HttpParams().set('userId', userId+"");
    return this.http.get<Match[]>(this.matchScheduleUrl,{params});
  }

  getPredictionQuest(userId: number, matchId: number): Observable<UserPrediction> {
    //?matchId=1&userId=1
    const params = new HttpParams().set('userId', userId + "").set('matchId', matchId + "");
    return this.http.get<UserPrediction>(this.questionUrl, { params });
  }

  savePredictionQuest(userPrediction: UserPrediction):Observable<any> {
    console.log("inside savePredictionQuest");
    console.log(userPrediction);
    return this.http.post(this.questionSaveUrl, userPrediction, {responseType: 'text'});
  }

  submitPredictionQuestByUser(userPrediction: UserPrediction):Observable<any> {
    console.log("inside submitPredictionQuestByUser");
    console.log(userPrediction);
    return this.http.post(this.questionSubmitUrl, userPrediction, {responseType: 'text'});
  }

  submitPredictionQuestByAdmin(userPrediction: UserPrediction):Observable<any> {
    console.log("inside submitPredictionQuestByAdmin");
    console.log(userPrediction);
    return this.http.post(this.questionAdminSubmitUrl, userPrediction, {responseType: 'text'})
  }

  getUserDashboard(userid: string): Observable<UserDashboard[]> {
    console.log("inside getUserDashboard...");
    const params = new HttpParams().set('userId', userid);
    return this.http.get<UserDashboard[]>(this.userDashgboardUrl, { params })
  }

  getLeaderboard() {
    console.log("inside getLeaderboard...");
    return this.http.get<User[]>(this.leaderBoardUrl);
  }
  
}
