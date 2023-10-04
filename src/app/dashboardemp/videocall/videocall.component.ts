import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

class SendMessage {
  messageTo!: string;
  messageFrom!: string;
  message!: string;
}
@Component({
  selector: 'app-videocall',
  templateUrl: './videocall.component.html',
  styleUrls: ['./videocall.component.css']
})
export class VideocallComponent implements OnInit {

  message: SendMessage = new SendMessage(); // Initialize an empty message
  uid!: string | null;
  messageForm!: any;
  messages!: SendMessage[];
  constructor(private renderer: Renderer2 , private http: HttpClient, private route: ActivatedRoute,
    private cookie: CookieService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loadScript('assets/video-call.js').then(() => {
      // The script has been loaded and executed.
      // You can now call functions and use variables from the script.
    });
    this.uid = this.route.snapshot.paramMap.get("email");
    console.log("uid:", this.uid); 
      // Get the "to" value from the cookie (assuming "empemailid" is the cookie name)
      this.message.messageFrom = this.cookie.get('emp');
      console.log(this.message.messageFrom);
      console.log(this.uid);
  
      this.fetchMessages();
      this.messageForm = this.formBuilder.group({
        messageFrom: [this.message.messageFrom, Validators.required],
        messageTo: [this.uid, Validators.required],
        message: [this.message.message, Validators.required]
      });
  }

  createRoom() {
    // Implement your createRoom logic here
  }

  joinRoom() {
    // Implement your joinRoom logic here
  }

  startScreenShare() {
    // Implement your startScreenShare logic here
  }

  private loadScript(scriptUrl: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const script = this.renderer.createElement('script');
      script.src = scriptUrl;
      script.onload = () => {
        resolve();
      };
      script.onerror = (error: any) => {
        reject(error);
      };
      this.renderer.appendChild(document.body, script);
    });
  }
  
  fetchMessages() {
    // Fetch previous messages from the server
    this.http
      .get<SendMessage[]>('http://localhost:9001/fetchMessages')
      .subscribe((messages: SendMessage[]) => {
        // Filter messages to only include the relevant ones
        this.messages = messages.filter(
          (message) =>
            (message.messageTo === this.uid &&
            message.messageFrom === this.message.messageFrom)||
            (message.messageTo === this.message.messageFrom &&
              message.messageFrom === this.uid)
            
        );

        // If relevant messages are found, set the previousMessage field
        if (this.messages.length > 0) {
          this.messageForm.patchValue({
            previousMessage: this.messages[this.messages.length - 1].message,
          });
        }
      });
  }

  sendMessage() {
    if (this.messageForm.valid) {
      const messageToSend = this.messageForm.value;

      // Make an HTTP POST request to send the message
      this.http
        .post<SendMessage>('http://localhost:9001/send', messageToSend)
        .subscribe({
          next: (response: any) => {
            console.log('Message sent successfully:', response);
            // Optionally, reset the form
            this.messageForm.patchValue({
              message: '',
              previousMessage: response.message, // Set previousMessage to the sent message
            });
            this.fetchMessages();
            
          },
          error: (err: any) => {
            console.error('Error sending message:', err);
          },
        });
    }
  }
}
