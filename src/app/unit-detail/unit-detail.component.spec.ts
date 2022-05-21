import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { Unit } from '../Unit';
import { of } from 'rxjs';

import { UnitDetailComponent } from './unit-detail.component';

describe('UnitDetailComponent', () => {
  let component: UnitDetailComponent;
  let fixture: ComponentFixture<UnitDetailComponent>;
  let storeSpy: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    storeSpy = jasmine.createSpyObj('Store', ['select']);
    await TestBed.configureTestingModule({
      declarations: [ UnitDetailComponent ],
      providers: [{provide:Store, useValue:storeSpy}],
    })
    .compileComponents();
  });

  beforeEach(() => {
    
    fixture = TestBed.createComponent(UnitDetailComponent);
    component = fixture.componentInstance;
  
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should get SelectedUnit', () => {
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
  
    const state = {
      selectedUnit: unit,
      initialUnitList: [],
      filteredList:[]
    };
    storeSpy.select.and.returnValue(of(state));
    fixture.detectChanges();
    expect(component.hero).toEqual(state.selectedUnit);
  });
});
