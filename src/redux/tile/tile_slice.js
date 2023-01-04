import { TILE, PLANTS, DEFAULT, EXPAND_LAND_COST } from "../../config/constants";
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    earnings: DEFAULT.EARNINGS,
    land_square: DEFAULT.LAND_SQUARE,
    tiles: []
}

const generateId = () => {
    return Math.floor(Date.now() + Math.random());
}

for(let i = 1; i <= Math.pow(initialState.land_square, 2); i++){
    initialState.tiles.push({
            id: i + generateId(),
            status: TILE.EMPTY,
            plant: null,
        });
}


const tileManagement = createSlice({
    name: "tiles",
    initialState,
    reducers: {
        till: (state, action) => {
            let tile = state.tiles.find(tile => tile.id === action.payload);
            tile.status = TILE.TILLED;
        },
        plant: (state, action) => {
            let tile = state.tiles.find(tile => tile.id === action.payload.id);
            let plant = PLANTS.find(plant => plant.id === action.payload.plant_id);
            let end_date = new Date();
            end_date.setSeconds(end_date.getSeconds() + plant.time_to_harvest);

            tile.plant = {...plant};
            tile.status = TILE.HAS_PLANT;
            tile.plant.end_time = end_date.toLocaleString("en-US");

            state.earnings -= tile.plant.cost;
        },
        remove: (state, action) => {
            let tile = state.tiles.find(tile => tile.id === action.payload);
            tile.status = TILE.EMPTY;
            tile.plant = null;
        },
        toHarvest: (state, action) => {
            let tile = state.tiles.find(tile => tile.id === action.payload);
            tile.status = TILE.HARVEST;
        },
        harvest: (state, action) => {
            let tile = state.tiles.find(tile => tile.id === action.payload);
            tile.status = TILE.EMPTY;
            state.earnings += tile.plant.reward;
            tile.plant = null;
        },
        expandLand: (state) => {
            state.land_square++;
            let test = Math.pow(state.land_square, 2) - Math.pow(state.land_square - 1, 2);
            for(let i = 1; i <= test; i++){
                state.tiles.push({
                        id: i + generateId(),
                        status: TILE.EMPTY,
                        plant: null,
                });
            }
            state.earnings -= EXPAND_LAND_COST[state.land_square];
        }
    }
});

export const { till, plant, remove, toHarvest, harvest, expandLand } = tileManagement.actions;

export default tileManagement.reducer;