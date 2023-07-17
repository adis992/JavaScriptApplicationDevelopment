import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnosKontaktaComponent } from './unos-kontakta.component';

describe('UnosKontaktaComponent', () => {
  let component: UnosKontaktaComponent;
  let fixture: ComponentFixture<UnosKontaktaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnosKontaktaComponent]
    });
    fixture = TestBed.createComponent(UnosKontaktaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
