   import { HttpStatus,HttpException } from "@nestjs/common";
import { error } from 'console';
  
  export  class Configerror{
 
        success: boolean;
        data: any;
        errors: string[];
        message?:string;
     
       constructor() {
         this.success = false;
         this.data = null;
         this.errors = [];
         this.message = undefined;    }
     
       public setSuccess(success: boolean): void {
         this.success = success;
       }
     
       public setData(data: any): void {
         this.data = data;
       }
     
       public addError(error: string): void {
   
            
         this.errors.push(error);
       }
     
       
     public setMessage(message?: string): void {
       this.message = message;
     }
   
     public getResponse(): any {
       if (this.success) {
         return {
           success: this.success,
           message: this.message, 
           data:this.data,
         };
   
         
       } else {
         return {
   
           success: this.success,
           errors: this.errors,
         };
       }
     }
   } 


  