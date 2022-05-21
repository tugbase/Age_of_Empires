import { Injectable } from '@angular/core';
import { Unit } from './Unit';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UnitListService {

  defaultUrl = 'assets/age-of-empires-units.json';

  constructor(private http: HttpClient) { }

  getList(): Observable<Unit[]> {
    return this.http.get<{ units: Unit[] }>(this.defaultUrl).pipe(map((units) => units.units || []));
  }
}