import { useState } from "react";
import { useDispatch } from "react-redux";
import { till } from "../../../redux/tile/tile_slice";
import { showSelectPlant } from "../../../redux/modal/modal_slice";

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Button from 'react-bootstrap/Button';

import { TILE } from "../../../config/constants";
import styles from "./tile.module.scss";

const Tile = ({tile}) => {

    const {id, status, plant} = tile;

    const [showPopover, setShowPopover] = useState(false);

    const statusStyles = {
        [TILE.EMPTY]      : "empty",
        [TILE.TILLED]     : "tilled",
        [TILE.HAS_PLANT]  : "has_plant",
        [TILE.HARVEST]    : "harvest"
    };

    const dispatch = useDispatch();

    const toggleTillPopOver = () => {
        setShowPopover(prevState => !prevState);
    }

    const onTillClick = () => {
        toggleTillPopOver();
        dispatch(till(id));
    }

    const onPlantClick = () => {
        dispatch(showSelectPlant(id));
        toggleTillPopOver();
    }

    const Empty = () => {
        return (
            <Button 
                variant="primary" 
                className={styles.popover_btn}
                onClick={onTillClick}
            >
                Till
            </Button>
        )
    }

    const Tilled = () => {
        return (
            <Button 
                variant="primary" 
                className={styles.popover_btn}
                onClick={onPlantClick}
            >
                Plant
            </Button>
        )
    }
    
    const HasPlant = () => {
        return (
            <Button 
                variant="secondary" 
                className={styles.popover_btn}
                // onClick={onSecondaryBtnClick}
            >
                Remove
            </Button>
        )
    }

    const Harvest = () => {
        return (
            <>
                <Button 
                    variant="primary" 
                    className={styles.popover_btn}
                    // onClick={onPrimaryBtnClick}
                >
                    Harvest
                </Button>
                <Button 
                    variant="secondary" 
                    className={styles.popover_btn}
                    // onClick={onSecondaryBtnClick}
                >
                    Remove
                </Button>
            </>
        )
    }

    const renderButton = {
        [TILE.EMPTY]      : <Empty />,
        [TILE.TILLED]     : <Tilled />,
        [TILE.HAS_PLANT]  : <HasPlant />,
        [TILE.HARVEST]    : <Harvest />
    };

    const popover = (
        <Popover>
            <Popover.Body className={styles.popover}>
                {renderButton[status]}
            </Popover.Body>
        </Popover>
    );

    return (
        <OverlayTrigger 
            trigger="click" 
            placement="bottom" 
            overlay={popover}
            onToggle={toggleTillPopOver}
            show={showPopover}
        >
            <div className={`${styles.tile} ${styles[statusStyles[status]]}`}>
                {plant && (
                    <>
                        <img 
                            src={require("../../../assets/images/plants/" + plant.image )} 
                            alt="test" 
                        />
                        <p>{plant.time_to_harvest}s</p>
                    </>
                )}
            </div>
        </OverlayTrigger>
    )
}




export default Tile