import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {
  subjects:any[] = [];
  user:any={};
  constructor(private service: DoctorService,private auth: AuthService , private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getSubjects();
    this.getUserInfo();
  }


  getSubjects(){
    this.service.getAllSubjects().subscribe((subject:any)=>{
      this.subjects = subject;
    })
  }

  getUserInfo(){
    this.auth.getRole().subscribe((role:any)=>{
      this.user = role;
    });
  }
  

  delete(index:number){
    let id = this.subjects[index].id;
    this.subjects.splice(index, 1);
    this.service.deleteSubject(id).subscribe((res:any)=>{
      this.toastr.success("تم حذف المادة بنجاح")
    })
  }
}
