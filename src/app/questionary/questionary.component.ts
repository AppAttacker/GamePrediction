import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Question } from '../question';
import { IMatchDetails } from '../imatch-details';

@Component({
  selector: 'app-questionary',
  templateUrl: './questionary.component.html',
  styleUrls: ['./questionary.component.css']
})
export class QuestionaryComponent implements OnInit {

  questionForm = new FormGroup({
    question: new FormControl('Who will win this match:'),
    answer: new FormControl(''),
  });

  question1: Question={descript: 'what will be the winning margin?', answer:0, type:'range', priority:true};
  question2: Question={descript: 'who will be man of the match award winner?', answer:'', type:'type1', priority:true};
  question3: Question={descript: 'who will hit max(distance) six?', answer:'', type:'type2', priority:true};
  question4: Question={descript: 'who will take maximum wicket in this match?', answer:'', type:'range', priority:true};
  question5: Question={descript: 'who will win toss?', answer:0, type:'range', priority:true};

  questions: Question[] ;
  questionList = [this.question1,this.question2,this.question3,this.question4,this.question5];
  
  constructor(private route: ActivatedRoute) { }
  
  id : any;
  // matchDetails: any;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    // this.matchDetails = this.route.snapshot.paramMap.get('id');
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.questionList.forEach(element => {
      console.log(element);
    }); 
    // console.log(JSON.stringify(this.questionList));
  }

  setupdatedValue(){

  }

}
