import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustlineResultComponent } from './trustline-result.component';

describe('TrustlineResultComponent', () => {
  let component: TrustlineResultComponent;
  let fixture: ComponentFixture<TrustlineResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrustlineResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrustlineResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
