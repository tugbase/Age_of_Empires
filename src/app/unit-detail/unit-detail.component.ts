import { Component, OnInit } from '@angular/core';
import { Unit } from '../Unit';
import { Store } from '@ngrx/store';
import { unitFeatureSelector } from '../state/unit.selector';


@Component({
  selector: 'app-unit-detail',
  templateUrl: './unit-detail.component.html',
  styleUrls: ['./unit-detail.component.scss']
})
export class UnitDetailComponent implements OnInit {

  hero!: Unit;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.select(unitFeatureSelector).subscribe(appState =>
      this.hero = appState.selectedUnit as Unit
    );

  }

}
