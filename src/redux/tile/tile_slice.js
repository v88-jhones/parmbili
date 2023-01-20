import { TILE, DEFAULT } from "../../config/constants";
import { createSlice } from "@reduxjs/toolkit";
import TileService from "./tile_service";

const initialState = {
    earnings: DEFAULT.EARNINGS,
    land_square: DEFAULT.LAND_SQUARE,
    tiles: []
};

/** Will create tiles as starter based on the squared of the default land square */
let initial_tile_count = Math.pow(initialState.land_square, 2)
for(let i = 1; i <= initial_tile_count; i++){
    initialState.tiles.push({
            id: i + TileService.generateId(),
            status: TILE.EMPTY,
            plant: null,
        });
}

const tileManagement = createSlice({
    name: "tiles",
    initialState,
    reducers: {
        till       : TileService.till,
        plant      : TileService.plant, 
        remove     : TileService.remove,
        toHarvest  : TileService.toHarvest,
        harvest    : TileService.harvest,
        expandLand : TileService.expandLand
    }
});

export const { 
    till, 
    plant, 
    remove, 
    toHarvest, 
    harvest, 
    expandLand 
} = tileManagement.actions;

export default tileManagement.reducer;