import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PageService } from "../service/page.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;
  submit: boolean = false;
  submitSpinner: boolean = false;
  userName: any;
  email: any;

  constructor(
    private fb: FormBuilder,
    private pageService: PageService,
    private router: Router,
  ) {
    this.changePasswordForm = this.fb.group({
      cs_password: ['', Validators.required],
      cs_conform_password: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  changePassword() {
    
    this.submit = true;
    
    
    Object.keys(this.changePasswordForm.controls).forEach(key => {
      const control = this.changePasswordForm.get(key);
      control?.markAsTouched();
      control?.updateValueAndValidity();
    });
    
    
    if (this.changePasswordForm.invalid) {
      this.submitSpinner = false;
      return;
    }
    
    
    this.submitSpinner = true;
    
    this.email = localStorage.getItem('email');
    this.userName = localStorage.getItem('userName');
    
    var formData: any = new FormData();
    formData.append('cs_password', this.changePasswordForm.value['cs_password']);
    formData.append('cs_conform_password', this.changePasswordForm.value['cs_conform_password']);
    formData.append('cs_user_email', this.email);
    formData.append('cs_user_name', this.userName);
    
    localStorage.removeItem('email');
    localStorage.removeItem('userName');
    
    this.pageService.changePassword(formData).subscribe((response: any) => {
      
      this.submit = false;
      this.submitSpinner = false;
      
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Change Password Successful',
        showConfirmButton: false,
        timer: 1500,
        width: '400px',
        heightAuto: false,
      })
      this.router.navigateByUrl("/login");

    }, (error: any) => {
      
      this.submit = false;
      this.submitSpinner = false;
      
      let errorMessage = "Oops! Something went wrong.";
      if (error && error.error && error.error.error) {
        errorMessage = error.error.error;
      }
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: errorMessage,
        showConfirmButton: false,
        timer: 1500,
        width: '400px',
        heightAuto: false,
      })
    });
  }

  get f2() {
    return this.changePasswordForm.controls;
  }
}