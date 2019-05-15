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
  userId: number;

  constructor(private matchService: MatchService, private modalService: NgbModal) {
    console.log("inside MatchScheduleComponent");
  }

  matchDetails: MatchDetails;
  overallMatches: Match[] = [];
  matchToBePlay: Match[] = [];
  userPlayedMatchArray: string[] = [];
  userMatchArray: UserDashboard[] = [];

  ngOnInit() {
    this.userType = sessionStorage.getItem('userType');
    this.userId = parseInt(sessionStorage.getItem("userid"));
    this.getMatchList();
  }

  getMatchList() {
    const userMatchObserve = this.matchService.getMatchScheduleList(this.userId);
    userMatchObserve.subscribe((matchDetail: MatchDetails) => {
      this.matchDetails = matchDetail;
      console.log("user match array length: " + this.userMatchArray.length);
      console.log("overall match array length: " + this.overallMatches.length);
      console.log("matchToBePlay match array length: " + this.matchToBePlay.length);
    });

  }

  updateMatchList() {
    if (sessionStorage.getItem('questSessionInprogress') == 'true') {
      this.modalService.open(ConfirmDialogComponent);
    } else {
      this.overallMatches = [];
      this.matchToBePlay = [];
      this.userMatchArray = [];
      this.userPlayedMatchArray = [];
      // this.getUserDashboardData();
      this.getMatchList();
    }
    return false;
  }

}
