import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../auth/user.service';

@Component({
  selector: 'app-checkotp',
  templateUrl: './checkotp.component.html',
  styleUrls: ['./checkotp.component.css']
})
export class CheckotpComponent implements OnInit {
  otpForm!: FormGroup;
  otp: string = '';
  otpExpired: boolean = false;
  snackBar: any;
  
  constructor(private fb:FormBuilder, private http:HttpClient, private router:Router, private activatedRoute: ActivatedRoute,private b1:UserService) {}

  ngOnInit(): void {
    this.otpForm = this.fb.group({
      otp: ['', Validators.minLength(6)],
      email: ['', Validators.email]
    })
  }

  verifyOTP(): void {

    const uid = this.activatedRoute.snapshot.paramMap.get('uid');
    const otpValue = this.otpForm.controls['otp'].value;
    const emailValue = this.otpForm.controls['email'].value;
    this.http.post('https://otpservice.onrender.com/0auth/verifyOtp', {uid: this.activatedRoute.snapshot.paramMap.get('uid'), otp: this.otpForm.controls['otp'].value, email: this.otpForm.controls['email'].value})
    .subscribe({
      next: (payload: any) => {
        if(payload.otpValid) {
          if(!payload.otpExpired) {
            
            this.updateUserificationStatus(emailValue);
            
          }
          else {
            this.otpExpired = true; 
            this.snackBar.open('OTP expired', 'Resend', {
              duration: 2000*60, // Display the message for 5 seconds
            });
              this.resendOTP();
          }
        }
        else {
          this.snackBar.open('OTP not valid', 'Dismiss', {
            duration: 5000, // Display the message for 5 seconds
          });
          
        }
      },
      error: (err) => {
        console.error(`Some error occured: ${err}`);
      }
    })
  }




  updateUserificationStatus(userName:string):void{
    this.http.post('http://localhost:9001/verifyUser', { userName:userName })
    .subscribe({
        next: (response: any) => {
            console.log("User verified successfully");
            // Navigate to the desired route (e.g., '/employer/empsign')
            this.router.navigate(['/login']);
            alert('Register successful!');
        },
        error: (err) => {
            console.error(`Error updating employer verification status: ${err}`);
        }
    });

  }
  resendOTP(): void {
    this.http.post('https://otpservice.onrender.com/0auth/verifyOtp', {uid: this.activatedRoute.snapshot.paramMap.get('uid'), otp: this.otpForm.controls['otp'].value, email: this.otpForm.controls['email'].value})
    .subscribe({
      next: (payload: any) => {
        if(payload.otpValid) {
          if(!payload.otpExpired) {
            
            this.router.navigate(['login']);
            
          }
          else {
            this.otpExpired = true; 
            this.snackBar.open('OTP expired', 'Resend', {
              duration: 5000, // Display the message for 5 seconds
            });

          }
        }
        else {
          this.snackBar.open('OTP not valid', 'Dismiss', {
            duration: 5000, // Display the message for 5 seconds
          });
          
        }
      },
      error: (err) => {
        console.error(`Some error occured: ${err}`);
      }
    })
  }
}
