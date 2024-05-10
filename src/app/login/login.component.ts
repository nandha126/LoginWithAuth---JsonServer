import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password'
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, InputGroupModule, InputGroupAddonModule, InputTextModule, ButtonModule, CardModule, PasswordModule, HttpClientModule, CheckboxModule, ToastModule],
  providers:[AuthService,MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  public loginForm!: FormGroup;

  constructor(public fb: FormBuilder, private router:Router, private authService:AuthService, private messageService:MessageService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberme: ['']
    })
  }
  goToRegister() {
    console.log("Register")
    this.router.navigateByUrl('/register');
  }

  login(obj: any) {
    console.log(obj);
    this.authService.getUserByEmail(obj.email as string).subscribe({
      next: (response:any) => {
        console.log(response)
        if(response.length > 0 && response[0].password === obj.password) {
          sessionStorage.setItem('userName', obj.email as string)
          this.router.navigate(['/home']);
        } else {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Username/Password wrong'});
        }
      },
      error: error => {
        console.log(error);
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Something went wrong'});
      }
    })
  }

  goToForgotPassword() {
    this.router.navigateByUrl('/forgot-password');
  }

  get user() { return this.loginForm.controls['email']; }
  get pwd() { return this.loginForm.controls['password']; }
}
