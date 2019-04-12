import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IMatchDetails } from './imatch-details';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private http: HttpClient) { }

  restURL: string = 'http://10.252.52.159:8080/game/matchschedule';
  
  getMatchScheduleList(): Observable<IMatchDetails[]>{
    return this.http.get<IMatchDetails[]>(this.restURL);
  }
}
