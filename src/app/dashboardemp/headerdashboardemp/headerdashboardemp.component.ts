import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-headerdashboardemp',
  templateUrl: './headerdashboardemp.component.html',
  styleUrls: ['./headerdashboardemp.component.css']
})
export class HeaderdashboardempComponent implements OnInit{
  showNavbaremp= true;
  constructor(private router: Router) {}

  ngOnInit() {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentRoute = event.urlAfterRedirects;

        // Check if the current route is 'employer'
        this.showNavbaremp = !['/employers/sign-in-checkemp'].includes(currentRoute);    
      }
    });
  }

}
