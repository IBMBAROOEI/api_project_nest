import { HttpException, HttpStatus } from '@nestjs/common';

export class UnprocessableEntityException extends HttpException {
  constructor(errors: any) {
    super(
      {
        message: 'خطای اعتبارسنجی',
        errors,
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        error: 'خطای پردازش نشدن موجودیت'
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}