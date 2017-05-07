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

	constructor(private http: Http) {
		var io = require('socket.io-client');
		var socket = io.connect(this.host + ':' + this.port.toString());
		socket.emit('register', 'hello world');
	}

	getUsers(): Promise<User[]> {
		return this.http.get(this.userUrl)
						.toPromise()
						.then(response => response.json().data as User[])
						.catch(this.handleError);
	}
	private extractData(res: Response) {
		let body = res.json();
		return body.data || {};
	}

	private handleError(error: any): Promise<any> {
		console.error('An error ocurred', error);
		return Promise.reject(error.message || error);
	}
}