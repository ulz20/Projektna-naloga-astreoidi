import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsteroidiFave } from './asteroidi-fave';

describe('AsteroidiFave', () => {
  let component: AsteroidiFave;
  let fixture: ComponentFixture<AsteroidiFave>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsteroidiFave]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsteroidiFave);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
