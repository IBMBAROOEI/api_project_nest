import { Configerror } from './reponse.service';
import{Module} from '@nestjs/common';

@Module({

    providers:[Configerror],
    exports:[Configerror]
})
export  class HandelModule{}