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
  response: string;

	ngOnInit(): void {
    this.userService.sendRequest('register', { email: "fd0joker@gmail.com", username: "joker", pubkey: "public key" });
    this.getResponse('register');
	}

  constructor(
  	private userService: UserService,
  	public navCtrl: NavController, 
  	public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  // getServerHello(): void {
  //   this.userService.getServerHello().then(pubkey => this.pubkey = pubkey);
  // }

  getResponse(event) {
    this.userService.getResponse(event).then(response => this.response = JSON.stringify(response));
  }

  sendRequest(req) {
    var tokens = req.split(' ');
    var event = tokens[0];
    tokens.shift();
    var data = tokens.join(' ');
    console.log(`send request: ${event}, ${data}`);
    this.userService.sendRequest(event, data);
    this.getResponse(event);
  }
}
