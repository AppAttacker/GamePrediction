import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatchScheduleComponent } from './match-schedule/match-schedule.component';
import { MatchDetailsComponent } from './match-details/match-details.component';
import { HttpClientModule } from '@angular/common/http';
import { UserTemplateComponent } from './user-template/user-template.component';
import { LeaderBoardComponent } from './leader-board/leader-board.component';
import { QuestionaryComponent } from './questionary/questionary.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IdleTimeOutService } from './service/idle-time-out.service';
import { RegisterComponent } from './register/register.component';
import { FilterFixtureByTeamPipe } from './filter/filter-fixture-by-team.pipe';
import { AnswerComponent } from './answer/answer.component';
import { NumericDirective } from './directives/numeric.directive';
import { BlockcopypasteDirective } from './directives/blockcopypaste.directive';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ConfirmDialogService } from './service/confirm-dialog.service';

@NgModule({
  declarations: [
    AppComponent,
    MatchScheduleComponent,
    MatchDetailsComponent,
    UserTemplateComponent,
    LeaderBoardComponent,
    QuestionaryComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    FilterFixtureByTeamPipe,
    AnswerComponent,
    NumericDirective,
    BlockcopypasteDirective,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
    
  ],
  
  providers: [IdleTimeOutService,ConfirmDialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
