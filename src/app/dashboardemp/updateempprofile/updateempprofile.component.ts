import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { UserService } from 'src/app/auth/user.service';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-updateempprofile',
  templateUrl: './updateempprofile.component.html',
  styleUrls: ['./updateempprofile.component.css']
})
export class UpdateempprofileComponent implements OnInit {
  employeeForm!: FormGroup;
  empDetail: any;
  abc: any;

  constructor(
    private formBuilder: FormBuilder,
    private b1: UserService,
    private route:ActivatedRoute,
    private router:Router,
    public cookie:CookieService
  ) { }
  empId: String = "0";
  ngOnInit() {


    this.empId = this.cookie.get('emp');

    console.log(this.empId);
    console.log('Employer ID from cookie:', this.empId);
    let response = this.b1.fetchemployer();
  
    response.subscribe((data1: any) => {
      // Debugging: Log the data received from the API
      console.log('Data from API:', data1);
      const eeid=this.empId;
      console.log(eeid);
      
      // Filter the data array to include only the user with the matching userID
      // this.data = data1.find((user: any) => user.uid === uuid);
      this.empDetail = data1.find((emp: any) => emp.empid == eeid);
      console.log(this.empDetail);
      // Debugging: Log the filtered data
      console.log("hello");
      console.log('Filtered Data:', this.empDetail);
      this.abc = this.empDetail.empmailid;
      console.log(this.abc);
    });


    // Initialize the form with default values or load existing employee data
    this.employeeForm = this.formBuilder.group({
      empid: this.empId,
      empfname: ['', Validators.required],
      emplname: ['', Validators.required],
      empcompany: ['', Validators.required],
      emppass: ['', Validators.required],
      empphone: ['', Validators.required],
      empcountry: ['', Validators.required],
      empstate: ['', Validators.required],
      empcity: ['', Validators.required],
      descriptionemp: ['', Validators.required]
    });
   



  }

  updateEmployee() {
    if (this.employeeForm.valid) {
      // Extract updated employee data from the form
      const updatedEmployee = this.employeeForm.value;
      console.log(updatedEmployee);
      this.b1.updateEmployee(updatedEmployee)
      .pipe(
        catchError((error) => {
          // Handle the error response here
          console.error('Error updating profile:', error);
          return throwError(error); // Re-throw the error
        })
      )
      .subscribe({
        next: (response) => {
          // Handle the success response here
          console.log('Profile updated successfully:', response);
          alert("Profile updated successfully");
          this.router.navigate(['/dashboardemp/profilemep']);
        },
        complete: () => {
          // This block is optional and can be used for handling completion
        }
      });
  } else {
    console.error('Form is invalid. Cannot update profile.');
  }
  }

}
