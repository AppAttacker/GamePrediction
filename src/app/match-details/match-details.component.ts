import { Component, OnInit, Input } from '@angular/core';
import { IMatchDetails } from '../imatch-details';

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.css']
})
export class MatchDetailsComponent implements OnInit {

  constructor() { }

  @Input()
  matchDetails: IMatchDetails;

  ngOnInit() {
  }

  goTOQuestionPaper(){
    alert("test");
  }

}
