import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES, RouteSegment, RouteTree, OnActivate } from '@angular/router';

import { Image } from '../image';
import { UserService } from '../user.service';
import { ImageListComponent } from '../image-list/image-list.component';

@Component({
  moduleId: module.id,
  selector: 'app-user',
  templateUrl: 'user.component.html',
  directives: [ImageListComponent]
})
export class UserComponent implements OnInit {

  private user:string;
  private images:Image[];

  constructor(private userService:UserService) {}

  ngOnInit() {
  }

  routerOnActivate(curr: RouteSegment, prev?: RouteSegment, currTree?: RouteTree, prevTree?: RouteTree): void {
    this.user = curr.getParam('user');
    this.userService.getImagesForUser(this.user).subscribe(images => {
      this.images = images;
    });
  }  
}
