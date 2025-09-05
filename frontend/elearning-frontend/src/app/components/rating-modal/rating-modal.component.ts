import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rating-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating-modal.component.html',
  styleUrls: ['./rating-modal.component.scss']
})
export class RatingModalComponent {
  @Input() courseTitle = '';
  @Output() close = new EventEmitter<void>(); 
  @Output() ratingSubmit = new EventEmitter<number>(); 

  stars = [1, 2, 3, 4, 5];
  hoveredRating = 0;
  selectedRating = 0;

  submitRating(): void {
    if (this.selectedRating > 0) {
      this.ratingSubmit.emit(this.selectedRating);
    }
  }

  closeModal(): void {
    this.close.emit();
  }
}