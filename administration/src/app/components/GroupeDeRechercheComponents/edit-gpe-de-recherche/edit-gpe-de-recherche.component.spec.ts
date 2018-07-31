import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGpeDeRechercheComponent } from './edit-gpe-de-recherche.component';

describe('EditGpeDeRechercheComponent', () => {
  let component: EditGpeDeRechercheComponent;
  let fixture: ComponentFixture<EditGpeDeRechercheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditGpeDeRechercheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGpeDeRechercheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
