/**
* DOCU: Will show the select plant modal component and set the selected plant id <br>
* Triggered: When plant button is clicked in Tile component.
* @function
* @param {object} state - The current state of redux {selectPlant: {modal, id}, removePlant: {modal, id}}.
* @param {object} action - Contains payload object which is the id of the plant.
* @author Jhones 
*/
const showSelectPlant = (state, action) => {
    state.selectPlant.modal = true;
    state.selectPlant.id = action.payload;
}

/**
* DOCU: Will hide the select plant modal component and unset the selected plant id <br>
* Triggered: When clicked outside the modal and cancel/close modal buttons is clicked.
* @function
* @param {object} state - The current state of redux {selectPlant: {modal, id}, removePlant: {modal, id}}.
* @author Jhones 
*/
const hideSelectPlant = (state) => {
    state.selectPlant.modal = false;
    state.selectPlant.id = 0;
}

/**
* DOCU: Will show the remove plant modal component and set the selected plant id <br>
* Triggered: When remove button is clicked in Tile component.
* @function
* @param {object} state - The current state of redux {selectPlant: {modal, id}, removePlant: {modal, id}}.
* @param {object} action - Contains payload object which is the id of the plant.
* @author Jhones 
*/
const showRemovePlant = (state,action) => {
    state.removePlant.modal = true;
    state.removePlant.id = action.payload;
}

/**
* DOCU: Will hide the remove plant modal component and unset the selected plant id <br>
* Triggered: When clicked outside the modal and cancel/close modal buttons is clicked.
* @function
* @param {object} state - The current state of redux {selectPlant: {modal, id}, removePlant: {modal, id}}.
* @author Jhones 
*/
const hideRemovePlant = (state) => {
    state.removePlant.modal = false;
    state.removePlant.id = 0;
}

const ModalService = {
    showSelectPlant,
    hideSelectPlant,
    showRemovePlant,
    hideRemovePlant
};

export default ModalService;