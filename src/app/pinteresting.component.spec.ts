import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { PinterestingAppComponent } from '../app/pinteresting.component';

beforeEachProviders(() => [PinterestingAppComponent]);

describe('App: Pinteresting', () => {
  it('should create the app',
      inject([PinterestingAppComponent], (app: PinterestingAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'pinteresting works!\'',
      inject([PinterestingAppComponent], (app: PinterestingAppComponent) => {
    expect(app.title).toEqual('pinteresting works!');
  }));
});
