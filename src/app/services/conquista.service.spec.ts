import { TestBed } from '@angular/core/testing';

import { ConquistaService } from './conquista.service';

describe('ConquistaService', () => {
  let service: ConquistaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConquistaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
