import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { FileUploadRepository } from './file-upload.repository';
import { CloudinaryConfig } from '../../config/cloudinary';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [ProductsModule],
  controllers: [FileUploadController],
  providers: [CloudinaryConfig, FileUploadService, FileUploadRepository],
})
export class FileUploadModule {}
