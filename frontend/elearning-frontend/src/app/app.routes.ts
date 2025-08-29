import { Routes } from '@angular/router';
import { CourseListComponent } from './pages/course-list/course-list.component';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { MyCoursesComponent } from './pages/my-courses/my-courses.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { CourseViewerComponent } from './pages/course-viewer/course-viewer.component';
import { ManageCourseComponent } from './pages/admin/manage-course/manage-course.component';
import { CreateCourseComponent } from './pages/admin/create-course/create-course.component';
import { UserListComponent } from './pages/admin/user-list/user-list.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { SignupRoleSelectComponent } from './pages/signup-role-select/signup-role-select.component';
import { EditUserComponent } from './pages/admin/edit-user/edit-user.component';
import { HomeComponent } from './components/home/home.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { instructorGuard } from './guards/instructor.guard';
import { DashboardComponent as InstructorDashboardComponent } from './pages/instructor/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileSettingsComponent } from './pages/profile-settings/profile-settings.component';
import { ProfilePhotoComponent } from './pages/profile-photo/profile-photo.component';






export const routes: Routes = [
  { path: 'courses', component: CourseListComponent },
  { path: 'courses/:id', component: CourseDetailComponent },
  { path: 'login', component: LoginComponent },  
  { path: 'signup', component: SignupRoleSelectComponent  },
  { path: 'signup/:role', component: SignupComponent }, 
  {
    path: 'my-courses',
    component: MyCoursesComponent,
    canActivate: [authGuard], 
  },
  {
    path: 'learn/:courseId',
    component: CourseViewerComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/courses/:id',
    component: ManageCourseComponent,
    canActivate: [instructorGuard], 
  },
  {
    path: 'admin/create-course',
    component: CreateCourseComponent,
    canActivate: [instructorGuard],
  },
    {
    path: 'admin/users',
    component: UserListComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'admin/dashboard',
    component: DashboardComponent,
    canActivate: [adminGuard],
 },
 {
    path: 'admin/users/:id/edit',
    component: EditUserComponent,
    canActivate: [adminGuard],
  },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'search', component: SearchResultsComponent },
    {
    path: 'instructor/courses',
    component: InstructorDashboardComponent,
    canActivate: [instructorGuard],
  },
   {
    path: 'profile',
    component: ProfileSettingsComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'edit', pathMatch: 'full' }, 
      { path: 'edit', component: ProfileComponent },
      { path: 'photo', component: ProfilePhotoComponent }
    ]
  }

];