import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UnitListService } from './unit-list.service';
import { Unit } from './Unit';

describe('UnitListService', () => {
  let service: UnitListService;
  let httpSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new UnitListService(httpSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get unitList', (done: DoneFn) => {
    const unit: Unit = {
      id: 1,
      name: 'Archer',
      description: 'Quick and light. Weak at close range; excels at battle from distance',
      expansion: 'Age of Kings',
      age: 'Feudal',
      cost: {
        Wood: 25,
        Gold: 45
      },
      build_time: 35,
      reload_time: 2,
      attack_delay: 0.35,
      movement_rate: 0.96,
      line_of_sight: 6,
      hit_points: 4,
      range: 30,
      attack: 4,
      armor: '0/0',
      accuracy: '80%'
    }
    const unitList = { units: [unit] };
    httpSpy.get.and.returnValue(of(unitList));
    service.getList().subscribe({
      next: units => {
        expect(units).toEqual(unitList.units);
        done();
      }
    });
  });
});
