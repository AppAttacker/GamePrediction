import { Component, OnInit } from '@angular/core';
import { MatchService } from '../service/match.service';
import { Match } from '../modal/match';
import { MatchDetails } from '../modal/match-details';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserDashboard } from '../modal/user-dashboard';

@Component({
  selector: 'app-match-schedule',
  templateUrl: './match-schedule.component.html',
  styleUrls: ['./match-schedule.component.css']
})
export class MatchScheduleComponent implements OnInit {

  filterteamName: string;
  userType: string;

  constructor(private matchService: MatchService, private modalService: NgbModal) {
    console.log("inside MatchScheduleComponent");
  }

  matchSchedule: Match;
  matchScheduleArray: Match[] = [];
  matchDetails: MatchDetails;
  // userMatches: Match[] = [];
  overallMatches: Match[] = [];
  matchToBePlay: Match[] = [];

  userPlayedMatchArray: string[] = [];
  userMatchArray: UserDashboard[] = [];
  userDashoard: UserDashboard;
  totMatchPlayed: number;

  ngOnInit() {
    this.userType = sessionStorage.getItem('userType');
    this.getUserDashboardData();
    this.getMatchList();
  }

  getMatchList() {
    const userMatchObserve = this.matchService.getMatchScheduleList(1);
    userMatchObserve.subscribe((matchDetail: MatchDetails) => {
      // this.userMatches = matchDetail.userMatches;
      this.overallMatches = matchDetail.overallMatches;
      // this.matchToBePlay = this.overallMatches;
      console.log("getting overall matches..");
      this.overallMatches.forEach(match => {
        if (this.userPlayedMatchArray.indexOf(match.matchid) ==-1) {
          this.matchToBePlay.push(match);
          console.log(match);
        }
                
      });
      console.log("user match array length: "+this.userMatchArray.length);
      console.log("overall match array length: "+this.overallMatches.length);
      console.log("matchToBePlay match array length: "+this.matchToBePlay.length);
    });
    
  }

  getUserDashboardData() {
    const userDashboardObserve = this.matchService.getUserDashboard(sessionStorage.getItem("userid"));
    userDashboardObserve.subscribe((matchData: UserDashboard[]) => {
      this.userMatchArray = matchData;
      this.userMatchArray.forEach(userMatch => {
        this.userPlayedMatchArray.push(userMatch.match.matchid);
      });

      });

  }

  updateMatchList() {
    // this.userMatches = [];
    this.userMatchArray = [];
    this.overallMatches = [];
    this.matchToBePlay = [];

    this.userMatchArray = [];
    if (sessionStorage.getItem('questSessionInprogress') == 'true') {
      // alert('Please Save/Submit your current question session');
      this.modalService.open(ConfirmDialogComponent);
    } else {
      this.getUserDashboardData();
      this.getMatchList();
      console.log(this.userMatchArray.length);

      console.log(this.userMatchArray);
      console.log(this.overallMatches);
      console.log("test2222");
      console.log(this.matchToBePlay);
    }
    return false;
  }

}
