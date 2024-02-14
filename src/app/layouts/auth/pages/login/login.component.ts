import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm :FormGroup;
  showPassword:boolean = false;


  constructor(private fb:FormBuilder, private authService:AuthService) {
    this.loginForm = this.fb.group({
      email:this.fb.control('',[Validators.required,Validators.email]),
      password:this.fb.control('',[Validators.required,Validators.minLength(3)])
    })
  }

  onSubmit():void{
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
    }
    else{
      this.authService.login(this.loginForm.value);
    }
  }
}
