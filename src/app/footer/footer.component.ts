import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  // Define properties or methods here if needed

  // whatapp() {
  //   const phoneNumber = '9810654125'; // Replace with the recipient's phone number
  //   const message = 'Hello, how can I help you?';
  //   const whatsappBaseUrl = 'https://api.whatsapp.com/send';
  //   const encodedMessage = encodeURIComponent(message);
  //   const url = `${whatsappBaseUrl}?phone=${phoneNumber}&text=${encodedMessage}`;
  //   window.open(url, '_blank');
  // }
  // sendWhatsAppMessage() {
  //   // Replace '123456789' with the recipient's phone number
  //   const phoneNumber = '123456789';

  //   // Replace 'Hello, how can I help you?' with your desired message
  //   const message = 'Hello, how can I help you?';

  //   // Construct the WhatsApp API URL
  //   const whatsappBaseUrl = 'https://api.whatsapp.com/send';
  //   const encodedMessage = encodeURIComponent(message);
  //   const whatsappUrl = `${whatsappBaseUrl}?phone=${phoneNumber}&text=${encodedMessage}`;

  //   // Open the WhatsApp URL in a new tab/window
  //   window.open(whatsappUrl, '_blank');
  // }
  // sendWhatsApp
  sendWhatsAppMessage() {
      // Replace '123456789' with the recipient's phone number
      const phoneNumber = '123456789';
  
      // Replace 'Hello, how can I help you?' with your desired message
      
     
  const message = 'Hello, how can I help you?';
  
      
  
     
  
  
  // Construct the WhatsApp API URL
      
     
  const whatsappBaseUrl = 'https://api.whatsapp.com/send';
      
     
  const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `${whatsappBaseUrl}?phone=${phoneNumber}&text=${encodedMessage}`;
  
      // Redirect to WhatsApp
      window.location.href = whatsappUrl;
    }
}
