import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
// import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';

import { User } from './user';
import { USERS } from './mock-user';
declare function require(name:string);

@Injectable()
export class UserService {
	private userUrl = 'app/users.json';
	private host = 'localhost';
	private port = 3000;
	private socket;
	private pubkey;

	constructor(private http: Http) {
		console.log('constructor invoked');
		var io = require('socket.io-client');
		// simulated TLS handshake
		var socket = io.connect(this.host + ':' + this.port.toString());
		socket.emit('client-hello', 'hello world');
		socket.on('server-hello', function(data) {
			console.log('receive server hello');
			// FIXME: send server certificate and verify this certificate
			this.pubkey = data.pubkey;
			// FIXME: generate symmetric key
			var Kc = 'secret key';
			socket.emit('client-key-exg', { key: Kc });
			socket.on('server-ack', function() {
				console.log('server ack received');
			});
		});
		this.socket = socket;
	}

	testRecv(): Promise<string> {
		console.log('this.socket: ' + this.socket);
		var socket = this.socket;
		return new Promise(function (resolve, reject) {
			socket.on('test server send', function(data) {
				resolve(data.hello);
			});
		});
	}

	handshake(socket): Promise<string> {
		socket.emit('client-hello', 'hello world');
		return new Promise(function (resolve, reject) {
			socket.on('server-hello', function(data) {
				// FIXME: send server certificate and verify this certificate
				var pubkey = data.pubkey;
				// FIXME: generate symmetric key
				var Kc = 'secret key';
				// TODO use server public key to encrypt following messages
				socket.emit('client-key-exg', { key: Kc });
				socket.on('server-ack', function() {
					console.log('server ack received');
				});
				resolve(Kc);
			});
		});
	}

	getResponse(event): Promise<string> {
		var socket = this.socket;
		return new Promise(function (resolve, reject) {
			socket.on(event, function(data) {
				resolve(data);
			});
		});
	}

	sendRequest(event, data) {
		this.socket.emit(event, data);
	}

	// getRegisterResponse(): Promise<string> {
	// 	var socket = this.socket;
	// 	return new Promise(function (resolve, reject) {
	// 		socket.on('register', function(data) {
	// 			resolve(data.user);
	// 		});
	// 	})
	// }

	// getUsers(): Promise<User[]> {
	// 	// return new Promise(function(resolve, reject) {
	// 	// });
	// 	return this.http.get(this.userUrl)
	// 					.toPromise()
	// 					.then(response => response.json().data as User[])
	// 					.catch(this.handleError);
	// }
	// private extractData(res: Response) {
	// 	let body = res.json();
	// 	return body.data || {};
	// }

	// private handleError(error: any): Promise<any> {
	// 	console.error('An error ocurred', error);
	// 	return Promise.reject(error.message || error);
	// }
}