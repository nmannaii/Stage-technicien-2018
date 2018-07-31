import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeGpeDeRechercheComponent } from './liste-gpe-de-recherche.component';

describe('ListeGpeDeRechercheComponent', () => {
  let component: ListeGpeDeRechercheComponent;
  let fixture: ComponentFixture<ListeGpeDeRechercheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeGpeDeRechercheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeGpeDeRechercheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
