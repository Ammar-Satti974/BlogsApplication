import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { BlogComponent } from './components/blog/blog.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { ManageBlogsComponent } from './components/admin/manage-blogs/manage-blogs.component';
import { BlogFormComponent } from './components/admin/blog-form/blog-form.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { LogoutComponent } from './components/logout/logout.component';

export const routes: Routes = [
    {
        path:"",
        component:HomeComponent
    },
    {
        path:"about",
        component:AboutComponent
    },
    {
        path:"blog/:id",
        component:BlogComponent
    },
    {
        path:"blogs",
        component:BlogsComponent
    },
    {
        path:"admin/blogs",
        component:ManageBlogsComponent,
        canActivate:[authGuard]
    },
    {
        path:"admin/blogs/create",
        component:BlogFormComponent,
        canActivate:[authGuard]
    },
    {
        path:"admin/blogs/update/:id",
        component:BlogFormComponent,
        canActivate:[authGuard]
    },
    {
        path:"login",
        component:LoginComponent
    },
    {
        path:"register",
        component:RegisterComponent
    },
    {
        path:"contact",
        component:ContactUsComponent
    },
    {
        path:"logout",
        component:LogoutComponent
    }

];
