import { Component, OnInit } from '@angular/core';
import { MatchService } from '../match.service';
import { IMatchDetails } from '../imatch-details';

@Component({
  selector: 'app-match-schedule',
  templateUrl: './match-schedule.component.html',
  styleUrls: ['./match-schedule.component.css']
})
export class MatchScheduleComponent implements OnInit {

  constructor(private matchService: MatchService) { }

  matchDetails: IMatchDetails={id: 1, name: "England vs South Africa (ICC Cricket World Cup 2019)",
                              description: "Next Match",
                              eventStatus: "Upcoming",
                              startDate: "05/30/2019 09:30:00 AM",
                              from: "ind",
                              to: "pak"};
  matchList: IMatchDetails[];

  ngOnInit() {
    this.getMatchList();
    console.log("list data...");
    console.log(this.matchList);
    
  }

  getMatchList(){
    return this.matchService.getMatchScheduleList().subscribe(
        matchObj => this.matchList = matchObj
    );
  }
  updateMatchList(){
    alert("list updated..");
  }

}
