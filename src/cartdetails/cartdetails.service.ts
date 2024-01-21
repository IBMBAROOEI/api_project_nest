import { Injectable } from '@nestjs/common';
import { CreateCartdetailDto } from './dto/create-cartdetail.dto';
import { UpdateCartdetailDto } from './dto/update-cartdetail.dto';

@Injectable()
export class CartdetailsService {
  create(createCartdetailDto: CreateCartdetailDto) {
    return 'This action adds a new cartdetail';
  }

  findAll() {
    return `This action returns all cartdetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cartdetail`;
  }

  update(id: number, updateCartdetailDto: UpdateCartdetailDto) {
    return `This action updates a #${id} cartdetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} cartdetail`;
  }
}
