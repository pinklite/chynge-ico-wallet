import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeypairResultComponent } from './keypair-result.component';

describe('KeypairResultComponent', () => {
  let component: KeypairResultComponent;
  let fixture: ComponentFixture<KeypairResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeypairResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeypairResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
