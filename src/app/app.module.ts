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
import { DashboardComponent } from './dashboard/dashboard.component';
import { IdleTimeOutService } from './service/idle-time-out.service';

@NgModule({
  declarations: [
    AppComponent,
    MatchScheduleComponent,
    MatchDetailsComponent,
    UserTemplateComponent,
    LeaderBoardComponent,
    QuestionaryComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule
    // RouterModule.forRoot([
    //   {path: '', component: UserTemplateComponent},
    //   {path: 'predictionPage/:id', component: QuestionaryComponent},
    //   {path: 'wcpredict/login', component: LoginComponent},
    //   {path: 'wcpredict/dashboard', component: DashboardComponent}
    // ])
    
  ],
  providers: [IdleTimeOutService],
  bootstrap: [AppComponent]
})
export class AppModule { }
