import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustlineConfirmationComponent } from './trustline-confirmation.component';

describe('TrustlineConfirmationComponent', () => {
  let component: TrustlineConfirmationComponent;
  let fixture: ComponentFixture<TrustlineConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrustlineConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrustlineConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
