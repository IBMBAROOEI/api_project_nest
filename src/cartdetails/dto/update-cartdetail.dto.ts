import { PartialType } from '@nestjs/mapped-types';
import { CreateCartdetailDto } from './create-cartdetail.dto';

export class UpdateCartdetailDto extends PartialType(CreateCartdetailDto) {}
