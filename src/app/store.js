import { configureStore } from "@reduxjs/toolkit";
import TileManagement from "../redux/tile/tile_slice";
import ModalManagement from "../redux/modal/modal_slice";

export const store = configureStore({
    reducer: {
        tiles: TileManagement,
        modals: ModalManagement
    }
});