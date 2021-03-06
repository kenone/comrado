import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { SocketService } from './socket.service';

@Injectable()
export class AuthService {

  authToken: any;
  user: any;

  constructor(
    private http:Http,
    private socketService: SocketService
  ) { }

  // EventEmitter for detecting changes in the user object;
  userUpdated:EventEmitter<any> = new EventEmitter();

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('users/register', user, { headers: headers })
      .map(res => res.json());
   }

   authenticateUser(user) {
     let headers = new Headers();
     headers.append('Content-Type', 'application/json');
     return this.http.post('users/authenticate', user, { headers: headers })
       .map(res => res.json());
   }

   uploudDefaultImage(username) {
     let headers = new Headers();
     headers.append('Content-Type', 'application/json');
     return this.http.post('users/cloudinarydefault', username, { headers: headers })
       .map(res => res.json());
   }


   storeUserData(token, user){
     localStorage.setItem('id_token', token);
     localStorage.setItem('user', JSON.stringify(user));
     this.authToken = token;
     this.user = user;
   }

   getProfile(){
     let headers = new Headers();
     this.loadToken();
     headers.append('Authorization', this.authToken);
     headers.append('Content-Type', 'application/json');
     return this.http.get('users/profile', { headers: headers })
       .map(res => res.json());
   }

   getUser(){
     return this.user;
   }

   setUser(user){
     this.user = user;
     localStorage.setItem('user', JSON.stringify(user));
     // EventEmitter for communicate changes in the user object to components;
     this.userUpdated.emit(this.user);
   }

   loadToken(){
     const token = localStorage.getItem('id_token');
     this.authToken = token;
   }

   signOut(){
     this.authToken = null;
     this.user = null;
     localStorage.clear();
     this.socketService.disconnect();
   }

   // Check if user is signed in
   isSignedIn() {
    //  return tokenNotExpired();
     return tokenNotExpired('id_token')
   }

}
