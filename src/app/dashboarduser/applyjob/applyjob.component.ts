import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/auth/user.service';

@Component({
  selector: 'app-applyjob',
  templateUrl: './applyjob.component.html',
  styleUrls: ['./applyjob.component.css']
})
export class ApplyjobComponent implements OnInit {

  jobTitle: string | null = null;
  companyName: string | null = null;
  empId: string | null = null;

  myformsubmission!: FormGroup; // Initialize with an empty group
  currentStep = 1;
  // router: any;
  data: any;
  constructor(private formBuilder: FormBuilder, private router: Router, private b1: UserService) { }



  ngOnInit(): void {

    // let responce = this.b1.empaccregrepo();
    // responce.subscribe((data1: any)=>this.data=data1);
    this.myformsubmission = this.formBuilder.group({

      juname: ['', [Validators.required]],
      jumail: ['', [Validators.required, Validators.email]],
      jucompny: ['', Validators.required],
      jutitle: ['', Validators.required],
      juresume: [''],


      jurelocation: ['', [Validators.required]],
      jueducation: ['', [Validators.required]],
      juexperience: ['', [Validators.required]],
      juexpinjava: ['', [Validators.required]],
      juexpjsp: ['', [Validators.required]],
      juinterviewdate: [''],
      jujavavalid: ['', [Validators.required]],


      jujobtitle: ['', Validators.required],
      jucompanyname: ['', Validators.required],
      empid: ['', Validators.required]

    })
    // Add more steps as needed
    this.b1.jobTitle$.subscribe((jobTitle) => {
      this.jobTitle = jobTitle;
    });

    this.b1.companyName$.subscribe((companyName) => {
      this.companyName = companyName;
    });
    this.b1.empId$.subscribe((empId) => {
      this.empId = empId;
    });
    // Set the value of the form control
    this.myformsubmission.get('jucompny')?.setValue(this.companyName);
    this.myformsubmission.get('jutitle')?.setValue(this.jobTitle);
    this.myformsubmission.get('empid')?.setValue(this.empId);
  }


  insertUserForma(myformsubmission: { value: any; }) {
    console.log("Done");
    this.router.navigate(['/dashboarduser']);
    console.log(myformsubmission);
    return this.b1.insertapplyjob(myformsubmission.value);
  }
  nextStep() {

    this.currentStep++;

  }

  prevStep() {
    this.currentStep--;
  }


}
