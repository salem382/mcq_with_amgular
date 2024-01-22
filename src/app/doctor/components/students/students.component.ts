import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  dataSource: any;
  dataTable: any;
  displayedColumns: any
  constructor(private service: AuthService) {
    this.displayedColumns = ['position', 'name', 'subjectName', 'degree'];
  }


  ngOnInit(): void {
    this.getStudents();
  }

  getStudents() {
    this.service.getUsers("students").subscribe((res: any) => {
      this.dataSource = res.map((students: any) => {
        if (students?.subjects) {
          return students?.subjects.map((sub: any) => {
            return {
              name: students.userName,
              subjectName: sub.name,
              degree: sub.degree
            }
          })
        } else {
          return [{
            name: students.userName,
            subjectName: "-",
            degree: "-"
          }]
        }

      })
      this.dataTable = [];
      this.dataSource.forEach((item: any) => {
        item.forEach((subItem: any) => {
          this.dataTable.push({
            name: subItem.name,
            subjectName: subItem.subjectName,
            degree: subItem.degree
          })
        })
      })
      console.log(this.dataTable);

    })
  }


}
