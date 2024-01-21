import { Test, TestingModule } from '@nestjs/testing';
import { CartdetailsService } from './cartdetails.service';

describe('CartdetailsService', () => {
  let service: CartdetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartdetailsService],
    }).compile();

    service = module.get<CartdetailsService>(CartdetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
