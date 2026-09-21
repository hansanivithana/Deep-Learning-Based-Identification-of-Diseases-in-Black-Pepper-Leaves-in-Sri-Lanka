import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PageService } from "../service/page.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgetPasswordForm: FormGroup;
  submit: boolean = false;
  submitSpinner: boolean = false;
  data: any = [];

  constructor(
    private fb: FormBuilder,
    private pageService: PageService,
    private router: Router,
  ) {
    this.forgetPasswordForm = this.fb.group({
      user_name: ['', Validators.required],
      cs_email: ['', [Validators.required, Validators.email]] // Added email validation
    })
  }

  ngOnInit(): void {
  }

  get f2() {
    return this.forgetPasswordForm.controls;
  }

  checkUser() {
    this.submit = true;
    
    // Manually trigger validation for all form controls
    Object.keys(this.forgetPasswordForm.controls).forEach(key => {
      const control = this.forgetPasswordForm.get(key);
      control?.markAsTouched();
      control?.updateValueAndValidity();
    });
    
    if (this.forgetPasswordForm.invalid) {
      this.submitSpinner = false;
      return;
    }
    
    this.submitSpinner = true;
    
    var formData: any = new FormData();
    formData.append('cs_user_name', this.forgetPasswordForm.value['user_name']);
    formData.append('cs_user_email', this.forgetPasswordForm.value['cs_email']);
    
    this.pageService.checkUser(formData).subscribe((response: any) => {
      this.submit = false;
      this.submitSpinner = false;
      this.data = response.data;
      
      localStorage.setItem('userName', response.user_name);
      localStorage.setItem('email', response.user_email);
      
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'User verified successfully!',
        showConfirmButton: false,
        timer: 1500,
        width: '400px',
        heightAuto: false,
      });
      
      this.router.navigateByUrl("/changePassword");
      
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
      });
    });
  }
}