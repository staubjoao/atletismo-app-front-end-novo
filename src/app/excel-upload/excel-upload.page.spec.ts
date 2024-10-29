import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExcelUploadPage } from './excel-upload.page';

describe('ExcelUploadPage', () => {
  let component: ExcelUploadPage;
  let fixture: ComponentFixture<ExcelUploadPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelUploadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
