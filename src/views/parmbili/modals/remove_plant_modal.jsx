import { useDispatch, useSelector } from 'react-redux';
import { hideRemovePlant } from '../../../redux/modal/modal_slice';
import { remove } from '../../../redux/tile/tile_slice';
import Modal from 'react-bootstrap/Modal';
import styles from "./modal.module.scss";
import { Button } from "react-bootstrap";

const RemovePlantModal = () => {

    const dispatch = useDispatch();

    const { removePlant } = useSelector(state => state.modals);

    const closeHandler = () => {
        dispatch(hideRemovePlant());
    }

    const onRemoveClick = () => {
        dispatch(remove(removePlant.id));
        dispatch(hideRemovePlant());
    }

    return (
        <Modal show={removePlant.modal} centered size="sm" onHide={closeHandler}>
            <Modal.Body className={styles.modal}>
                <h3 className={styles.remove}>Remove Plant</h3>
                <p>Are you sure you want to remove this plant?</p>
                <div className={styles.modal_action}>
                    <Button 
                        variant="danger" 
                        onClick={closeHandler}
                    >
                        Cancel
                    </Button>
                    <Button 
                        variant="secondary"
                        onClick={onRemoveClick}
                    >
                        Remove
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default RemovePlantModal;