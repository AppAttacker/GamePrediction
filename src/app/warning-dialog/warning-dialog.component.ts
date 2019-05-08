import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { MessageService } from '../service/message.service';

@Component({
  selector: 'app-warning-dialog',
  templateUrl: './warning-dialog.component.html',
  styleUrls: ['./warning-dialog.component.css']
})
export class WarningDialogComponent implements OnInit {

  constructor(private activeModal : NgbActiveModal, private messageService: MessageService, private router: Router) { }

  ngOnInit() {
  }

  valueChangeAlertConfirm(){
    sessionStorage.setItem('questSessionInprogress', 'false');    
    this.sendMessage('closed');
    this.activeModal.close();
    this.router.navigate(['/wcpredict/dashboard']);
  }

  sendMessage(questSessionStatus: string): void {
    // send message to subscribers via observable subject
    this.messageService.sendMessage(questSessionStatus);
  }

}
