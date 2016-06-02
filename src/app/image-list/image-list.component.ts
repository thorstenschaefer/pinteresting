import { Component, Input, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Image } from '../image';
import { UserService } from '../user.service';

@Component({
  moduleId: module.id,
  selector: 'app-image-list',
  templateUrl: 'image-list.component.html',
  directives: [ROUTER_DIRECTIVES]
})
export class ImageListComponent implements OnInit {

  @Input() images:Image[];


  private user:string;
  
  constructor(private userService:UserService) {
    this.userService.user.subscribe(user => this.user = user);
  }

  ngOnInit() {
  }

  delete(image:Image) {
    this.userService.deleteImage(image);
  }
  
  like(image:Image) {
    this.userService.likeImage(image);
  }
  
  share(image:Image) {
    this.userService.shareImage(image, this.user);
  }
}
