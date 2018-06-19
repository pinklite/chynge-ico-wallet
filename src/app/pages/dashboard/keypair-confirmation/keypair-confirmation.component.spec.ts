import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeypairConfirmationComponent } from './keypair-confirmation.component';

describe('KeypairConfirmationComponent', () => {
  let component: KeypairConfirmationComponent;
  let fixture: ComponentFixture<KeypairConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeypairConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeypairConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
