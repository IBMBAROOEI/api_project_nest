import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './schemas/order.schemas';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../product/schemas/product.schema';
import { Configerror } from '../Erorrhandel/reponse.service'
@Injectable()
export class OrderService {

  constructor(
    @InjectModel(Order.name) private readonly OrderModel: Model<Order>,
    private readonly configerror: Configerror,
    @InjectModel(Product.name) private readonly productModel: Model<Product>,


  ) { }


  async createorder(createOrderDto: CreateOrderDto): Promise<any> {
    try {
      const { userId, products } = createOrderDto

      let finalPrice = 0;
      const productDetails: any[] = [];
      for (const product of products) {
        const productInfo = await this.getProduct(product.productId)
        if (productInfo) {
          finalPrice += productInfo.price * product.quantity;
          productDetails.push({
            product: productInfo._id,
            quantity: product.quantity,
          })
        }
      }
      const neworder = new this.OrderModel
        ({

          user: userId,
          products: productDetails.map((productdetail) => productdetail.product),
          quantity: createOrderDto.quantity,
          finalprice: finalPrice,
        })

      const createdOrder = await neworder.save();
      const populatedOrder = await this.OrderModel.findById(createdOrder._id)
        .populate({
          path: 'products.product',
          select: 'name price',
        })
        .exec();
      this.configerror.setSuccess(true)
      this.configerror.setData(populatedOrder);
      this.configerror.setMessage("سفارش با موفقیت ثبت شد")
      return this.configerror.getResponse();
    } catch (error) {
      this.configerror.setSuccess(false);
      this.configerror.addError("خطا در ثبت  سفارش");
      throw new HttpException(this.configerror.getResponse(), HttpStatus.INTERNAL_SERVER_ERROR)

    }

  }



  private async getProduct(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    return product;
  }






  async showOrderUser(userId: string): Promise<any> {


    try {
      const user = await this.OrderModel.find
        ({ 'user': userId }).populate('products').exec();

      this.configerror.setSuccess(true);
      this.configerror.setData(user);
      return this.configerror.getResponse();
    }
    catch (error) {
      this.configerror.setSuccess(false);
      this.configerror.addError("خطا در نمایش سفارش");
      throw new HttpException(this.configerror.getResponse(), HttpStatus.INTERNAL_SERVER_ERROR)

    }

  }











  // async getAllOrder(): Promise<Order[]> {

  //   try {

  //     const orders: Order[] = await this.OrderModel.find()
  //       .populate({ path: 'user', select: '-password-refreshToken' }).populate('products')
  //       .select('-user.password -user.refreshToken').exec();
  //     this.configerror.setData(orders);
  //     this.configerror.setSuccess(true);
      
  //     return this.configerror.getResponse();
  //   } catch (error) {

  //     this.configerror.setSuccess(false)
  //     throw new HttpException(this.configerror.getResponse(), HttpStatus.INTERNAL_SERVER_ERROR)    }
  // }




  async deleteproduct(id: string, producId: string): Promise<void> {

    try {

      const order = await this.OrderModel.findById(id);
      if (!order) {
        this.configerror.setMessage("محصولی وجود ندارد")

        this.configerror.getResponse(), HttpStatus.NO_CONTENT;
      }
      order.products = order.products.filter(
        (p) => p.toString() !== producId); await order.save();

    }

    catch (error) {

      this.configerror.setSuccess(false)
      throw new HttpException(this.configerror.getResponse(), HttpStatus.INTERNAL_SERVER_ERROR)

    }
  }

}











