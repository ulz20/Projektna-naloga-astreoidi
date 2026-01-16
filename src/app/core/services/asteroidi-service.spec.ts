import { TestBed } from '@angular/core/testing';

import { AsteroidiService } from './asteroidi-service';

describe('AsteroidiService', () => {
  let service: AsteroidiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsteroidiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
