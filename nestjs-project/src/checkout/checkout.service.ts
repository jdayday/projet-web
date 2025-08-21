import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import Stripe from 'stripe';

@Injectable()
export class CheckoutService {
  private stripe: Stripe;

  constructor(private prisma: PrismaService, private config: ConfigService) {
    this.stripe = new Stripe(this.config.get<string>('STRIPE_SECRET_KEY'));
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
      // Important: Pass your internal IDs here
      metadata: {
        userId: userId,
        courseId: courseId,
      },
      success_url: `http://localhost:4200/payment-success`,
      cancel_url: `http://localhost:4200/courses/${courseId}`,
    });

    return { url: session.url };
  }

  async enrollUser(userId: number, courseId: number) {
  return this.prisma.enrollment.create({
    data: {
      userId: userId,
      courseId: courseId,
    },
  });
 }

 async handleStripeEvent(signature: string, rawBody: Buffer) {
    const webhookSecret = this.config.get<string>('STRIPE_WEBHOOK_SECRET');
    let event: Stripe.Event;

    try {
        // Use the secret to verify the event
        event = this.stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } catch (err) {
        throw new Error(`Webhook signature verification failed: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = parseInt(session.metadata.userId, 10);
        const courseId = parseInt(session.metadata.courseId, 10);

        await this.enrollUser(userId, courseId);
    }
 }
}