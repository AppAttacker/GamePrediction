import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const MINUTES_UNITL_AUTO_LOGOUT = 1 // in mins
const CHECK_INTERVAL = 15000 // in ms
const STORE_KEY =  'lastAction';

@Injectable({
  providedIn: 'root'
})
export class IdleTimeOutService {

  lastTime: number;

  constructor(private router: Router) {
    this.check();
    this.initListener();
    this.initInterval();
    localStorage.setItem(STORE_KEY,Date.now().toString());
   }

  public getLastAction() {
    return parseInt(localStorage.getItem(STORE_KEY));
  }
  public setLastAction(lastAction: number) {
    localStorage.setItem(STORE_KEY, lastAction.toString());
  }

  ngOnInit() {
    //once implemented login pls remove below lines
    sessionStorage.setItem('userloggedIn','true');
    sessionStorage.setItem('userid','karth2k');
    sessionStorage.setItem('username','Karthik');
  }

  initListener() {
    document.body.addEventListener('click', () => this.reset());
    document.body.addEventListener('mouseover',()=> this.reset());
    document.body.addEventListener('mouseout',() => this.reset());
    document.body.addEventListener('keydown',() => this.reset());
    document.body.addEventListener('keyup',() => this.reset());
    document.body.addEventListener('keypress',() => this.reset());
  }

  reset() {
    this.setLastAction(Date.now());
  }

  initInterval() {
    setInterval(() => {
      this.check();
    }, CHECK_INTERVAL);
  }

  check() {
    console.log("checking session...");
    const now = Date.now();
    const timeleft = this.getLastAction() + MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
    const diff = timeleft - now;
    const isTimeout = diff < 0;
    console.log("checking session..."+isTimeout);
    if (isTimeout)  {
      console.log("session timeout...");
      sessionStorage.clear();
      localStorage.clear();
      this.router.navigateByUrl('/wcpredict');
      
    }
  }
}
