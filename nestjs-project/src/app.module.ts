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
import { ProfileModule } from './profile/profile.module';
import { HomepageModule } from './homepage/homepage.module';
import { LessonsController } from './lessons/lessons.controller';
import { LessonsModule } from './lessons/lessons.module';
import { RatingsModule } from './ratings/ratings.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, PrismaModule, CoursesModule, CheckoutModule, UserModule, AdminModule, TestimonialsModule, CategoriesModule, ProfileModule, HomepageModule, LessonsModule, RatingsModule ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}