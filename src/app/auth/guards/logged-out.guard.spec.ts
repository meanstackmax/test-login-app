import { TestBed, inject } from '@angular/core/testing';

import { LoggedOutGuard } from './logged-out.guard';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

describe('LoggedOutGuard', () => {
  let mockAuthService;
  let mockRouter;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['isLoggedIn', 'logout']);
    mockRouter = {
      navigate: jasmine.createSpy()
    };

    TestBed.configureTestingModule({
      providers: [
        LoggedOutGuard,
        {
          provide: AuthService, useValue: mockAuthService
        },
        { provide: Router, useValue: mockRouter }
      ]
    });
  });

  it('should ...', inject([LoggedOutGuard], (guard: LoggedOutGuard) => {
    expect(guard).toBeTruthy();
  }));
});
