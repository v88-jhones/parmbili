import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { till, toHarvest, harvest } from "../../../redux/tile/tile_slice";
import { showSelectPlant, showRemovePlant } from "../../../redux/modal/modal_slice";

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Button from 'react-bootstrap/Button';

import { TILE } from "../../../config/constants";
import styles from "./tile.module.scss";

const Tile = ({tile}) => {

    const {id, status, plant} = tile;
    const [remainingTime, setRemainingTime] = useState(null);

    const dispatch = useDispatch();

    const interval = useRef(null);

    useEffect(() => {

            if(plant){
                interval.current = setInterval(() => {

                    let current_date = new Date();
                    let end_date = new Date(plant.end_time);
                    let timeRemaining = Math.floor((end_date - current_date) / 1000);

                    if(timeRemaining < 0){
                        dispatch(toHarvest(id))
                        setRemainingTime(0);
                        clearInterval(interval.current)
                    }
                    else {
                        setRemainingTime(timeRemaining);
                    }
            }, 1000);
            
        }else {
            setRemainingTime(null);
        }
    }, [plant, dispatch, id]);

    const [showPopover, setShowPopover] = useState(false);

    const statusStyles = {
        [TILE.EMPTY]      : "empty",
        [TILE.TILLED]     : "tilled",
        [TILE.HAS_PLANT]  : "has_plant",
        [TILE.HARVEST]    : "harvest"
    };


    const togglePopOver = () => {
        setShowPopover(prevState => !prevState);
    }

    const onTillClick = () => {
        togglePopOver();
        dispatch(till(id));
    }

    const onPlantClick = () => {
        dispatch(showSelectPlant(id));
        togglePopOver();
    }

    const onHarvestClick = () => {
        dispatch(harvest(id));
        togglePopOver();
    }

    const onRemoveClick = () => {
        dispatch(showRemovePlant(id));
        togglePopOver()
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
                onClick={onRemoveClick}
            >
                Remove
            </Button>
        )
    }

    const Harvest = () => {
        return (
            <>
                <div className={styles.harvest_actions}>
                    <Button 
                        variant="primary" 
                        className={styles.popover_btn}
                        onClick={onHarvestClick}
                    >
                        Harvest
                    </Button>
                    <Button 
                        variant="secondary" 
                        className={styles.popover_btn}
                        onClick={onRemoveClick}
                    >
                        Remove
                    </Button>
                </div>
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
            onToggle={togglePopOver}
            show={showPopover}
        >
            <div className={`${styles.tile} ${styles[statusStyles[status]]}`}>
                {plant && (
                    <>
                        <img 
                            src={require("../../../assets/images/plants/" + plant.image )} 
                            alt="test" 
                        />
                        {
                            status === TILE.HARVEST
                            ? <p>{plant.reward}$</p>
                            : <p>{remainingTime !== null ? remainingTime + 1 : plant.time_to_harvest}s</p> 
                        }
                    </>
                )}
            </div>
        </OverlayTrigger>
    )
}




export default Tile