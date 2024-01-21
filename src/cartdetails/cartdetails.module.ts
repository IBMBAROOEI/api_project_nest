import { Module } from '@nestjs/common';
import { CartdetailsService } from './cartdetails.service';
import { CartdetailsController } from './cartdetails.controller';

@Module({
  controllers: [CartdetailsController],
  providers: [CartdetailsService],
})
export class CartdetailsModule {}
