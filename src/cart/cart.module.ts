import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { UserSchema ,User} from '../user/schemas/user.schemas';
import { ProductSchema,Product } from '../product/schemas/product.schema';

import { MongooseModule } from '@nestjs/mongoose';
import { Cart,CartSchema } from './schemas/cart.schema';
@Module({
  controllers: [CartController],
  providers: [CartService],
  imports:[MongooseModule.forFeature([
    { name: Product.name, schema: ProductSchema },
    { name: Cart.name, schema: CartSchema },

    { name: User.name, schema: UserSchema },

  ]),]

})
export class CartModule {}
