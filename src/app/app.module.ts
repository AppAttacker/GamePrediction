import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatchScheduleComponent } from './match-schedule/match-schedule.component';
import { MatchDetailsComponent } from './match-details/match-details.component';
// import { HttpClientModule } from '@angular/common/http';
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
import { QuestionaryModalComponent, NgbdModal1Content } from './questionary-modal/questionary-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WarningDialogComponent } from './warning-dialog/warning-dialog.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HTTPListener, HTTPStatus } from './httpstatus';
import { LoaderPageComponent } from './loader/loader-page/loader-page.component';
import { SuccessDialogComponent } from './success-dialog/success-dialog.component';


const RxJS_Services = [HTTPListener, HTTPStatus];

@NgModule({
  entryComponents: [
    QuestionaryModalComponent,
    ConfirmDialogComponent,
    NgbdModal1Content,
    WarningDialogComponent,
    SuccessDialogComponent
  ],
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
    ConfirmDialogComponent,
    QuestionaryModalComponent,
    NgbdModal1Content,
    WarningDialogComponent,
    LoaderPageComponent,
    SuccessDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule
  ],
  
  providers: [IdleTimeOutService,ConfirmDialogService,
                RxJS_Services,
                {
                  provide: HTTP_INTERCEPTORS,
                  useClass: HTTPListener,
                  multi: true
                }  
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
