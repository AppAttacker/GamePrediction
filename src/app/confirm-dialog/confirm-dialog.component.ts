import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ConfirmDialogService } from '../service/confirm-dialog.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
    @ViewChild('exampleModalCenter') el:ElementRef;
    
    modalWindow: any;

    constructor(private confirmDialogService: ConfirmDialogService ) { }  
  
    ngOnInit() { 
      // this.modalWindow = this;
      this.confirmDialogService.add(this.el.nativeElement);
      this.showDialog();
    } 

    showDialog(){
      this.modalWindow.modal('show');
    }

}
