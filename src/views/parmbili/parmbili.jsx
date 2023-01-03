import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideSelectPlant } from "../../redux/modal/modal_slice";
import { plant } from "../../redux/tile/tile_slice";

import Plant from "./plant/plant";
import Tile from "./tile/tile"
import CloseIcon from "../../assets/images/icon/close.svg";
import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";
import { PLANTS } from "../../config/constants";
import styles from "./parmbili.module.scss";

const Parmbili = () => {

    const { tiles } = useSelector(state => state.tiles);
    const { selectPlant } = useSelector(state => state.modals);
    const [selectedPlantId, setSelectedPlantId] = useState(0);

    const dispatch = useDispatch();

    const onPlantClick = (id) => {
        setSelectedPlantId(id);
    }

    const onSelectPlantModalClose = () => {
        setSelectedPlantId(0);
        dispatch(hideSelectPlant());
    }

    const onPlantModalClick = () => {
        dispatch(plant({id: selectPlant.id, plant_id: selectedPlantId}));
        setSelectedPlantId(0);
        dispatch(hideSelectPlant());
    }

    return (
        <>
            <div>
                <div className={styles.tiles_container}>
                    {tiles.map(tile => <Tile key={tile.id} tile={tile} />)}
                </div>
                <p className={styles.earnings}>Total Earnings: 50$</p>
            </div>
            <Modal show={selectPlant.modal} centered size="sm" onHide={onSelectPlantModalClose}>
                <Modal.Body className={styles.modal}>
                    <button 
                        type="button" 
                        className={styles.modal_close}
                        onClick={onSelectPlantModalClose}
                    >
                            <img src={CloseIcon} alt="close-icon" />
                    </button>
                    <h3>Select a Crop to Plant</h3>
                    <div className={styles.modal_plants}>
                        {
                            PLANTS.map(plant => (
                                <Plant 
                                    key={plant.id}
                                    plant={plant}
                                    onClick={onPlantClick} 
                                    active={selectedPlantId === plant.id}
                                />
                            ))
                        }
                    </div>
                    <div className={styles.modal_action}>
                        <Button 
                            variant="secondary" 
                            onClick={onSelectPlantModalClose}
                        >
                            Cancel
                        </Button>
                        <Button 
                            variant="primary"
                            onClick={onPlantModalClick}
                        >
                            Plant
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Parmbili