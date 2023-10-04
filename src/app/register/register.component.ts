import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../auth/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isHovered = false;
  userregister!: FormGroup;
  formSubmitted: any;

  data: any;


  constructor(private formBuilder: FormBuilder, private router: Router, private userservice: UserService, private http: HttpClient) {
  }




  ngOnInit(): void {
    this.userregister = this.formBuilder.group({
      userFirstName: ['', Validators.required],
      userLastName: ['', Validators.required],
      userName: ['', [Validators.required, Validators.email, Validators.pattern(/\b[A-Za-z0-9._%+-]+@gmail\.com\b/)]],
      userPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
        ]
      ],
      companyuser: [''],
      websiteuser: [''],
      userphone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      usercountry: ['', Validators.required],
      userstate: ['', Validators.required],
      usercity: ['', Validators.required]
    });
    // let responce = this.b1.viewuserdetailservice();
    // responce.subscribe((data1: any)=>this.data=data1);



  }

  loginWithGoogle() {
    this.userservice
      .loginWithGoogle()
      .then((userCredential) => {
        // User is successfully authenticated
        const user = userCredential.user;
        console.log('Authenticated');
        console.log('User Info:', user);
        const userName = user.email;
        console.log(userName);
        //  this.userservice.insertusermailgog(userName);
      })
      .catch((error) => {
        console.error('Authentication Error:', error);
      });
  }

  userRegisteration(): void {
    if (this.userregister.valid) {
      this.http.post('http://localhost:9001/insertusermail', this.userregister.getRawValue()).subscribe({
        next: (payload: any) => {

          console.log(payload);
          console.log(payload.uid);
          this.generateOtp(payload);

        },
        error: (err) => {
          console.error(`Some error occurred: ${err}`);
        }
      });
    } else {
      // Handle form validation errors, e.g., display error messages or prevent submission.
      this.userregister.markAllAsTouched(); // Mark all fields as touched to trigger error messages.
    }
  }


  generateOtp(payload: any) {
    this.http.post('https://otpservice.onrender.com/0auth/generateOtp', { uid: payload.uid, email: payload.userName }).subscribe({
      next: (response: any) => {
        if (response.otpCreated) {
          console.log(response.otpCreated);

          this.router.navigate(['/checkotp', payload.uid]);
         
        }
        else {
          console.error("Otp not generated");
          alert("Otp not generated");
        }
      },
      error: (err) => {
        console.error(`Some error occured: ${err}`);
        alert(err);
      }
    })
  }

  login(usersignin: { value: any; }) {
    const empemail = usersignin.value.userNamec;
    const emppassword = usersignin.value.passuserc;

    const empmatch = this.data.find((data1: any) => data1.userName === empemail && data1.passuser === emppassword);

    if (empmatch) {
      this.router.navigate(['/seeker/']);
      console.log(usersignin.value);
    } else {
      console.log(usersignin.value);
      console.log("Invalid login");
      alert("Invalid Details");
      // Optionally, show an error message to the user
    }
  }
}
function loginWithGoogle() {
  throw new Error('Function not implemented.');
}

