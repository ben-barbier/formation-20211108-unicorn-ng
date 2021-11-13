import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { UnicornsService } from './unicorns.service';

describe('UnicornsService', () => {
  let service: UnicornsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UnicornsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
