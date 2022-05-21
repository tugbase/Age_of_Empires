import { Unit } from "../Unit";

export interface AppState {
    selectedUnit:Unit|undefined;
    initialUnitList: Unit[];
    filteredList: Unit[];
}