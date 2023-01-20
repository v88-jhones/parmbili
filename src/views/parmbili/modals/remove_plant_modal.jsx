import { useDispatch, useSelector } from 'react-redux';
import { hideRemovePlant } from '../../../redux/modal/modal_slice';
import { remove } from '../../../redux/tile/tile_slice';
import { Button, Modal } from "react-bootstrap";
import "./modal.scss";

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
            <Modal.Body className="modals">
                <h3 className="remove">Remove Plant</h3>
                <p>Are you sure you want to remove this plant?</p>
                <div className="modals_action">
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