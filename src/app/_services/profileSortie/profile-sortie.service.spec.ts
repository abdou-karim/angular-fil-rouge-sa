import { TestBed } from '@angular/core/testing';

import { ProfileSortieService } from './profile-sortie.service';

describe('ProfileSortieService', () => {
  let service: ProfileSortieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileSortieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
