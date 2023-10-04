import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/auth/user.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit{
  resumeForm!: FormGroup; // Define a FormGroup to hold your form controls

  constructor(private fb: FormBuilder, private http: UserService) {

  }
  ngOnInit(): void {
    this.resumeForm = this.fb.group({
      rname: ['', Validators.required],
      rmail: ['', [Validators.required, Validators.email]],
      rphone: ['', Validators.required],
      experience: ['', Validators.required],
      skills: ['', Validators.required],
      projectlink: [''],
      description: ['', Validators.required]
    });
  }

  submitresume() {
    if (this.resumeForm.valid) {
      const resumeData = this.resumeForm.value;

      // this.http.post('/api/resumes/create', resumeData).subscribe(
      //   (data: any) => {
      //     console.log('Resume saved:', data);
      //     // Add success handling here, e.g., navigate to a success page
      //   },
      //   (error: any) => {
      //     console.error('Error:', error);
      //     // Add error handling here, e.g., show error message to the user
      //   }
      // );
      console.log(resumeData);
      return this.http.resumeinsert(resumeData);
    }
    return false;
  }
}
