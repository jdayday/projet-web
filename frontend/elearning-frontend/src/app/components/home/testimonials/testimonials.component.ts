import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TestimonialService } from '../../../services/testimonial.service';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit {
  testimonials: any[] = [];

  constructor(private testimonialService: TestimonialService) {}

  ngOnInit(): void {
    this.testimonialService.getTestimonials().subscribe(data => {
      this.testimonials = data;
    });
  }
}