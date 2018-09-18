import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectedComponent } from './protected.component';
import { DataService } from '../../shared/services/data.service';
import { of } from 'rxjs';

describe('ProtectedComponent', () => {
  let component: ProtectedComponent;
  let fixture: ComponentFixture<ProtectedComponent>;
  let mockDataService;

  beforeEach(async(() => {
    mockDataService = jasmine.createSpyObj('DataService', ['getData']);
    mockDataService.getData.and.returnValue(of(null));

    TestBed.configureTestingModule({
      declarations: [
        ProtectedComponent
      ],
      providers: [
        { provide: DataService, useValue: mockDataService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
