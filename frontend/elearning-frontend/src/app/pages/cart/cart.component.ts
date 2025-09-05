import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from '../../models/course.model';
import { take } from 'rxjs/operators';
import { CartService } from '../../services/cart.service';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cartItems$: Observable<Course[]>;
  totalPrice = 0;

  constructor(private cartService: CartService, private courseService: CourseService 
  ) {
    this.cartItems$ = this.cartService.items$;
    this.cartItems$.subscribe(items => {
      this.totalPrice = items.reduce((sum, item) => sum + (item.price || 0), 0);
    });
  }

  removeFromCart(courseId: number): void {
    this.cartService.removeFromCart(courseId);
  }

    checkout(): void {
    this.cartItems$.pipe(take(1)).subscribe(items => {
      const courseIds = items.map(item => item.id);
      if (courseIds.length > 0) {
        this.courseService.createCartCheckoutSession(courseIds).subscribe(session => {
          window.location.href = session.url;
        });
      }
    });
  }

}