import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-questionary',
  templateUrl: './questionary.component.html',
  styleUrls: ['./questionary.component.css']
})
export class QuestionaryComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  
  id : any;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

}
