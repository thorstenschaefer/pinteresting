import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

import { UserService } from '../user.service';

@Component({
  moduleId: module.id,
  selector: 'app-header',
  templateUrl: 'header.component.html',
  directives: [ROUTER_DIRECTIVES]
})
export class HeaderComponent implements OnInit {

  private loggedIn:boolean;
  private user:string;
  
  constructor(
    private router:Router, 
    private userService:UserService
  ) {
    userService.user.subscribe(u => {
      this.user = u;
      this.loggedIn = u != null;
    });
  }

  ngOnInit() {
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/images']);
  }

  login() {
    let promise = this.userService.login();
    // after successful login, redirect to user page
    promise.then(value => {
      let userName = value ? value.twitter.username : null;
      this.router.navigate(['/images', userName]);
    });
  }
}
