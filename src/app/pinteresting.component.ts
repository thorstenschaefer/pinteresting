import { Component } from '@angular/core';
import { AddComponent } from './+add';
import { Router, Routes , ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';

import { UserComponent } from './+user';
import { UserService } from './user.service';
import { HeaderComponent } from './header/header.component';

@Component({
  moduleId: module.id,
  selector: 'pinteresting-app',
  templateUrl: 'pinteresting.component.html',
  directives: [ROUTER_DIRECTIVES, HeaderComponent],
  providers: [ROUTER_PROVIDERS, UserService]
})
@Routes([
  {path: '/add', component: AddComponent},
  {path: '/images/:user', component: UserComponent},
  {path: '/', component: UserComponent},
  {path: '/images', component: UserComponent},
])
export class PinterestingAppComponent {
    
  constructor(private router:Router, private userService:UserService) {
    // Default route is images
    //this.router.navigate(["/images"]);
  }
}
