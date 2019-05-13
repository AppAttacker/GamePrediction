import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogService } from '../service/confirm-dialog.service';
import { Router } from '@angular/router';
import { MessageService } from '../service/message.service';

interface Alert {
  type: string;
  message: string;
}

@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.css']
})
export class SuccessDialogComponent implements OnInit {

  title: string;
  message: string;
  alert : Alert;

  constructor(private activeModal : NgbActiveModal, 
        private confirmDialog: ConfirmDialogService, 
        private router: Router, 
        private messageService: MessageService) { }

  ngOnInit() {

    this.alert = this.confirmDialog.getMessage();
      if(null != this.alert.message && '' != this.alert.message && null != this.alert.type && '' != this.alert.type){
        this.title = this.alert.type;
        this.message = this.alert.message;
      } 
  }

  sendMessage(questSessionStatus: string): void {
    // send message to subscribers via observable subject
    this.messageService.sendMessage(questSessionStatus);
  }

  closePopup(){
    this.activeModal.close('Cross click');
    this.confirmDialog.clearMessage();
    sessionStorage.setItem('questSessionInprogress', 'false');
    this.sendMessage('saved');
    this.router.navigateByUrl('/wcpredict/dashboard');
  }

}
