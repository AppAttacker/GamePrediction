import { Component, OnInit } from '@angular/core';
import { MatchService } from '../service/match.service';
import { Leaderboard } from '../modal/leaderboard';
import { LeaderboardData } from '../modal/leaderboard-data';
import { UserDashboard } from '../modal/user-dashboard';
import { User } from '../modal/user';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.css']
})
export class LeaderBoardComponent implements OnInit {

  user : User;
  userArray : User[] = [];
   
  constructor(private matchService: MatchService, private modalService : NgbModal) { }

  ngOnInit() {
    this.getLeaderboardData();
  }
  
  getLeaderboardData(){
    const leaderboardObserve = this.matchService.getLeaderboard();
    leaderboardObserve.subscribe((userData: User[]) => {
        this.userArray = userData;
    });
  }

  updateMatchList(){
    if (sessionStorage.getItem('questSessionInprogress') == 'true') {
      // alert('Please Save/Submit your current question session');
      this.modalService.open(ConfirmDialogComponent);
    }else{
      this.userArray = [];
      this.getLeaderboardData()
    }
    return false;
  }

}
