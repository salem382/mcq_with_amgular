import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DoctorService } from 'src/app/doctor/services/doctor.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {
  id: any;
  subject: any
  user: any;
  total: number = 0;
  showResult: boolean = false;
  studentInfo: any;
  userSubjects: any[] = [];
  validExam: boolean = true;
  constructor(private activatedRoute: ActivatedRoute, private service: DoctorService,
    private auth: AuthService
    , private toastr: ToastrService) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

  }

  ngOnInit(): void {
    this.getSubject();
    this.getLogInUser()
  }

  getSubject() {
    this.service.getSubject(this.id).subscribe(res => {
      this.subject = res;
    })
  }

  getLogInUser() {
    this.auth.getRole().subscribe((role: any) => {
      this.user = role;
      this.getUserData()
    });
  }


  getUserData() {
    this.auth.getStudent(this.user.userId).subscribe((res: any) => {
      this.studentInfo = res;
      this.userSubjects = res?.subjects ? res?.subjects : [];
      this.checkValidExam()
    })

  }

  checkValidExam() {
    for (let x in this.userSubjects) {
      if (this.userSubjects[x].id == this.id) {
        this.validExam = false;
        this.total = this.userSubjects[x].degree;
        this.toastr.warning("لقد أنجزت هذا الاختبار مسبقا", "", {
          disableTimeOut: false,
          titleClass: "toastr_title",
          messageClass: "toastr_message",
          timeOut: 5000,
          closeButton: true,
        })
      }
    }
  }

  getAnswer(event: any) {
    let value = event.value,
      questionIndex = event.source.name;
    this.subject.questions[questionIndex].studentAnswer = value;
  }


  deleteIndex(index: number) {
    this.subject.questions.splice(index, 1);

    const model = {
      name: this.subject.name,
      questions: this.subject.questions,
    }

    this.service.updateSubject(model, this.id).subscribe(res => {
      this.toastr.success("تم حذف السؤال بنجاح", "", {
        disableTimeOut: false,
        titleClass: "toastr_title",
        messageClass: "toastr_message",
        timeOut: 5000,
        closeButton: true,
      });
    })
  }

  getResult() {
    this.total = 0;

    for (let x in this.subject.questions) {
      if (this.subject.questions[x].studentAnswer == this.subject.questions[x].correctAnswer) {
        this.total++;
      }
    }
    this.showResult = true
    this.userSubjects.push({
      name: this.subject.name,
      id: this.id,
      degree: this.id,
    })
    const model = {
      userName: this.studentInfo.userName,
      email: this.studentInfo.email,
      password: this.studentInfo.password,
      subjects: this.userSubjects
    }
    this.auth.updateStudent(this.user.id, model).subscribe(res => {
      this.toastr.success("تم تسجيل النتيجة بنجاح", "", {
        disableTimeOut: false,
        titleClass: "toastr_title",
        messageClass: "toastr_message",
        timeOut: 5000,
        closeButton: true,
      });
    })
  }
}
