
import { createAction, props } from '@ngrx/store';
import { Unit } from '../Unit';


export const filterUnits = createAction(
    '[Unit List] filterUnits',
    props<{
        age: string,
        foodToggle: boolean,
        foodValue: number,
        goldToggle: boolean,
        goldValue: number,
        woodToggle: boolean,
        woodValue: number

    }>()
);

export const setSelectedUnit = createAction(
    '[Unit List] Set Selected Unit',
    props<{ unit: Unit }>()
);

export const  setInitialUnits= createAction(
    '[Unit List/API] Retrieve Units Success',
    props<{ unitList:Unit[]}>()
);