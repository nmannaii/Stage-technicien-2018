import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupeDeRechercheComponent } from './groupe-de-recherche.component';

describe('GroupeDeRechercheComponent', () => {
  let component: GroupeDeRechercheComponent;
  let fixture: ComponentFixture<GroupeDeRechercheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupeDeRechercheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupeDeRechercheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
