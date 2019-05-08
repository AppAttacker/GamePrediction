import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../modal/user';
import { Observable } from 'rxjs';

interface Alert {
  type: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  alert : Alert = {type : '', message : ''};

  constructor(private http: HttpClient) { }

  setMessage(message, type){
    this.alert.message = message;
    this.alert.type = type;
  }

  getMessage(){
    return this.alert;
  }

  login(username: string, password: string) : Observable<User> {
    // return this.http.post<any>(`/users/authenticate`, { username: username, password: password })
    //   .pipe(map(user => {
    //       if (user) {
    //           sessionStorage.setItem('userloggedIn','true');
    //           sessionStorage.setItem('userid','karth2k');
    //           sessionStorage.setItem('username','Karthik');
    //       }
    //       return user;
    //   }));
    sessionStorage.setItem('userloggedIn','true');
    sessionStorage.setItem('userid','1');
    sessionStorage.setItem('username',username);
    sessionStorage.setItem('rank',"15");
    sessionStorage.setItem('userType',"participant");
    return null;
  }

  register(user: User) {
    return this.http.post(`/users/register`, user);
  }
}
