import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnChanges {
  @Input() rating = 0;
  
  stars: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rating']) {
      this.updateStars();
    }
  }

  private updateStars(): void {
    this.stars = [];
    
    const fullStars = Math.floor(this.rating);
    const decimalPart = this.rating % 1;

    for (let i = 0; i < fullStars; i++) {
      this.stars.push('full');
    }

    if (decimalPart >= 0.8) {
      this.stars.push('full');
    } 
    else if (decimalPart >= 0.5) {
      this.stars.push('half');
    }

    while (this.stars.length < 5) {
      this.stars.push('empty');
    }
  }
}