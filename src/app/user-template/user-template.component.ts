import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { MatchService } from '../service/match.service';
import { UserDashboard } from '../modal/user-dashboard';
import { ChartData } from '../modal/chart-data';
import { ActivatedRoute, Router } from '@angular/router';

declare var CanvasJS: any;

@Component({
  selector: 'app-user-template',
  templateUrl: './user-template.component.html',
  styleUrls: ['./user-template.component.css']
})
export class UserTemplateComponent implements OnInit {

  userDashboardArray: UserDashboard[] = []; 
  userDashoard: UserDashboard; 
  totMatchPlayed: number;
  totScore: number = 0;
  rank: string;
  chartDataArray: ChartData[] = [];
  chartData: ChartData;
  chart: any;
  userType: string;
  
  constructor(private matchService:MatchService, private router: Router, public route: ActivatedRoute) { }

  ngOnInit() { 
    this.userType = sessionStorage.getItem('userType');
    if(this.userType == 'admin'){
      this.router.navigate([ 'answerPage'], { relativeTo: this.route });
    }
    this.getUserDashboardData();
    this.rank = sessionStorage.getItem("rank");

    // this.setChartData();
    
    this.chart = new CanvasJS.Chart("chartContainer", {
      // animationEnabled: true,
      exportEnabled: false,
      title: {
        text: ""
      },
      backgroundColor: "white",
      data: [{
        type: "column",
        dataPoints: this.chartDataArray
      }]
    });
      
    this.chart.render();
  }

  ngAfterViewChecked(){
    this.chart.render();
  }
  
  getUserDashboardData(){
    const userDashboardObserve = this.matchService.getUserDashboard(sessionStorage.getItem("userid"));
    userDashboardObserve.subscribe((matchData: UserDashboard[]) => {
        for (var i = 0; i < matchData.length; i++) {
          this.chartData = { "y": matchData[i].points, "label": "Match: "+matchData[i].match.matchid }
          this.chartDataArray.push(this.chartData);
          this.totScore = this.totScore + matchData[i].points;
        }
        this.userDashboardArray = matchData;
        this.totMatchPlayed = matchData.length;
        
    });
    
  }
}

