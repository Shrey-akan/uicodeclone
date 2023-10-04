import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/auth/user.service';

@Component({
  selector: 'app-postjob',
  templateUrl: './postjob.component.html',
  styleUrls: ['./postjob.component.css']
})
export class PostjobComponent implements OnInit{
  jobdetail!: FormGroup;
  empDetail: any;
  abc: any;
  logval: any;
  constructor(private router:Router, private formbuilder:FormBuilder,private b1:UserService , public cookie:CookieService){
    
  }



  ngOnInit(): void {

   
      this.jobdetail = this.formbuilder.group({
       
        jobtitle: ['', Validators.required],
        companyforthisjob: ['', Validators.required],
        numberofopening: ['', Validators.required],
        locationjob: ['', Validators.required],
        jobtype: ['', Validators.required],
        schedulejob: ['', Validators.required],
        payjob: ['', Validators.required],
        payjobsup: ['', Validators.required],
        descriptiondata: [''],
        empid: ['',Validators.required] ,
      });
      this.abc = this.cookie.get('emp');
      console.log(this.abc);
      this.jobdetail.get('empid')?.setValue(this.abc);

  }

  jobdetailsform(jobdetail:{value:any;}){
    this.router.navigate(['/dashboardemp/alljobs']);
    console.log(jobdetail);
    return this.b1.jobpostinsert(jobdetail.value);
   
 
  }






  // @ViewChild('editorContent') editorContent!: ElementRef;

  applyCommand(command: string): void {
    document.execCommand(command, false, ''); // Use empty string instead of null
  }

}
