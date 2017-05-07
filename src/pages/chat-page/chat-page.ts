import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../app/user';
import { UserService } from '../../app/user.service';

/**
 * Generated class for the ChatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-chat-page',
  templateUrl: 'chat-page.html',
  providers: [UserService]
})
export class ChatPage implements OnInit {
	users: User[];

	ngOnInit(): void {
		this.getUsers();
	}

  constructor(
  	private userService: UserService,
  	public navCtrl: NavController, 
  	public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  getUsers(): void {
  	this.userService.getUsers().then(users => this.users = users);
  }

}
