import { createSlice } from "@reduxjs/toolkit";
import ModalService from "./modal_service";

const initialState = {
    selectPlant: {modal: false, id: 0},
    removePlant: {modal: false, id: 0}
};

const modalManagement = createSlice({
    name: "modals",
    initialState,
    reducers: {
        showSelectPlant: ModalService.showSelectPlant,
        hideSelectPlant: ModalService.hideSelectPlant,
        showRemovePlant: ModalService.showRemovePlant,
        hideRemovePlant: ModalService.hideRemovePlant
    }
});

export const { 
    showSelectPlant, 
    hideSelectPlant, 
    showRemovePlant, 
    hideRemovePlant
} = modalManagement.actions;

export default modalManagement.reducer;