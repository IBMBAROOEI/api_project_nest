import { Controller, Post, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";


