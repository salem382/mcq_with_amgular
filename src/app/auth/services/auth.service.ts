import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new Subject();
  constructor(private http: HttpClient) { }

  createUser(model: any) {
    return this.http.post(environment.baseURl+'students', model);
  }

  getUsers(type: string) {
    return this.http.get(environment.baseURl + type);
  }
  login(model: any) {
    return this.http.put(environment.baseURl+'login/1', model);
  }
  getRole(){
    return this.http.get(environment.baseURl+'login/1');
  }

  updateStudent(id:number,model:any){
    return this.http.put(environment.baseURl+'students/'+id , model);
  }

  getStudent(id:number){
    return this.http.get(environment.baseURl+'students/'+id);
  }
}
