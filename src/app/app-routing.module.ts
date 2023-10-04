import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FindjobComponent } from './findjob/findjob.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ServiceComponent } from './service/service.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EmployerModule } from './employer/employer.module';
import { CheckotpComponent } from './checkotp/checkotp.component';
import { ResetpassComponent } from './resetpass/resetpass.component';
import { CheckotpuserComponent } from './checkotpuser/checkotpuser.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';

const routes: Routes = [
  {
    path:'', component:FindjobComponent
  },
  {
    path:'home' ,component:HomeComponent
  },
  {
    path:'about',component:AboutComponent
  },
  {
    path:'service',component:ServiceComponent
  },
  {
    path:'contact',component:ContactComponent
  },
  {
    path:'checkotp/:uid',component:CheckotpComponent
  },
  {
    path:'login',component:LoginComponent
  },
  {
    path:'register',component:RegisterComponent
  },
  {
    path: 'employer',
    loadChildren: () => import('./employer/employer.module').then(m => m.EmployerModule)
  },
  {
    path: 'dashboarduser',
    loadChildren: () => import('./dashboarduser/dashboarduser.module').then(m => m.DashboarduserModule)
  },
  {
    path: 'dashboardemp',
    loadChildren: () => import('./dashboardemp/dashboardemp.module').then(m => m.DashboardempModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path:'resetpass',component:ResetpassComponent
  },
  {
    path:'checkotpuser/:uid',component:CheckotpuserComponent
  },
  {
    path:'resetpassword', component:ResetpasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
