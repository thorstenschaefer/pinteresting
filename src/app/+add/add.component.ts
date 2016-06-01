import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';
import { Image } from '../image';

@Component({
  moduleId: module.id,
  selector: 'app-add',
  templateUrl: 'add.component.html',
})
export class AddComponent implements OnInit {

  private user:string;
  
  private image:Image;
  
  constructor(private userService:UserService) {}

  ngOnInit() {
    this.userService.user.subscribe(user => this.user = user);
    this.image = {
      caption : "",
      src : "",
      likes: 0,
      shares: 0,
      owner: null,
    };
  }

  submit() {
    if (this.user == null)
      throw Error("You have to be logged in to add an image");
    
    this.image.owner = this.user;
    console.log("Adding image " + JSON.stringify(this.image));
    this.userService.addImage(this.image);
  }
}
