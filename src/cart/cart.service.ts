import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Model } from 'mongoose';
import { Cart, CartDocument } from './schemas/cart.schema';
import { Product ,ProductDocument} from '../product/schemas/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { error } from 'console';
@Injectable()
export class CartService {


  
  constructor(
    @InjectModel(Cart.name) private readonly CartModel: Model<CartDocument>,
 
  @InjectModel(Product.name)private readonly productModel:Model<ProductDocument>) { }

  
  
    
// async  findproduct(id:string):Promise<Product> {

//   return  this.productModel.findById(id).exec();
// }

//   try{
//     const product=await this.productModel.findById(id).exec();
//      console.log(product.id);
//     if(product){
//       return product.price;

//     }
//   }catch(error){
//  console.log(error)
// async  create(createCartDto:CreateCartDto):Promise<Cart> {


//   const { userId, productId, quantity } = CreateCartDto;
//     const Productprice=await this.getprice(productId);
//    const total=Productprice * quantity;
//      const carts=new this.CartModel({
//       userId,
//       productId,
//       quantity,
//        total

      
//      });

//      return carts.save();


//   }

  async create(createCartDto: CreateCartDto): Promise<Cart> {
    const { userId, productId, quantity } = createCartDto;

    const productPrice = await this.findProduct(productId);

    const total = productPrice * quantity;


  
  const cart = new this.CartModel({
    userId: userId,
    productId: productId,
    quantity: quantity,
    total: total,
  });

  return cart.save();
}







  async findProduct(productId:string):Promise<number>{

  
     try{
    const product=await this.productModel.findById(productId).exec();
    if(product){
      return product.price;

    }
  }catch(error){
 console.log(error)
  }
  }


  

}





  // findAll() {
  //   return `This action returns all cart`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} cart`;
  // }

  // update(id: number, updateCartDto: UpdateCartDto) {
  //   return `This action updates a #${id} cart`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} cart`;
  // }
