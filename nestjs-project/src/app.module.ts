import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { AtGuard } from './common/guards';
import { PrismaModule } from './prisma/prisma.module';
import { CoursesModule } from './courses/courses.module';
import { CheckoutModule } from './checkout/checkout.module';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { TestimonialsModule } from './testimonials/testimonials.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, PrismaModule, CoursesModule, CheckoutModule, UserModule, AdminModule, TestimonialsModule, CategoriesModule ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}