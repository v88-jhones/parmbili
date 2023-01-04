import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideSelectPlant } from '../../../redux/modal/modal_slice';
import { plant } from '../../../redux/tile/tile_slice';
import Modal from 'react-bootstrap/Modal';
import { PLANTS } from '../../../config/constants';
import styles from "./modal.module.scss";
import Plant from '../plant/plant';
import { Button } from "react-bootstrap";
import CloseIcon from "../../../assets/images/icon/close.svg";

const SelectPlantModal = () => {

    const dispatch = useDispatch();

    const { selectPlant } = useSelector(state => state.modals);
    const { earnings } = useSelector(state => state.tiles);
    const [selectedPlantId, setSelectedPlantId] = useState(0);

    const closeHandler = () => {
        dispatch(hideSelectPlant());
        setSelectedPlantId(0);
    }

    const onPlantTileClick = (id) => {
        setSelectedPlantId(id);
    }

    const onPlantBtnClick = () => {
        dispatch(plant({id: selectPlant.id, plant_id: selectedPlantId}));
        setSelectedPlantId(0);
        dispatch(hideSelectPlant());
    }

    return (
        <Modal show={selectPlant.modal} centered size="sm" onHide={closeHandler}>
            <Modal.Body className={styles.modal}>
                <button 
                    type="button" 
                    className={styles.modal_close}
                    onClick={closeHandler}
                >
                        <img src={CloseIcon} alt="close-icon" />
                </button>
                <h3 className={styles.select}>Select a Crop to Plant</h3>
                <div className={styles.modal_plants}>
                    {
                        PLANTS.map(plant => (
                            <Plant 
                                key={plant.id}
                                plant={plant}
                                onClick={onPlantTileClick}
                                disabled={earnings < plant.cost} 
                                active={selectedPlantId === plant.id}
                            />
                        ))
                    }
                </div>
                <div className={styles.modal_action}>
                    <Button 
                        variant="secondary" 
                        onClick={closeHandler}
                    >
                        Cancel
                    </Button>
                    <Button 
                        variant="primary"
                        onClick={onPlantBtnClick}
                        disabled={selectedPlantId === 0}
                    >
                        Plant
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default SelectPlantModal;