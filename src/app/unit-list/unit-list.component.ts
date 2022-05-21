import { Component, OnInit } from '@angular/core';
import { Unit } from '../Unit';
import { UnitListService } from '../unit-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { unitFeatureSelector } from '../state/unit.selector';
import { filterUnits, setInitialUnits, setSelectedUnit } from '../state/unit.actions';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.scss']
})
export class UnitListComponent implements OnInit {
  ageFilter = 'All';
  filteredList: Unit[] = [];
  toggle1 = false;
  toggle2 = false;
  toggle3 = false;
  value: number = 0;
  value1: number = 0;
  value2: number = 0;

  constructor(public listService: UnitListService, private router: Router, private store: Store) { }

  ngOnInit(): void {
    this.store.select(unitFeatureSelector).subscribe(appstate =>
      this.filteredList = appstate.filteredList
    );
    this.listService.getList().subscribe(unitList => {
      this.store.dispatch(setInitialUnits({ unitList }))
    });
  }

  ageFunc(filter: string) {
    this.ageFilter = filter;
    this.filtered();
  }

  filtered() {
    const filters = {
      age: this.ageFilter,
      foodToggle: this.toggle1,
      foodValue: this.value,
      goldToggle: this.toggle2,
      goldValue: this.value1,
      woodToggle: this.toggle3,
      woodValue: this.value2
    }
    this.store.dispatch(filterUnits(filters));
  }

  onRowClick(unit: Unit) {
    this.store.dispatch(setSelectedUnit({ unit }));
    this.router.navigateByUrl('/details/' + unit.id);
  }

}
