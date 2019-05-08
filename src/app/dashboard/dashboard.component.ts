import { Component, OnInit, ɵConsole } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionaryComponent } from '../questionary/questionary.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionaryModalComponent } from '../questionary-modal/questionary-modal.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  title = 'GamePrediction';
  admin = "admin_1";
  username: string;
  private routedComponent: QuestionaryComponent;
  
  constructor(private router: Router, public route: ActivatedRoute, private modalService : NgbModal) { }

  ngOnInit() {
    this.username = sessionStorage.getItem('username');
    console.log('inside dashboard..');
    if(this.username==null){
      this.router.navigateByUrl('/wcpredict');
    }
  }
  resetUserDetails(){
    //alert("logout");
    sessionStorage.clear();
    //alert(sessionStorage.getItem('username'));
    this.username = sessionStorage.getItem('username');
    this.router.navigateByUrl('/wcpredict/dashboard').then(e => {
      if(this.username==null){
        this.router.navigateByUrl('/wcpredict');
      }
    });
  }
  public setRoutedComponent(componentRef: QuestionaryComponent){
    console.log('inside dashboard compoent routing change');
    this.routedComponent = componentRef;
  }

  showAnswerProvider(){
    // this.router.navigate(['answerPage']);
    if (sessionStorage.getItem('questSessionInprogress') == 'true') {
      // alert('Please Save/Submit your current question session');
      this.modalService.open(ConfirmDialogComponent);
    }else{
      this.router.navigate([ 'answerPage'], { relativeTo: this.route });
    }
  }

  openModal() {
    this.modalService.open(QuestionaryModalComponent, {
      backdrop: 'static',
      size: 'lg',
      keyboard: false
  });
  }
}
