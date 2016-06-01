import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/filter';
import { Image } from './image';

@Injectable()
export class UserService {

  public ALL_IMAGES: FirebaseListObservable<Image[]>;
  public user:Observable<string>;
  private currentUser = null;
  
  constructor(private af: AngularFire) {
    this.ALL_IMAGES = this.af.list('/images');
    this.user = this.af.auth.map(auth => auth == null ? null : auth.twitter.username);
    this.user.subscribe(user => this.currentUser = user);
  }

  getImagesForUser(userName:string):Observable<Image[]> {
    if (!userName)
      return this.ALL_IMAGES;
    else
      return this.ALL_IMAGES.
        map(imageArray => imageArray.filter(img => img.owner === userName)); 
  }

  logout() {
    this.af.auth.logout();
  }
  
  login() {
    return this.af.auth.login();
  }
  
  addImage(image:Image) {
    console.log("adding image");
    this.ALL_IMAGES.push(image);
  }
  
  deleteImage(image:Image) {
    let key = image["$key"];
    console.log("Deleting image with key " + key);
    this.ALL_IMAGES.remove(key);
  }
  
  likeImage(image:Image) {
    console.log("liking image");
    this.ALL_IMAGES.update(image, { likes: image.likes+1 });
  }
  
  shareImage(image:Image, user:string) {
    if (!user)
      return;
      
    console.log("sharing image");
    let copy:Image = {
      src : image.src,
      caption : image.caption,
      likes : 0,
      shares : 0,
      owner : user
    }
    
    this.ALL_IMAGES.push(copy);
    this.ALL_IMAGES.update(image, { shares : image.shares + 1 });
  }
}
