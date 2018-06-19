import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustlineLoadingComponent } from './trustline-loading.component';

describe('TrustlineLoadingComponent', () => {
  let component: TrustlineLoadingComponent;
  let fixture: ComponentFixture<TrustlineLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrustlineLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrustlineLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
