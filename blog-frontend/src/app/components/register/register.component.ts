import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { RegisterDto } from '../../types/register.dto';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  userName!: string;
  email!: string;
  password!: string;
  confirmPassword!: string;
  authService = inject(AuthService);
  router= inject(Router);
  register(){
    const registrationData: RegisterDto= {
      userName: this.userName,
      email: this.email,
      password:this.password,
      confirmPassword: this.confirmPassword,
    };
    this.authService.register(registrationData).subscribe({
      next: ()=>{
        alert('Registration successful:');
        this.router.navigateByUrl("/login");
      },
      error: () => {
        alert('Registration error:');
      }
    })

  }
}
