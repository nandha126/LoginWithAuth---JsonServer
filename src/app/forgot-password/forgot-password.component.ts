import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, InputGroupModule, InputGroupAddonModule, InputTextModule, ButtonModule, CardModule, PasswordModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit {
  public forgotPasswordForm!: FormGroup;

  constructor(public fb:FormBuilder, private router:Router) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      userName:['', [Validators.required, Validators.email]]
    })
  }

  sendPassword(obj:any) {
    console.log(obj)
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }

  get user() {
    return this.forgotPasswordForm.controls['userName'];
  }
}
