import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsteroidiDate } from './asteroidi-date';

describe('AsteroidiDate', () => {
  let component: AsteroidiDate;
  let fixture: ComponentFixture<AsteroidiDate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsteroidiDate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsteroidiDate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
