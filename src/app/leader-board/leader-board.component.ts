import { Component, OnInit } from '@angular/core';
import { MatchService } from '../service/match.service';
import { Leaderboard } from '../modal/leaderboard';
import { LeaderboardData } from '../modal/leaderboard-data';
import { UserDashboard } from '../modal/user-dashboard';
import { User } from '../modal/user';

@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.css']
})
export class LeaderBoardComponent implements OnInit {

  user : User;
  userArray : User[] = [];
   
  constructor(private matchService: MatchService) { }

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
      alert('Please Save/Submit your current question session');
    }else{
      this.userArray = [];
      this.getLeaderboardData()
    }
    return false;
  }

}
