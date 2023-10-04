import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  showNavbar = true;
  constructor(private router:Router){
  
  }
  
  
  
    // public IsLoggedIn(){
    //   return this.userauth.IsLoggedIn();
    // }
    // public logout(){
    //   this.userauth.clear();
    //   this.router.navigate(['/']); 
    // }
  
  
  
  
  
    ngOnInit() {
  
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          const currentRoute = event.urlAfterRedirects;
  
          // Check if the current route is 'employer'
          this.showNavbar = !['/employer','/dashboardemp/videocall', '/sign-in','/admin/dashboardadmin/question','/dashboardemp/notificationemp', "/dashboarduser/myjobs","/admin/dashboardadmin/profile","/employer/optverify","/dashboardemp/updateempprofile","/dashboarduser/updateprofile", "/dashboarduser/questionpaper",'/dashboardemp/applieduserdetails','/employer/postjob','/employer/advancesearch','/employer/resources','/employer/helpcenter','/employer/products','/dashboardemp/geinfoform','/employer/empsign', '/employer/empregister' ,'/employer/findcv','/seeker/firstpage','/seeker/companiesseker','/seeker/salaryseeker','/seeker/messageseeker','/seeker/notificationseeker','/seeker/profileseeker','/employers/findacv','/employers/product','/employers/resources','/employers/helpcenter','/employers/sign-in-emp','/employers/findjobsemp','/seeker/myjobsuser','/seeker/setting','/seeker/helpcenteruser','/seeker/applyjob','/seeker/kapply','/employers/advancesearch','/employers/sign-in-checkemp','/employers/employerform','/employerdashboard','/employerdashboard/dashboardemployer','/dashboarduser', '/admin/dashboardadmin','/employerdashboard/addjobbasics','/dashboarduser/findjobu' ,'/dashboarduser/company','/dashboarduser/salary','/dashboarduser/message','/dashboarduser/settinguser','/dashboarduser/resume','/dashboarduser/notification','/dashboarduser/userprofile', '/dashboarduser/applyjob' ,'/dashboardemp/profilemep' ,'/dashboardemp/alljobs' , '/dashboardemp/empmessage' ,'/dashboardemp/postjob','/dashboardemp','/dashboarduser/userprofile','/admin','/admin/dashboardadmin/userdetails','/admin/dashboardadmin/employerdetails','/admin/dashboardadmin/jobprovided','/admin/dashboardadmin/adminprofile','/admin/dashboardadmin/enquirydetails','/admin/dashboardadmin/notify'  ].includes(currentRoute);    
            // Check if the current route is 'updateempprofile'
        if (currentRoute.startsWith('/dashboardemp/updateempprofile/')||currentRoute.startsWith('/admin/dashboardadmin/notify/')||currentRoute.startsWith('/dashboardemp/empmessage/')||currentRoute.startsWith('/employer/optverify/')||currentRoute.startsWith('/dashboarduser/updateprofile/')) {
          this.showNavbar = false;
        }
        }
      });
    }
    // signinpage(){
    //   this.router.navigate(['/sign-in']);
    // }
}
