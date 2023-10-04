import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/auth/user.service';

@Component({
  selector: 'app-applieduserdetails',
  templateUrl: './applieduserdetails.component.html',
  styleUrls: ['./applieduserdetails.component.css']
})
export class ApplieduserdetailsComponent implements OnInit {

  empDetail: any;
  abc: any;
  logval: any;
  data: any;
  public chatEmail:string="";

  // Define a property to keep track of the expanded user profile
  expandedUser: any | null = null;
  constructor(private router:Router, private formbuilder:FormBuilder,private b1:UserService , public cookie:CookieService){}



  empId: String = "0";

  ngOnInit(): void {
    this.empId = this.cookie.get('emp');

    // console.log(this.empId);
    // console.log('Employer ID from cookie:', this.empId);
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
        this.abc = this.empDetail.empId;
        const logval=this.abc;
        console.log(this.abc+"hello check the detail");
        this.fetchJobapplieddetails();
      });
    }

      fetchJobapplieddetails(){
        let response :any= this.b1.fetchapplyform();
        console.log('Value of this.abc:', this.abc);
        // console.log('Empid values:', data1.map((applyjobf: any) => applyjobf.empid));
        
        console.log("checking response",response);
        response
          .subscribe((data1: any) => {
            this.data = data1.filter((applyjobf: any) => applyjobf.empid == this.empId);
            console.log('Filtered Data:', this.data);
            
            
          });
          

  }

  navigateToMessage(email: string) {
  
    // Use the passed email as a parameter when navigating
    this.router.navigate(['/dashboardemp/empmessage/', email]);
  }
  navigateToVideo(email:string){
    this.router.navigate(['/dashboardemp/videocall/', email]);
  }
    // Define the showMoreInfo method
    showMoreInfo(user: any) {
      // Toggle the expandedUser property to show/hide additional information
      this.expandedUser = this.expandedUser === user ? null : user;
    }
}  

