import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/auth/user.service';

@Component({
  selector: 'app-notificationemp',
  templateUrl: './notificationemp.component.html',
  styleUrls: ['./notificationemp.component.css']
})
export class NotificationempComponent implements OnInit {
  notifications!: any;

  constructor(private notificationService: UserService,public cookie:CookieService) { }
  empId: String = "0";
  ngOnInit(): void {
    this.empId = this.cookie.get('emp');
    console.log(this.empId);
    console.log('User ID from cookie:', this.empId);
    this.fetchNotifications();
  }
  fetchNotifications(): void {
    this.notificationService.fetchnotify().subscribe(
{
  next: (response:any) => {
    console.log('Fetched notifications:', response);

    // Filter notifications based on the user ID
    this.notifications = response.filter((notification: any) => {
      return notification.notifyuid === this.empId;
    });
  },
  error:(err:any) =>{
    console.error('Error fetching notifications:', err);
  }
}
    );
  }
  
  

}
