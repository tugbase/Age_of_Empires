import { createReducer, on } from '@ngrx/store';
import { filterUnits, setSelectedUnit, setInitialUnits } from './unit.actions';
import { Unit } from '../Unit';
import { AppState } from './app.state';



export const initialState: AppState = {
    selectedUnit: undefined,
    initialUnitList: [],
    filteredList: []
};

export const unitReducer = createReducer(
    initialState,
    on(filterUnits, (state, {
        age,
        foodToggle,
        foodValue,
        goldToggle,
        goldValue,
        woodToggle,
        woodValue

    }) => {
        const list = state.initialUnitList.filter(unit => {
            let isFiltered = true;
            if (age !== 'All' && unit.age !== age) {
                isFiltered = false;
            }
            if (foodToggle && unit.cost?.Food && unit.cost.Food > foodValue) {
                isFiltered = false;
            }
            if (goldToggle && unit.cost?.Gold && unit.cost.Gold > goldValue) {
                isFiltered = false;
            }
            if (woodToggle && unit.cost?.Wood && unit.cost.Wood > woodValue) {
                isFiltered = false;
            }
            return isFiltered;
        });
        return {
            selectedUnit: state.selectedUnit,
            initialUnitList: state.initialUnitList,
            filteredList: list
        }
    }),

    on(setInitialUnits, (state, { unitList }) => {

        return {
            selectedUnit: state.selectedUnit,
            initialUnitList: unitList,
            filteredList: unitList
        };
    }),

    on(setSelectedUnit, (state, { unit }) => {
        return {
            selectedUnit: unit,
            initialUnitList: state.initialUnitList,
            filteredList: state.filteredList

        }

    })
)