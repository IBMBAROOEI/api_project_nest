import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './schemas/order.schemas';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../product/schemas/product.schema';
import { ObjectId } from 'mongoose'; // اضافه کردن وارد کننده ObjectId
@Injectable()
export class OrderService {


  constructor(
    @InjectModel(Order.name) private readonly OrderModel:Model<Order>,
    @InjectModel(Product.name) private readonly productModel:Model<Product>,

  ){}


  async createorder(createOrderDto:CreateOrderDto):Promise<any> {
    
  const{userId,products}=createOrderDto


   

let finalPrice=0;
const productDetails:any[]=[];
for(const product of products){

const productInfo=await this.getProduct(product.productId)
if(productInfo){
  finalPrice+=productInfo.price*product.quantity;


  productDetails.push({
    product:productInfo._id,
    quantity:product.quantity,
  })
}
}
const neworder=new this.OrderModel
({

user:userId,
products: productDetails.map((productdetail) => productdetail.product),
quantity:createOrderDto.quantity,
finalprice:finalPrice,



})

 const createdOrder=await neworder.save();
 const populatedOrder = await this.OrderModel.findById(createdOrder._id)
  .populate({
    path: 'products.product',
    select: 'name price',
  })
  .exec();

 return populatedOrder;

  }

  

  private async getProduct(id:string):Promise<Product>{
    const product=await this.productModel.findById(id).exec();
    return product;
  }






 async showOrderUser(userId:string):Promise<any>{


  const user=await this.OrderModel.find
  ({'user':userId}).populate('products').exec();
  

  return user;


}




    async deleteproduct(id:string,producId:string):Promise<void>
{


  const order=await this.OrderModel.findById(id);


  if(!order){
throw new Error("kl")

  }


  order.products=order.products.filter(


    (p)=>p.toString()
    
     !==producId);
  
     await order.save();
}






  async getAllOrder():Promise<Order[]>{

    try{

 const orders=await this.OrderModel.find()
 .populate({path:'user',select:'-password-refreshToken'}).populate('products')
 .select('-user.password -user.refreshToken')
 return orders;
    }catch(error){

      console.log(error)
    }
  }
  
}

