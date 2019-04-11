import { Component, OnInit } from '@angular/core';

declare var CanvasJS: any;

@Component({
  selector: 'app-user-template',
  templateUrl: './user-template.component.html',
  styleUrls: ['./user-template.component.css']
})
export class UserTemplateComponent implements OnInit {

  constructor() { }

  ngOnInit() { 
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: false,
      title: {
        text: "Your score gained so far..."
      },
      backgroundColor: "white",
      data: [{
        type: "column",
        dataPoints: [
          { y: 71, label: "Match1" },
          { y: 55, label: "Match2" },
          { y: 50, label: "Match3" },
          { y: 65, label: "Match4" },
          { y: 95, label: "Match5" },
          { y: 68, label: "Match6" },
          { y: 28, label: "Match7" },
          { y: 34, label: "Match8" },
          { y: 71, label: "Match9" },
          { y: 55, label: "Match10" },
          { y: 50, label: "Match11" },
          { y: 65, label: "Match12" },
          { y: 95, label: "Match13" },
          { y: 68, label: "Match14" },
          { y: 28, label: "Match15" },
          { y: 34, label: "Match16" },
          { y: 14, label: "Match17" }
        ]
      }]
    });
      
    chart.render();
  }
  
   
}

