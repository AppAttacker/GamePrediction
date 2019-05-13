import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-match-winner',
  templateUrl: './match-winner.component.html',
  styleUrls: ['./match-winner.component.css']
})
export class MatchWinnerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  updateMatchList(){
    alert("inside match winner page..");
  }

}
