import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// var CanvasJS = require('./canvasjs.min');

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatchScheduleComponent } from './match-schedule/match-schedule.component';
import { MatchDetailsComponent } from './match-details/match-details.component';
import { HttpClientModule } from '@angular/common/http';
import { UserTemplateComponent } from './user-template/user-template.component';
import { LeaderBoardComponent } from './leader-board/leader-board.component';
import { QuestionaryComponent } from './questionary/questionary.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    MatchScheduleComponent,
    MatchDetailsComponent,
    UserTemplateComponent,
    LeaderBoardComponent,
    QuestionaryComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '', component: UserTemplateComponent},
      {path: 'predictionPage/:id', component: QuestionaryComponent},
    ])
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
