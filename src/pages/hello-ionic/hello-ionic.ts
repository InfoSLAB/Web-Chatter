import { Component } from '@angular/core';
import { LoginPage } from '../login-page/login-page';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
	loginPage = LoginPage;
  constructor() {

  }
}
