import { Test, TestingModule } from '@nestjs/testing';
import { CartdetailsController } from './cartdetails.controller';
import { CartdetailsService } from './cartdetails.service';

describe('CartdetailsController', () => {
  let controller: CartdetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartdetailsController],
      providers: [CartdetailsService],
    }).compile();

    controller = module.get<CartdetailsController>(CartdetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
