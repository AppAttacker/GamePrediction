import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogService } from '../service/confirm-dialog.service';

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

  constructor(private activeModal : NgbActiveModal, private confirmDialog: ConfirmDialogService ) { }

  ngOnInit() {

    this.alert = this.confirmDialog.getMessage();
      if(null != this.alert.message && '' != this.alert.message && null != this.alert.type && '' != this.alert.type){
        this.title = this.alert.type;
        this.message = this.alert.message;
      } 
  }

  closePopup(){
    this.activeModal.close('Cross click');
    this.confirmDialog.clearMessage();
  }

}
