import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';
import { AuthInterceptor } from '../interceptors/auth.interceptor';

// Define your API base URL as a constant variable
const API_BASE_URL = 'http://localhost:9001/';
interface User {
  uid: Number;
  userName: String;
  userFirstName: String;
  userLastName: String;
  userPassword: String;
  companyuser: String;
  websiteuser: String;
  userphone: String;
  usercountry: String;
  userstate: String;
  usercity: String;
}
interface Employer {
  empid: Number;
  empfname: String;
  emplname: String;
  empcompany: String;
  empmailid: String;
  emppass: String;
  empphone: String;
  empcountry: String;
  empstate: String;
  empcity: String;
  descriptionemp: String;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getUser() {
    throw new Error('Method not implemented.');
  }




  private jobTitleSource = new BehaviorSubject<string | null>(null);
  private companyNameSource = new BehaviorSubject<string | null>(null);

  private empIdSource = new BehaviorSubject<string | null>(null);
  empId$ = this.empIdSource.asObservable();

  jobTitle$ = this.jobTitleSource.asObservable();
  companyName$ = this.companyNameSource.asObservable();

  setJobTitle(jobTitle: string) {
    this.jobTitleSource.next(jobTitle);
  }

  setEmpId(empId: string) {
    this.empIdSource.next(empId);
  }

  setCompanyName(companyName: string) {
    this.companyNameSource.next(companyName);
  }

  contactformurl = `${API_BASE_URL}insertfrontform`;
  inserturlc = `${API_BASE_URL}insertusermail`;
  logincheckurl = `${API_BASE_URL}logincheck`;
  fetchuserurl = `${API_BASE_URL}fetchuser`;
  updateUserurl = `${API_BASE_URL}updateUser`;
  insertusermailurl = `${API_BASE_URL}insertusermailgog`;
  deleteuseraccount = `${API_BASE_URL}`;
  // Employer
  inserturle = `${API_BASE_URL}insertemployer`;
  inserturlemail = `${API_BASE_URL}insertemployeremail`;
  employercheckurl = `${API_BASE_URL}logincheckemp`;
  employerdetailsfetchurl = `${API_BASE_URL}fetchemployer`;
  employerupdateurl = `${API_BASE_URL}updateEmployee`;
  deleteemployeraccount = `${API_BASE_URL}`;
  // Job Post
  inserturljobpost = `${API_BASE_URL}jobpostinsert`;
  fetchjobposturl = `${API_BASE_URL}fetchjobpost`;
  // Contact
  inserturlcontact = `${API_BASE_URL}insertcontact`;
  fetchcontactdetails = `${API_BASE_URL}fetchcontact`;
  // Apply Job
  inserturlapplyjob = `${API_BASE_URL}insertapplyjob`;
  fetchapplyjobform = `${API_BASE_URL}fetchapplyform`;
  // Notification
  notificationurl = `${API_BASE_URL}insertnotification`;
  fetchnotificationurl = `${API_BASE_URL}fetchnotify`;

  // Resume Builder
  insert_resumeurl = `${API_BASE_URL}resumeinsert`;
  // Fetch Question
  fetchquestionpaperurl = `${API_BASE_URL}fetchquestion`;
  // Check Answer URL
  checkalanswere = `${API_BASE_URL}checkallanswer`;
  constructor(private h1: HttpClient, private router: Router, private auth: Auth, public cookie: CookieService) { }





  insertfrontform(formData: any) {
    return this.h1.post(this.contactformurl, formData);
  }

  deleteUser(uid: string): Observable<any> {
    const urldu = `${this.deleteuseraccount}/deleteUser/${uid}`;
    return this.h1.delete(urldu);
  }


  deleteEmployer(empid: string): Observable<any> {
    const urlde = `${this.deleteemployeraccount}deleteEmployer/${empid}`;
    return this.h1.delete(urlde);
  }

  public insertusermail(data: any) {
    console.log("done");
    return this.h1.post(this.inserturlc, data).subscribe({
      next: (resp: any) => {

        console.log(resp);

        console.log("Data inserted");
      },
      error: (err: any) => {
        console.log(err, "get the error");
      }
    });
  }
  insertusermailgog(data: string) {

    console.log("inside user google login");

    return this.h1.post(this.insertusermailurl, data).subscribe({
      next: (resp: any) => {
        console.log(resp);
        console.log("data inserted");
      },
      error: (err: any) => {
        console.log(err, "get the error");
      }
    })
  }

  fetchuser() {
    return this.h1.get(this.fetchuserurl).pipe(catchError(this.handleError));
  }


  private handleError(error: any): Observable<never> {

    console.error('An error occurred:', error);

    // Return an observable with an error message or perform other error handling tasks.
    return throwError('Something went wrong. Please try again later.');
  }



  checkUser(userName: string): Observable<any> {
    const url = `${API_BASE_URL}checkuser?userName=${userName}`;
    return this.h1.get(url);
  }
  //update user
  updateUser(data: any): Observable<any> {
    return this.h1.post(this.updateUserurl, data).pipe(
      catchError(this.handleEr)
    );
  }

