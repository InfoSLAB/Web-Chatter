import { Injectable } from '@angular/core';
import { User } from './user';
import { USERS } from './mock-user';

@Injectable()
export class UserService {
	genUsers(): Promise<User[]> {
		return Promise.resolve(USERS);
	}
}