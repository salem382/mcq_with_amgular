import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) { }

  createSubject(model: any) {
    return this.http.post(environment.baseURl + "subjects", model)
  }

  updateSubject(model: any, id: number) {
    return this.http.put(environment.baseURl + "subjects/" + id, model)
  }

  getAllSubjects() {
    return this.http.get(environment.baseURl + "subjects");
  }


  getSubject(id: number) {
    return this.http.get(environment.baseURl + "subjects/" + id);
  }

  deleteSubject(id: string) {
    return this.http.delete(environment.baseURl + "subjects/" + id)

  }
}
