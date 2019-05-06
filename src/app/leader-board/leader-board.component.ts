import { Component, OnInit } from '@angular/core';
import { MatchService } from '../service/match.service';
import { Leaderboard } from '../modal/leaderboard';
import { LeaderboardData } from '../modal/leaderboard-data';
import { UserDashboard } from '../modal/user-dashboard';

@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.css']
})
export class LeaderBoardComponent implements OnInit {

  leaderboard: Leaderboard;
  leaderboardArray: Leaderboard[] = [];
  leaderboardData: LeaderboardData;
  leaderboardDataArray: LeaderboardData[] = [];
  userDashboardArray: UserDashboard[] = [];
   
  constructor(private matchService: MatchService) { }

  ngOnInit() {
    this.getLeaderboardData();
  }
  
  getLeaderboardData(){
    const leaderboardObserve = this.matchService.getLeaderboard();
    leaderboardObserve.subscribe((leaderboardData: Leaderboard[]) => {
      // let userDashboardArray: UserDashboard[] = [];
      for (var i = 0; i < leaderboardData.length; i++) {
        var totalPoints = 0;
        console.log("leaderboardData[i].userboard");
        console.log(leaderboardData[i].userboard);
        var userDashboardArray = leaderboardData[i].userboard as Array<UserDashboard>;
     
        for (var userDashboard of this.userDashboardArray) {
          totalPoints = totalPoints + userDashboard.points;
        }

        // for (var j = 0; j < this.userDashboard.length; j++) {
        //   totalPoints = totalPoints + this.userDashboard[j].points;
        // }
      
        this.leaderboardData = { rank: 1, username: leaderboardData[i].user.userName, matchCount: this.userDashboardArray.length, score: totalPoints}
        this.leaderboardDataArray.push(this.leaderboardData);
      }
        // this.leaderboardArray = leaderboardData;
    });
  }

  updateMatchList(){
    if (sessionStorage.getItem('questSessionInprogress') == 'true') {
      alert('Please Save/Submit your current question session');
    }else{
      this.leaderboardDataArray = [];
      this.getLeaderboardData()
    }
    return false;
  }

}
