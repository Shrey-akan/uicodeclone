import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-headeruser',
  templateUrl: './headeruser.component.html',
  styleUrls: ['./headeruser.component.css']
})
export class HeaderuserComponent implements OnInit{
  userEmail!: string;
  
  constructor(private route: ActivatedRoute , private router:Router) {}

  ngOnInit() {
    // Retrieve the email from the query parameters
    this.route.queryParams.subscribe(params => {
      this.userEmail = params['email'];
    });
  }
  public logout(){
    // this.userauth.clear();
    this.router.navigate(['/']); 
  }
  signto(){
    this.router.navigate(['/']);
  }

}
