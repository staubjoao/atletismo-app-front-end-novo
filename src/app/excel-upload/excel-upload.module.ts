import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExcelUploadPageRoutingModule } from './excel-upload-routing.module';

import { ExcelUploadPage } from './excel-upload.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExcelUploadPageRoutingModule
  ],
  declarations: [ExcelUploadPage]
})
export class ExcelUploadPageModule {}
