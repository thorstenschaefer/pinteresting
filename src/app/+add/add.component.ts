import { Component, OnInit } from '@angular/core';
import { Control } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

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
  
  private previewSrc:string = "./invalid.png";
  private imageUrl = new Control();

  constructor(private userService:UserService, private router:Router) {}

  ngOnInit() {
    this.userService.user.subscribe(user => this.user = user);
    this.image = {
      caption : "",
      src : "",
      likes: 0,
      shares: 0,
      owner: null,
    };
    
    this.imageUrl
      .valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .flatMap(url => this.userService.validateImageUrl(url))
      .subscribe(url => this.previewSrc = url);
  }

  onChange(event) {
    console.log(event.srcElement.value);
  }

  submit() {
    if (this.user == null)
      throw Error("You have to be logged in to add an image");
    
    this.image.src = this.previewSrc;
    this.image.owner = this.user;
    console.log("Adding image " + JSON.stringify(this.image));
    this.userService.addImage(this.image);
    this.router.navigate(['images', this.user]);
  }
}
