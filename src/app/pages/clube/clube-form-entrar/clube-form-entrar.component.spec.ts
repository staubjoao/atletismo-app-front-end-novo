import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ClubeFormEntrarComponent } from './clube-form-entrar.component';

describe('ClubeFormEntrarComponent', () => {
  let component: ClubeFormEntrarComponent;
  let fixture: ComponentFixture<ClubeFormEntrarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubeFormEntrarComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClubeFormEntrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
