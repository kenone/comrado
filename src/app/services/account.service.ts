import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AccountService {

  constructor(private http:Http) { }

  updatePassword(userId, oldPassword, newPassword){

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let inputData = {
      userId: userId,
      oldPassword: oldPassword,
      newPassword: newPassword
    }

    return this.http.post('users/updatepassword', inputData, { headers: headers })
      .map(res => res.json());
   }

   removeAccount(userId){
     let headers = new Headers();
     headers.append('Content-Type', 'application/json');

     return this.http.delete('users/' + userId, { headers: headers })
       .map(res => res.json());
   }

}
