import {AfterViewInit, Component, inject, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Blog } from '../../../types/blog';
import { BlogService } from '../../../blog.service';
import {MatButtonModule} from '@angular/material/button';
import { CategoryService } from '../../../category.service';
import { Category } from '../../../types/category';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-manage-blogs',
  standalone: true,
  imports: [MatTableModule, MatPaginator, MatSort, MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink],
  templateUrl: './manage-blogs.component.html',
  styleUrl: './manage-blogs.component.scss'
})
export class ManageBlogsComponent {
  displayedColumns: string[] = ['title', 'categoryId', 'action'];
  dataSource: MatTableDataSource<Blog>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.dataSource= new MatTableDataSource(this.blogs);
  }
  blogs: Blog[]=[];
  blogService = inject(BlogService);
  categoryService= inject(CategoryService);
  categoryList: Category[]=[];
  ngOnInit(){
    this.blogService.getAllBlog().subscribe(result=>{
      this.blogs= result;
      this.dataSource.data= this.blogs;
    })
    this.categoryService.getCategoryList().subscribe(result=>{
      this.categoryList= result;
    })
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getCategoryName(data:Blog){
    if (data.categoryId !== undefined) {
      const category = this.categoryList.find(x => x.id === data.categoryId);
      return category ? category.name : 'Unknown Category'; // Return the category name or a default value
    }
    return 'No Category';
  }
  delete(data:Blog){
    if (data.id !== undefined) {  // Ensure `id` is defined before proceeding
      this.blogService.deleteBlog(data.id).subscribe(() => {
        this.dataSource.data = this.blogs.filter((x) => x.id !== data.id);
      });
    } else {
      console.error('Blog ID is undefined.');
    }
  }

}

