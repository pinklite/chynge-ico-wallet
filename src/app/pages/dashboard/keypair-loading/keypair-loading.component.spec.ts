import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeypairLoadingComponent } from './keypair-loading.component';

describe('KeypairLoadingComponent', () => {
  let component: KeypairLoadingComponent;
  let fixture: ComponentFixture<KeypairLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeypairLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeypairLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
