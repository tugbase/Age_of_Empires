import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Unit } from '../Unit';
import { AppState } from './app.state';


export const unitFeatureSelector = createFeatureSelector<AppState>('unit');

