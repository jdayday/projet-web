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
    canActivate: [adminGuard], 
  },
  {
    path: 'admin/create-course',
    component: CreateCourseComponent,
    canActivate: [adminGuard],
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

];