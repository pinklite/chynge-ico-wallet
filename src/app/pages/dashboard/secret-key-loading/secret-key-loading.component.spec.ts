import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretKeyLoadingComponent } from './secret-key-loading.component';

describe('SecretKeyLoadingComponent', () => {
  let component: SecretKeyLoadingComponent;
  let fixture: ComponentFixture<SecretKeyLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecretKeyLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretKeyLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
