import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, ParseUUIDPipe, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/guards/Auth.guard';

@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @UseGuards(AuthGuard)
  @Put('uploadImage/:productId')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @UploadedFile(

      new  ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200000,
            message: "File must be max 200kb"
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpge|png|webp)$/,
          })
        ]
      })

    ) file: Express.Multer.File,
    @Param('productId', ParseUUIDPipe) productId: string) {
    return this.fileUploadService.uploadImage(file, productId);
  }
}
