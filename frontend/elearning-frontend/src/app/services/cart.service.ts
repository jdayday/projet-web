import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Course } from '../models/course.model';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class CartService implements OnDestroy {
  private readonly GUEST_KEY = 'cart_guest';
  private readonly USER_PREFIX = 'cart_';

  private itemsSubject = new BehaviorSubject<Course[]>([]);
  private itemCountSubject = new BehaviorSubject<number>(0);

  public items$ = this.itemsSubject.asObservable();
  public itemCount$ = this.itemCountSubject.asObservable();

  private authSub?: Subscription;

  constructor(private auth: AuthService) {
    this.loadActiveCart();

    this.authSub = this.auth.currentUser$.subscribe(user => {
      if (user) {
        this.mergeGuestIntoUserAndLoad(user.id);
      } else {
        this.loadActiveCart(); 
      }
    });

    window.addEventListener('storage', this.handleStorageEvent);
  }

  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
    window.removeEventListener('storage', this.handleStorageEvent);
  }

  addToCart(course: Course): void {
    const items = this.getCart();
    if (!items.some(i => i.id === course.id)) {
      const updated = [...items, course];
      this.saveCart(updated, true);
    }
  }

  removeFromCart(courseId: number): void {
    const items = this.getCart();
    const updated = items.filter(i => i.id !== courseId);
    this.saveCart(updated, true);
  }

  isCourseInCart(courseId: number): boolean {
    return this.getCart().some(i => i.id === courseId);
  }

  clearCart(): void {
    this.saveCart([], true);
  }


  private activeCartKey(): string {
    const userId = this.auth.getCurrentUserId();
    return userId ? `${this.USER_PREFIX}${userId}` : this.GUEST_KEY;
  }

  private getCart(): Course[] {
    const key = this.activeCartKey();
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) as Course[] : [];
    } catch {
      return [];
    }
  }

  private saveCart(items: Course[], emit = false): void {
    const key = this.activeCartKey();
    localStorage.setItem(key, JSON.stringify(items));
    if (emit) this.emitState(items);
  }

  private emitState(items: Course[]): void {
    this.itemsSubject.next(items);
    this.itemCountSubject.next(items.length);
  }

  private loadActiveCart(): void {
    const items = this.getCart();
    this.emitState(items);
  }

  private mergeGuestIntoUserAndLoad(userId: number): void {
    const userKey = `${this.USER_PREFIX}${userId}`;
    const guestItems = this.readCart(this.GUEST_KEY);
    const userItems = this.readCart(userKey);

    const merged = [...userItems];
    for (const g of guestItems) {
      if (!merged.some(u => u.id === g.id)) merged.push(g);
    }

    localStorage.setItem(userKey, JSON.stringify(merged));
    localStorage.removeItem(this.GUEST_KEY);

    this.emitState(merged);
  }

  private readCart(key: string): Course[] {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) as Course[] : [];
    } catch {
      return [];
    }
  }

  private handleStorageEvent = (e: StorageEvent) => {
    if (!e.key) return;
    const keyNow = this.activeCartKey();
    if (e.key === keyNow || e.key === this.GUEST_KEY || e.key.startsWith(this.USER_PREFIX)) {
      this.loadActiveCart();
    }
  };
}
