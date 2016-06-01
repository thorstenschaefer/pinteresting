import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { PinterestingAppComponent, environment } from './app/';
import { FIREBASE_PROVIDERS, defaultFirebase, firebaseAuthConfig, AuthProviders, AuthMethods } from 'angularfire2';

if (environment.production) {
  enableProdMode();
}

bootstrap(PinterestingAppComponent, [
  FIREBASE_PROVIDERS,
  defaultFirebase('https://pinteresting.firebaseio.com'),
  firebaseAuthConfig({
    provider: AuthProviders.Twitter,
    method: AuthMethods.Popup
  })

]);
