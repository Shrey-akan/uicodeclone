import { HttpClient } from '@angular/common/http';
import { Component , OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { OtpService } from 'src/app/auth/otp.service';
import { UserService } from 'src/app/auth/user.service';
// Sample User and Message classes
class User {
  constructor(public id: number, public name: string) {}
}

class SendMessage {
  constructor(public messageTo: string, public messageFrom: string, public message: string) {}
}

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  messages: SendMessage[] = [];
  selectedUser: string | null = null;
  filteredMessages: SendMessage[] = [];
  userID: any;
  userData1: any;
  abc: any;
  newMessage: string = '';


  selectUser(user: string) {
    this.selectedUser = user;
    // Filter messages to display only messages from the selected user
    this.filteredMessages = this.messages.filter((message) => message.messageFrom === user);
    this.fetchMyMessages(); 
    
  }
  
  constructor(private http: HttpClient, public cookie: CookieService,private b1:UserService) {}

  ngOnInit(): void {
    this.userID = this.cookie.get('user');
    console.log(this.userID);
    console.log('User ID from cookie:', this.userID);

    let response = this.b1.fetchuser();
  
    response.subscribe((data1: any) => {
      // Debugging: Log the data received from the API
      console.log('Data from API:', data1);
      const uuid=this.userID;
      console.log(uuid);
      
      // Filter the data array to include only the user with the matching userID
      // this.data = data1.find((user: any) => user.uid === uuid);
      this.userData1 = data1.find((user: any) => user.uid == uuid);
      console.log(this.userData1);
      // Debugging: Log the filtered data
      console.log("hello");
      console.log('Filtered Data:', this.userData1);
      this.abc = this.userData1.userName;
      console.log(this.abc);

    });


    this.fetchMessages();
    
    // this.fetchSentMessages();

  }


    // Keep track of unique message identifiers
    uniqueMessageIds: Set<string> = new Set<string>();


    fetchMessages() {
      console.log(this.abc);
    
      // Create a Set to store unique names
      const uniqueNames = new Set<string>();
    
      this.http.get<SendMessage[]>('http://localhost:9001/fetchMessages')
        .subscribe((messages: SendMessage[]) => {
          // Filter the messages to display only those where messageTo === this.abc
          this.messages = messages.filter((message) => {
            // Check if the name has not been added to the uniqueNames Set
            if (!uniqueNames.has(message.messageFrom)) {
              uniqueNames.add(message.messageFrom); // Add the name to the Set
              return message.messageTo === this.abc;
            }
            return false; // Skip duplicate names
          });
          console.log(this.abc);
        });
    }
    

  //   fetchSentMessages() {
  //   // Fetch messages sent by you to the selected user
  //   this.http.get<SendMessage[]>('http://localhost:9001/fetchMessages')
  //     .subscribe((messages: SendMessage[]) => {
  //       // Filter messages to display only those where messageFrom === this.abc and messageTo === selectedUser
  //       this.filteredMessages = messages.filter(
  //         (message) =>
  //           message.messageFrom === this.abc &&
  //           message.messageTo === this.selectedUser
  //       );
  //     });
  // }
  fetchMyMessages() {
    // Make an HTTP GET request to fetch messages
    this.http.get<SendMessage[]>('http://localhost:9001/fetchMessages')
      .subscribe((messages: SendMessage[]) => {
        this.filteredMessages = [];
        const uniqueMessageIds = new Set<string>();
  
        // Iterate through the messages
        for (const message of messages) {
          // Create a unique identifier for the message
          const messageIdentifier = `${message.messageFrom}_${message.messageTo}_${message.message}`;
  
          // Check if the message has not been displayed yet
          if (!uniqueMessageIds.has(messageIdentifier)) {
            // Add the identifier to the set to mark it as displayed
            uniqueMessageIds.add(messageIdentifier);
  
            // Check if the message is from the selected user to this.abc or vice versa
            if (
              (message.messageFrom === this.selectedUser && message.messageTo === this.abc) ||
              (message.messageFrom === this.abc && message.messageTo === this.selectedUser)
            ) {
              // Add the message to the filteredMessages array
              this.filteredMessages.push(message);
            }
          }
        }
      });
  }
  

  sendMessage() {
    if (this.selectedUser && this.newMessage.trim() !== '') {
      const messageToSend = new SendMessage(this.selectedUser, this.abc, this.newMessage);
  
      // Make an HTTP POST request to send the message
      this.http.post<SendMessage>('http://localhost:9001/send', messageToSend)
        .subscribe({
          next: (response: SendMessage) => {
            console.log('Message sent successfully:', response);
  
            // Add the sent message to the filteredMessages array
            this.filteredMessages.push(response);
  
            // Optionally, reset the form
            this.newMessage = '';
          },
          error: (err: any) => {
            console.error('Error sending message:', err);
          }
        });
    }
  }
  
  
  
}
