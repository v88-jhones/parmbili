import { TILE, PLANTS, EXPAND_LAND_COST } from "../../config/constants";

/**
* DOCU: Will set the tile into tilled status. <br>
* Triggered: When till button is clicked in Tile component.
* @function
* @param {object} state - The current state of redux {earnings, land_square, tiles}.
* @param {object} action - Contains payload object which is the id of the tile.
* @author Jhones 
*/
const till = (state, action) => {
    let tile = state.tiles.find(tile => tile.id === action.payload);
    tile.status = TILE.TILLED;
}

/**
* DOCU: Will set the plant in tile and set the status into has plant. <br>
* Triggered: When plant button is clicked in select plant modal.
* @function
* @param {object} state - The current state of redux {earnings, land_square, tiles: {id, status, plant}}.
* @param {object} action - Contains payload object which is {id, plant_id}.
* @author Jhones 
*/
const plant = (state, action) => {
    let tile = state.tiles.find(tile => tile.id === action.payload.id);
    let plant = PLANTS.find(plant => plant.id === action.payload.plant_id);
    let end_date = new Date();
    end_date.setSeconds(end_date.getSeconds() + plant.time_to_harvest);

    tile.plant = {...plant};
    tile.status = TILE.HAS_PLANT;
    tile.plant.end_time = end_date.toLocaleString("en-US");

    state.earnings -= tile.plant.cost;
}

/**
* DOCU: Will remove the plant from the tile and set the status into empty. <br>
* Triggered: When remove button is clicked in remove plant modal.
* @function
* @param {object} state - The current state of redux {earnings, land_square, tiles: {id, status, plant}}.
* @param {object} action - Contains payload object which is the id of the tile.
* @author Jhones 
*/
const remove = (state, action) => {
    let tile = state.tiles.find(tile => tile.id === action.payload);
    tile.status = TILE.EMPTY;
    tile.plant = null;
}

/**
* DOCU: Will set the status of the tile into harvest. <br>
* Triggered: When the harvest time of the plant is reached.
* @function
* @param {object} state - The current state of redux {earnings, land_square, tiles: {id, status, plant}}.
* @param {object} action - Contains payload object which is the id of the tile.
* @author Jhones 
*/
const toHarvest = (state, action) => {
    let tile = state.tiles.find(tile => tile.id === action.payload);
    tile.status = TILE.HARVEST;
}

/**
* DOCU: Will set the status of the tile into empty and increment the value of earnings based on plant's reward. <br>
* Triggered: When harvest button is clicked in Tile component.
* @function
* @param {object} state - The current state of redux {earnings, land_square, tiles: {id, status, plant}}.
* @param {object} action - Contains payload object which is the id of the tile.
* @author Jhones 
*/
const harvest = (state, action) => {
    let tile = state.tiles.find(tile => tile.id === action.payload);
    tile.status = TILE.EMPTY;
    state.earnings += tile.plant.reward;
    tile.plant = null;
}

/**
* DOCU: Will add more tiles <br>
* Triggered: When expand land button is clicked.
* @function
* @param {object} state - The current state of redux {earnings, land_square, tiles: {id, status, plant}}.
* @author Jhones 
*/
const expandLand = (state) => {
    state.land_square++;
    let tileCountDiff = Math.pow(state.land_square, 2) - Math.pow(state.land_square - 1, 2);
    for(let i = 1; i <= tileCountDiff; i++){
        state.tiles.push({
                id: i + generateId(),
                status: TILE.EMPTY,
                plant: null,
        });
    }
    state.earnings -= EXPAND_LAND_COST[state.land_square];
}

/**
* DOCU: Will generate random id. <br>
* Triggered: When new tile is being created.
* @function
* @return {number} - The random generated id.
* @author Jhones 
*/
const generateId = () => {
    return Math.floor(Date.now() + Math.random());
}

const TileService = { 
    till, 
    plant,
    remove,
    toHarvest,
    harvest,
    expandLand,
    generateId
};

export default TileService;