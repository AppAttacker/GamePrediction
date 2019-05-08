import { Component, OnInit } from '@angular/core';
import { MatchService } from '../service/match.service';
import { Match } from '../modal/match';
import { MatchDetails } from '../modal/match-details';

@Component({
  selector: 'app-match-schedule',
  templateUrl: './match-schedule.component.html',
  styleUrls: ['./match-schedule.component.css']
})
export class MatchScheduleComponent implements OnInit  {

  filterteamName: string;
  userType: string;

  constructor(private matchService: MatchService) { 
    console.log("inside MatchScheduleComponent");
  }

  matchSchedule: Match;
  matchScheduleArray: Match[] = [];
  matchDetails: MatchDetails;
  userMatches: Match[] = [];
  overallMatches: Match[] = [];

  ngOnInit() {
    this.userType = sessionStorage.getItem('userType');
    this.getMatchList();
    console.log("list data...");
    console.log(this.matchScheduleArray);
    
  }

  getMatchList(){

    const userMatchObserve = this.matchService.getMatchScheduleList(1);
    userMatchObserve.subscribe((matchDetail: MatchDetails) => {
      this.userMatches = matchDetail.userMatches;
      this.overallMatches = matchDetail.overallMatches;
    });
  }
  updateMatchList(){
    if (sessionStorage.getItem('questSessionInprogress') == 'true') {
      alert('Please Save/Submit your current question session');
    }else{
      this.getMatchList();
    }
    return false; 
  }

}
