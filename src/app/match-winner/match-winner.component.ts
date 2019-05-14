import { Component, OnInit, Input } from '@angular/core';
import { MatchService } from '../service/match.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatchDashboard } from '../modal/match-dashboard';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Match } from '../modal/match';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-match-winner',
  templateUrl: './match-winner.component.html',
  styleUrls: ['./match-winner.component.css']
})
export class MatchWinnerComponent implements OnInit {

  matchDashboardArray: MatchDashboard[] = [];
  matchId: number;

  constructor(private router: Router, private matchService: MatchService, public route: ActivatedRoute, private modalService : NgbModal) {
    
  }

  @Input()
  matchDetails: Match;

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      this.matchId = routeParams.id;
      this.getMatchDashboardData();
    });    
  }

  getMatchDashboardData(){
    const matchDashboardObserve = this.matchService.getMatchDashboard(this.matchId);
    matchDashboardObserve.subscribe((matchData: MatchDashboard[]) => {
      this.matchDashboardArray = matchData;
      // matchData.forEach(element => {
      //   if(element.noOfMatchPlayed>0){
      //     this.matchDashboardArray.push(element);
      //   }
      // });
    });
  }

  // updateMatchList(){
  //     this.matchDashboardArray = [];
  //     this.getMatchDashboardData()
  // }

  gotoDashboard() {
   this.router.navigate(['/wcpredict/dashboard']);
  }

}
