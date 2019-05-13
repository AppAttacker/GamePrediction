import { Injectable } from '@angular/core';

interface Alert {
    type: string;
    message: string;
  }

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {

    alert : Alert = {type : '', message : ''};

    setMessage(message, type){
        this.alert.message = message;
        this.alert.type = type;
    }

    getMessage(){
        return this.alert;
    }
    clearMessage(){
        this.alert.message = "";
        this.alert.type = "";
    }
  
}
