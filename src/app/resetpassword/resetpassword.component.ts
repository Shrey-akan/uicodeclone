import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit{
  passwordResetForm!: FormGroup;
  successMessage = '';
  errorMessage = '';


  constructor(private formBuilder:FormBuilder,private router:Router,private http:HttpClient){}
  ngOnInit(): void {
    this.passwordResetForm = this.formBuilder.group({
      userName: ['', Validators.required],
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      verifyPassword: ['', Validators.required],
    });
  }



  submitForm() {
    if (this.passwordResetForm.valid) {
      // Set userName field in formData to the value of abc
      // this.passwordResetForm.patchValue({ userName: this.abc });

      const formData = this.passwordResetForm.value;

      // Make a POST request to your backend for password reset
      this.http.post('http://localhost:9001/resetPassword', formData)
        .subscribe(
     {
      next:     (response: any) => {
        // Handle success
        console.log(response);
        this.successMessage = 'Password updated successfully';
        this.errorMessage = '';
        alert('Password updated successfully');
        this.router.navigate(['/login']);
      },

     error: (err: any) => {
        // Handle errors
        if (err.status === 401) {
          this.errorMessage = 'Invalid old password';
          this.successMessage = '';
        } else if (err.status === 404) {
          this.errorMessage = 'User not found';
          this.successMessage = '';
        } else {
          this.errorMessage = 'An error occurred: ' + err.message;
          this.successMessage = '';
        }
      }
     }
        );
    } else {
      // Form is invalid, show error messages or perform desired actions
    }
  }
}
