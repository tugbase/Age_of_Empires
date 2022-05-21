import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UnitListService } from '../unit-list.service';
import { Router } from '@angular/router';
import { UnitListComponent } from './unit-list.component';
import { Store } from '@ngrx/store';
import { Unit } from '../Unit';
import { of } from 'rxjs';
import { filterUnits, setSelectedUnit } from '../state/unit.actions';


describe('UnitListComponent', () => {
  let component: UnitListComponent;
  let fixture: ComponentFixture<UnitListComponent>;
  let serviceSpy: jasmine.SpyObj<UnitListService>;
  let storeSpy: jasmine.SpyObj<Store>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    serviceSpy = jasmine.createSpyObj('UnitListService', ['getList']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    storeSpy = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    await TestBed.configureTestingModule({
      declarations: [UnitListComponent],
      providers: [
        { provide: UnitListService, useValue: serviceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: Store, useValue: storeSpy }

      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get initial filteredList and dispatch action', () => {
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
    };
    const unitList = [unit];
    const state = {
      selectedUnit: undefined,
      initialUnitList: [],
      filteredList: unitList
    };

    storeSpy.select.and.returnValue(of(state));
    serviceSpy.getList.and.returnValue(of(unitList));
    fixture.detectChanges();
    expect(storeSpy.dispatch.calls.count()).toBe(1);
    expect(component.filteredList).toEqual(unitList);
  });
  it('should dispatch filter action', () => {
    component.toggle1 = true;
    component.toggle2 = true;
    component.toggle3 = true;
    component.value = 0;
    component.value1 = 1;
    component.value2 = 2;
    const filters = {
      age: 'test',
      foodToggle: true,
      foodValue: 0,
      goldToggle: true,
      goldValue: 1,
      woodToggle: true,
      woodValue: 2
    }
    component.ageFunc('test');
    expect(component.ageFilter).toBe('test');
    expect(storeSpy.dispatch.calls.first().args[0]).toEqual(filterUnits(filters));
    expect(storeSpy.dispatch.calls.count()).toBe(1);
  });
  it('should dispatch selectedUnit and navigate', () => {
    const unit = new Unit();
    unit.id = 12;
    component.onRowClick(unit);
    expect(storeSpy.dispatch.calls.first().args[0]).toEqual(setSelectedUnit({ unit }));
    expect(routerSpy.navigateByUrl.calls.first().args[0]).toEqual('/details/12');
  });
});
