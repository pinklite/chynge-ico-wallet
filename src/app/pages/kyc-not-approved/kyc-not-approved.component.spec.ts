import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KycNotApprovedComponent } from './kyc-not-approved.component';

describe('KycNotApprovedComponent', () => {
  let component: KycNotApprovedComponent;
  let fixture: ComponentFixture<KycNotApprovedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KycNotApprovedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KycNotApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
