import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/auth/user.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notifications!: any;

  constructor(private notificationService: UserService,public cookie:CookieService) { }
  userID: String = "0";
  ngOnInit(): void {
    this.userID = this.cookie.get('user');
    console.log(this.userID);
    console.log('User ID from cookie:', this.userID);
    this.fetchNotifications();
  }
  fetchNotifications(): void {
    this.notificationService.fetchnotify().subscribe(
{
  next: (response:any) => {
    console.log('Fetched notifications:', response);

    // Filter notifications based on the user ID
    this.notifications = response.filter((notification: any) => {
      return notification.notifyuid === this.userID;
    });
  },
  error:(err:any) =>{
    console.error('Error fetching notifications:', err);
  }
}
    );
  }
  
  

  


}
