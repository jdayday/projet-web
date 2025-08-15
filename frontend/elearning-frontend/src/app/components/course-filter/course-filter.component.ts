import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-course-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-filter.component.html',
  styleUrls: ['./course-filter.component.scss']
})
export class CourseFilterComponent implements OnInit {
  categories: any[] = [];
  divisions = [
    'BASE_7', 'BASE_8', 'BASE_9', 'SECONDAIRE_1', 'SECONDAIRE_2', 'SECONDAIRE_3',
    'BAC_INFO', 'BAC_MATH', 'BAC_SCIENCE', 'BAC_SPORT', 'CONCOURS'
  ];
  activeDivision: string | null = null;
  activeCategoryId: number | null = null;

  @Output() filtersChanged = new EventEmitter<{ division: string | null; categoryId: number | null }>();

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.onSelectDivision('BAC_INFO');
  }

  onSelectDivision(division: string): void {
    this.activeDivision = division;
    this.activeCategoryId = null;
    
    this.categoryService.getAllCategories(this.activeDivision).subscribe(data => {
      this.categories = data;
    });
    
    this.filtersChanged.emit({ division: this.activeDivision, categoryId: null });
  }

  onFilterByCategory(categoryId: number | null): void {
    this.activeCategoryId = categoryId;
    this.filtersChanged.emit({ division: this.activeDivision, categoryId: this.activeCategoryId });
  }
}