import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import Stripe from 'stripe';
import { CartCheckoutDto } from './dto/cart-checkout.dto';

@Injectable()
export class CheckoutService {
  private stripe: Stripe;

  constructor(private prisma: PrismaService, private config: ConfigService) {
    this.stripe = new Stripe(this.config.get<string>('STRIPE_SECRET_KEY'));
  }
  

  async createCartCheckoutSession(dto: CartCheckoutDto, userId: number) {
    const { courseIds } = dto;

    const courses = await this.prisma.course.findMany({
      where: { id: { in: courseIds } },
    });

    if (courses.length !== courseIds.length) {
      throw new NotFoundException('One or more courses in your cart could not be found.');
    }
    
    const baseUrl = 'https://9b71f471940b.ngrok-free.app'; 

    const line_items = courses.map(course => {
      let imagePath: string | undefined;
      if (course.image) {
      imagePath = course.image.replace(/^https?:\/\/localhost:\d+/, '');
      imagePath = `${baseUrl}${imagePath}`;
    }

      return {
        price_data: {
        currency: 'usd',
        product_data: {
          name: course.title,
          images: imagePath ? [imagePath] : [],
        },
        unit_amount: Math.round(course.price * 100), 
      },
      quantity: 1,
    }
    });
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      success_url: `http://localhost:4200/my-courses?payment=success`, 
      cancel_url: `http://localhost:4200/cart`, 
      metadata: {
        userId: userId.toString(),
        courseIds: courseIds.join(','), 
      },
    });

    return { url: session.url };
  }
  


  async createSession(courseId: number, userId: number) {
    const course = await this.prisma.course.findUnique({
      where: { id: courseId },
    });

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd', 
            product_data: {
              name: course.title,
            },
            unit_amount: course.price * 100, 
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: userId,
        courseId: courseId,
      },
      success_url: `http://localhost:4200/my-courses?payment=success`,
      cancel_url: `http://localhost:4200/courses/${courseId}`,
    });

    return { url: session.url };
  }

  private async enrollUserInCourses(userId: number, courseIds: number[]) {
    const enrollmentData = courseIds.map(courseId => ({
      userId,
      courseId,
    }));

    return this.prisma.enrollment.createMany({
      data: enrollmentData,
      skipDuplicates: true,
    });
  }

 async handleStripeEvent(signature: string, rawBody: Buffer) {
    const webhookSecret = this.config.get<string>('STRIPE_WEBHOOK_SECRET');
    let event: Stripe.Event;

    try {
        event = this.stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } catch (err) {
        throw new Error(`Webhook signature verification failed: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = parseInt(session.metadata.userId, 10);
        if (session.metadata.courseIds) {
        const courseIdArray = session.metadata.courseIds.split(',').map(id => parseInt(id, 10));
        await this.enrollUserInCourses(userId, courseIdArray);
      } else if (session.metadata.courseId) {
        const courseId = parseInt(session.metadata.courseId, 10);
        await this.enrollUserInCourses(userId, [courseId]);
      }

    }
 }
}