import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [FormsModule, MatCardModule, MatInputModule, MatButtonModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {
  router= inject(Router);
  contactData = {
    name: '',
    email: '',
    message: ''
  };
  
  onSubmit(){
    if (this.contactData.name && this.contactData.email && this.contactData.message) {
      console.log('Message sent:', this.contactData);
      alert('Thank you for reaching out! We will get back to you soon.');
      this.clearForm();
      this.router.navigateByUrl("/");

    } else {
      alert('Please fill in all fields.');
    }
  }
  clearForm() {
    this.contactData = { name: '', email: '', message: '' };

  }
}
