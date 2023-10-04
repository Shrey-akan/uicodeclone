import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardempRoutingModule } from './dashboardemp-routing.module';
import { DashboardempComponent } from './dashboardemp.component';
import { PostjobComponent } from './postjob/postjob.component';
import { AlljobsComponent } from './alljobs/alljobs.component';
import { ProfilemepComponent } from './profilemep/profilemep.component';
import { EmpmessageComponent } from './empmessage/empmessage.component';

import { HeaderdashboardempComponent } from './headerdashboardemp/headerdashboardemp.component';

import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { ApplieduserdetailsComponent } from './applieduserdetails/applieduserdetails.component';
import { GeinfoformComponent } from './geinfoform/geinfoform.component';
import { UpdateempprofileComponent } from './updateempprofile/updateempprofile.component';
import { NotificationempComponent } from './notificationemp/notificationemp.component';
import { VideocallComponent } from './videocall/videocall.component';
@NgModule({
  declarations: [
    DashboardempComponent,
    PostjobComponent,
    AlljobsComponent,
    ProfilemepComponent,
    EmpmessageComponent,

    HeaderdashboardempComponent,
     ApplieduserdetailsComponent,
     GeinfoformComponent,
     UpdateempprofileComponent,
     NotificationempComponent,
     VideocallComponent
  ],
  imports: [
    CommonModule,
    DashboardempRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DashboardempModule { }
