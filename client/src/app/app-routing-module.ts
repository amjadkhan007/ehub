import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
// import { NavbarComponent } from './components/navbar/navbar.component';
//import { HomeComponent } from './components/home/home.component';
//import { AboutComponent } from './components/about/about.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
//import { DashboardComponent } from './components/dashboard/dashboard.component';
//import { ContactComponent } from './components/contact/contact.component';
import { RegisterComponent } from './components/register/register.component';
//import { LoginComponent } from './components/login/login.component';
//import { ProfileComponent } from './components/profile/profile.component';
// import { PublicProfileComponent } from './components/public-profile/public-profile.component';
// import { BlogComponent } from './components/blog/blog.component';
// import { EditBlogComponent } from './components/blog/edit-blog/edit-blog.component';
// import { AuthGuard } from './guards/auth.guard';
// import { NotAuthGuard } from './guards/notauth.guard';
// import { DeleteBlogComponent } from './components/blog/delete-blog/delete-blog.component';
// import { SingleBlogComponent } from './components/blog/single-blog/single-blog.component';
// import { UsersComponent } from './components/users/users.component';
// import { PendingUsersComponent } from './components/users/pending-users/pending-users.component';

const appRoutes: Routes = [
  // {
  //   path: 'home',
  //   component: HomeComponent
  // },
  // {
  //   path: 'about',
  //   component: AboutComponent
  // },
  // {
  //   path: 'contact',
  //   component: ContactComponent
  // },
  // {
  //   path: 'dashboard',
  //   component: DashboardComponent,
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'users',
  //   component: UsersComponent,
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'pending-users',
  //   component: PendingUsersComponent,
  //   canActivate: [AuthGuard]
  // },
  {
    path: 'register',
    component: RegisterComponent//,
    // canActivate: [NotAuthGuard]
  },
  // {
  //   path: 'login',
  //   component: LoginComponent,
  //   canActivate: [NotAuthGuard]
  // },
  // {
  //   path: 'profile',
  //   component: ProfileComponent,
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'user/:username',
  //   component: PublicProfileComponent,
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'blog',
  //   component: BlogComponent,
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'edit-blog/:id',
  //   component: EditBlogComponent,
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'delete-blog/:id',
  //   component: DeleteBlogComponent,
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'single/:id',
  //   component: SingleBlogComponent,
  //   canActivate: [AuthGuard]
  // },
  { path: '',
    redirectTo: '/register',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
