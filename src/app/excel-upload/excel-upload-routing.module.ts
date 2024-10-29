import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExcelUploadPage } from './excel-upload.page';

const routes: Routes = [
  {
    path: '',
    component: ExcelUploadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExcelUploadPageRoutingModule {}
