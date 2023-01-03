import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectPlant: {modal: false, id: 0},
    removePlant: {modal: false, id: 0}
}

const modalManagement = createSlice({
    name: "modals",
    initialState,
    reducers: {
        showSelectPlant: (state, action) => {
            state.selectPlant.modal = true;
            state.selectPlant.id = action.payload;
        },
        hideSelectPlant: (state) => {
            state.selectPlant.modal = false;
            state.selectPlant.id = 0;
        },
        showRemovePlant: (state) => {
            state.removePlant = true;
        },
        hideRemovePlant: (state) => {
            state.removePlant = false;
        }
    }
});

export const { showSelectPlant, hideSelectPlant } = modalManagement.actions;

export default modalManagement.reducer;