import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  users: any[] = [];
  type: string = "students";
  constructor(private fb: FormBuilder, private service: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.createForm();
    this.getUsers();
  }

  createForm() {
    this.loginForm = this.fb.group({
      type: [this.type],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  getRole(event: any) {
    this.type = event.value;
    this.getUsers();
  }
  getUsers() {
    this.service.getUsers(this.type).subscribe((res: any) => {
      this.users = res;
    })
  }

  submit() {

    let index = this.users.findIndex(items => items.email == this.loginForm.value.email && items.password == this.loginForm.value.password)
    if (index == -1) {
      this.toastr.error("الإيميل أو كلمه المرور غير صحيحة", "", {
        disableTimeOut: false,
        titleClass: "toastr_title",
        messageClass: "toastr_message",
        timeOut: 5000,
        closeButton: true,
      })
    } else {
      const model = {
        userName: this.users[index].userName,
        role: this.type,
        userId: this.users[index].id
      }
      this.service.login(model).subscribe(res => {
      this.service.user.next(res) ;

        this.toastr.success("تم  تسجيل الدخول بنجاح", "", {
          disableTimeOut: false,
          titleClass: "toastr_title",
          messageClass: "toastr_message",
          timeOut: 5000,
          closeButton: true,
        })
        this.router.navigate(['/subjects']);
      })
    }

  }
}