  //update employer data
  updateEmployee(data: any): Observable<any> {
    return this.h1.post(this.employerupdateurl, data).pipe(
      catchError(this.handleEr)
    );
  }
  private handleEr(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  public logincheck(data: any) {
    console.log("done");
    return this.h1.post(this.logincheckurl, data).subscribe({
      next: (resp: any) => {
        AuthInterceptor.accessToken = resp.accessToken;
        const mainres: User = resp;
        console.log(`Login response from server: ${mainres}`);
        this.cookie.set('user', resp.uid);
        if (resp) {
          console.log("Server responded with a object of user");

          // Redirect to the dashboard if the response is true
          alert('Login Successfull!');
          this.router.navigate(['/dashboarduser/']);
        } else {
          // Handle other response statuses or errors
          alert('Incorrect Credentials!');
          this.router.navigate(['/login']);

        }
        console.log("Data checked");
      },
      error: (err: any) => {
        console.log(err);
        alert('Incorrect Credentials!');
        this.router.navigate(['/login']);
      }
    });
  }


  logincheckemp(data: any) {
    console.log(data);


    return this.h1.post(this.employercheckurl, data).subscribe({
      next: (resp: any) => {
        AuthInterceptor.accessToken = resp.accessToken;
        const mainres: Employer = resp;
        console.log("emoployer");
        console.log(`Login response from server: ${mainres}`);
        this.cookie.set('emp', resp.empid);

        console.log(resp.empfname);
        if (resp) {
          console.log("Server responded with a object of user");

          // Redirect to the dashboard if the response is true
          alert('Login successful!');
          this.router.navigate(['/dashboardemp/']);
        } else {
          // Handle other response statuses or errors
          alert('Incorrect Credentials!');
          this.router.navigate(['/employer']);
        }

      },
      error: (err: any) => {
        console.log(err);
        alert('Incorrect Credentials!');
        this.router.navigate(['/employer']);
      }
    });
  }





  public insertemployer(data: any) {
    console.log("done");
    return this.h1.post(this.inserturle, data).subscribe({
      next: (resp: any) => {

        console.log(resp);

        console.log("Data inserted");
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
  public insertemployeremail(data: any) {
    console.log("done");
    return this.h1.post(this.inserturlemail, data).subscribe({
      next: (resp: any) => {
        console.log("email is getting inserted");
        console.log(resp);
        this.router.navigate(['/dashboardemp/profilemep']);

        console.log("Data inserted mail");
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }


  fetchemployer() {
    return this.h1.get(this.employerdetailsfetchurl);
  }


  public jobpostinsert(data: any) {
    console.log("done");
    return this.h1.post(this.inserturljobpost, data).subscribe({
      next: (resp: any) => {

        console.log(resp);

        console.log("Data inserted");
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  fetchjobpost() {
    return this.h1.get(this.fetchjobposturl);
  }






  public insertcontact(data: any) {
    console.log("done");
    return this.h1.post(this.inserturlcontact, data).subscribe({
      next: (resp: any) => {

        console.log(resp);

        console.log("Data inserted");
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  fetchcontact() {
    return this.h1.get(this.fetchcontactdetails);
  }

  fetchapplyform() {
    return this.h1.get(this.fetchapplyjobform);
  }
  public insertapplyjob(data: any) {
    console.log("done");
    return this.h1.post(this.inserturlapplyjob, data).subscribe({
      next: (resp: any) => {
        console.log(resp);

        console.log("Data inserted");
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }


  public insertnotification(data: any) {
    console.log("done");
    return this.h1.post(this.notificationurl, data).subscribe({
      next: (resp: any) => {
        console.log(resp);

        console.log("Data inserted");
        this.router.navigate(['/admin/dashboardadmin']);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  fetchnotify(): Observable<any[]> {
    return this.h1.get<any[]>(this.fetchnotificationurl);
  }

  public resumeinsert(data: any) {
    console.log(data);
    console.log("done");

    return this.h1.post(this.insert_resumeurl, data).subscribe({
      next: (resp: any) => {
        console.log(resp);

        console.log("Data inserted");
      },
      error: (err: any) => {
        console.log("inside the error");
        console.log(err);
      }
    });
  }
  //fetch question paper fetchquestionpaperurl
  fetchquestion() {
    return this.h1.get(this.fetchquestionpaperurl);
  }

  loginWithGoogle() {

    return signInWithPopup(this.auth, new GoogleAuthProvider());

  }

  logout() {
    return signOut(this.auth);
  }



  //check all answere from database 
  public checkallanswer(userAnswers: any[]) {
    console.log("Sending the answere to checked in database");
    console.log(userAnswers, "checking all the values are correct or not");

    // Replace `this.checkalanswere` with the actual URL where your Spring backend is hosted
    const url = this.checkalanswere;

    return this.h1.post(url, userAnswers).subscribe({
      next: (resp: any) => {
        console.log(resp);
        if (resp) {
          this.router.navigate(['/dashboarduser/applyjob'])
        }
        console.log("Data checked from the database");
      },
      error: (err: any) => {
        console.log(err);
        this.router.navigate(['/dashboarduser/'])
      }
    });
  }

}
