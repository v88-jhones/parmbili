import { TILE } from "../../config/constants";
import { PLANTS } from "../../config/constants";
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    tiles: [
        {
            id: 1,
            status: TILE.EMPTY,
            plant: null,
        },
        {
            id: 2,
            status: TILE.EMPTY,
            plant: null,
        },
        {
            id: 3,
            status: TILE.EMPTY,
            plant: null,
        },
        {
            id: 4,
            status: TILE.EMPTY,
            plant: null,
        },
        {
            id: 5,
            status: TILE.EMPTY,
            plant: null,
        },
        {
            id: 6,
            status: TILE.EMPTY,
            plant: null,
        },
        {
            id: 7,
            status: TILE.EMPTY,
            plant: null,
        },
        {
            id: 8,
            status: TILE.EMPTY,
            plant: null,
        },
        {
            id: 9,
            status: TILE.EMPTY,
            plant: null,
        },
        {
            id: 10,
            status: TILE.EMPTY,
            plant: null,
        },
        {
            id: 11,
            status: TILE.EMPTY,
            plant: null,
        },
        {
            id: 12,
            status: TILE.EMPTY,
            plant: null,
        },
        {
            id: 13,
            status: TILE.EMPTY,
            plant: null,
        },
        {
            id: 14,
            status: TILE.EMPTY,
            plant: null,
        },
        {
            id: 15,
            status: TILE.EMPTY,
            plant: null,
        },
        {
            id: 16,
            status: TILE.EMPTY,
            plant: null,
        },
    ]
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
            tile.status = TILE.HAS_PLANT;
            tile.plant = PLANTS.find(plant => plant.id === action.payload.plant_id);
        }
    }
});

export const { till, plant } = tileManagement.actions;

export default tileManagement.reducer;