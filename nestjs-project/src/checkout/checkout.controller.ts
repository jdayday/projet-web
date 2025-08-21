import { Controller, Param, ParseIntPipe, Post, Headers  } from '@nestjs/common';
import { GetCurrentUserId, Public,RawBody} from '../common/decorators';
import { CheckoutService } from './checkout.service';
import { Request } from 'express';


@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post('session/:courseId')
  createCheckoutSession(
    @GetCurrentUserId() userId: number,
    @Param('courseId', ParseIntPipe) courseId: number,
  ) {
    return this.checkoutService.createSession(courseId, userId);
  }

  @Public()
  @Post('webhook')
  async handleWebhook(
    @Headers('stripe-signature') signature: string,
    @RawBody() rawBody: Buffer, 
  ) {
    await this.checkoutService.handleStripeEvent(signature, rawBody);
    return { received: true };
  }
}