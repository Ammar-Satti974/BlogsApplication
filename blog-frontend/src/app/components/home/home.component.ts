import { Component, inject } from '@angular/core';
import { BlogService } from '../../blog.service';
import{Blog} from '../../types/blog'
import { RouterLink } from '@angular/router';
import { BlogCardComponent } from '../blog-card/blog-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ RouterLink, BlogCardComponent, RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  blogService = inject(BlogService)
  featuredBlog!: Blog[];

  ngOnInit(){
    this.blogService.getFeaturedBlog().subscribe(result=>{
      this.featuredBlog = result;
      console.log(this.featuredBlog);
      
    })
  }

}
