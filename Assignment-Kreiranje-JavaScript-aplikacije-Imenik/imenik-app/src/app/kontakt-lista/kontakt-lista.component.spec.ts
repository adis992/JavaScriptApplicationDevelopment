import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KontaktListaComponent } from './kontakt-lista.component';

describe('KontaktListaComponent', () => {
  let component: KontaktListaComponent;
  let fixture: ComponentFixture<KontaktListaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KontaktListaComponent]
    });
    fixture = TestBed.createComponent(KontaktListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
