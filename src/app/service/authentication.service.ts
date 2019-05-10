import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../modal/user';
import { Observable } from 'rxjs';
import { Register } from '../modal/register';
import { Login } from '../modal/login';

interface Alert {
  type: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  alert : Alert = {type : '', message : ''};

  hostURL: string ='localhost';
  // hostURL: string ='10.252.52.157';

  registrationUrl: string = 'http://'+this.hostURL+':8084/gameprediction/api/user/register';
  loginUrl: string = 'http://'+this.hostURL+':8084/gameprediction/api/user/login';
  pingUrl: string = 'http://'+this.hostURL+':8084/gameprediction/api/user/ping';

  constructor(private http: HttpClient) { }

  setMessage(message, type){
    this.alert.message = message;
    this.alert.type = type;
  }

  getMessage(){
    return this.alert;
  }

  login(loginObject : Login) : Observable<User> {
    return this.http.post<User>(this.loginUrl, loginObject)
      .pipe(map(user => {
        if(user) {
          let rank : string;
          sessionStorage.setItem('userloggedIn','true');
          sessionStorage.setItem('userid', String(user.userId));
          sessionStorage.setItem('username',user.userName);
          sessionStorage.setItem('fistname',user.firstName);
          sessionStorage.setItem('rank',String(user.rank));
          sessionStorage.setItem('userType',user.userType);
        }
        return user;
      }));
    // sessionStorage.setItem('userloggedIn','true');
    // sessionStorage.setItem('userid','1');
    // sessionStorage.setItem('username',username);
    // sessionStorage.setItem('rank',"15");
    // sessionStorage.setItem('userType',"participant");
    // return null;
  }

  register(register: Register) : Observable<string> {
    return this.http.post(this.registrationUrl, register, {responseType: 'text'});
  }

  verifyApplicationStatus() : Observable<string> {
    return this.http.get(this.pingUrl, {responseType: 'text'});        
  }
}
