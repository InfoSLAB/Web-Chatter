import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let users = [
      {id: 1, username: "joker", email: "fd0joker@gmail.com", password: "123", portrait: "http://www.runoob.com/try/demo_source/venkman.jpg"},
      {id: 2, username: "joker2", email: "fd0joker@gmail.com", password: "123", portrait: "http://www.runoob.com/try/demo_source/venkman.jpg"},
      {id: 3, username: "joker3", email: "fd0joker@gmail.com", password: "123", portrait: "http://www.runoob.com/try/demo_source/venkman.jpg"},
    ];
    return {users};
  }
}
