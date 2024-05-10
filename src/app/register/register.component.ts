import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../shared/_directive/password-match.directive'
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AuthService } from '../services/auth.service';
import { User } from '../interfaces/auth';
import { MessageService } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ButtonModule, CardModule, ReactiveFormsModule,InputTextModule, HttpClientModule, ToastModule],
  providers:[MessageService, AuthService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
  public registerForm!: FormGroup;

  constructor(private fb:FormBuilder, private router:Router, private authService:AuthService,private messageService:MessageService) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },
    {
      validators: passwordMatchValidator
    });
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }

  get fullName() { return this.registerForm.controls['fullName']; }
  get email() { return this.registerForm.controls['email']; }
  get password() { return this.registerForm.controls['password']; }
  get confirmPassword() { return this.registerForm.controls['confirmPassword']; }

  register(obj:any) {
    const postData = { ...this.registerForm.value };
    delete postData.confirmPassword;
    console.log(postData);
    this.authService.registerUser(postData).subscribe( {
      next:(response:any)=> {
        console.log(response);
        this.messageService.add({ severity: 'success', summary: 'Success', detail:'Register Successfully'});
        this.router.navigate(['login']);
      },
      error:error => {
        this.messageService.add({ severity:'error', summary: 'Error', detail:'Something went wrong'});
      }
    })
  }
}
