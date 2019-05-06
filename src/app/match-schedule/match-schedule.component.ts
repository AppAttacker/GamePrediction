import { Component, OnInit } from '@angular/core';
import { MatchService } from '../service/match.service';
import { Match } from '../modal/match';

@Component({
  selector: 'app-match-schedule',
  templateUrl: './match-schedule.component.html',
  styleUrls: ['./match-schedule.component.css']
})
export class MatchScheduleComponent implements OnInit  {

  filterteamName: string;

  constructor(private matchService: MatchService) { 
    console.log("inside MatchScheduleComponent");
  }

  // matchDetails: IMatchDetails={id: 1, name: "England vs South Africa (ICC Cricket World Cup 2019)",
  //                             description: "Next Match",
  //                             eventStatus: "Upcoming",
  //                             startDate: "05/30/2019 09:30:00 AM",
  //                             from: "ind",
  //                             to: "pak"};
  // matchList: IMatchDetails[];
  matchSchedule: Match;
  matchScheduleArray: Match[] = [];

  ngOnInit() {
    this.getMatchList();
    console.log("list data...");
    console.log(this.matchScheduleArray);
    
  }

  getMatchList(){
    return this.matchService.getMatchScheduleList().subscribe(
        // matchObj => this.matchList = matchObj
        matchObj => this.matchScheduleArray = matchObj
    );
  }
  updateMatchList(){
    if (sessionStorage.getItem('questSessionInprogress') == 'true') {
      alert('Please Save/Submit your current question session');
    }else{
      this.matchService.getMatchScheduleList().subscribe(
        matchObj => this.matchScheduleArray = matchObj
      );
    }
    
    return false; 
  }

}
