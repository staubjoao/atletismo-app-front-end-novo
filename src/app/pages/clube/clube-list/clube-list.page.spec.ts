import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClubeListPage } from './club-list.page';

describe('ClubeListPage', () => {
  let component: ClubeListPage;
  let fixture: ComponentFixture<ClubeListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubeListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
