import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { till, toHarvest, harvest } from "../../../redux/tile/tile_slice";
import { showSelectPlant, showRemovePlant } from "../../../redux/modal/modal_slice";
import { Popover, Button, OverlayTrigger } from "react-bootstrap"
import { TILE } from "../../../config/constants";
import "./tile.scss";

const Tile = ({tile}) => {

    const {id, status, plant} = tile;
    const [remainingTime, setRemainingTime] = useState(null);
    const [showPopover, setShowPopover] = useState(false);

    const dispatch = useDispatch();
    const intervalCountDown = useRef(null);

/** 
 * Interval function that will be triggered if the tile has plant.
 * Will update the remaining time every seconds 
 * and if the end/harvest time is reached it will clear 
 * the interval function and set the tile status in to harvest. 
 */
    useEffect(() => {
        const countdown = () => {
            let current_date = new Date();
            let end_date = new Date(plant.end_time);
            let timeRemaining = Math.floor((end_date - current_date) / 1000);
    
            if(timeRemaining < 0){
                dispatch(toHarvest(id))
                setRemainingTime(0);
                clearInterval(intervalCountDown.current)
            }
            else {
                setRemainingTime(timeRemaining);
            }
        }

        if(plant){
                intervalCountDown.current = setInterval(countdown, 1000);
        }else {
            clearInterval(intervalCountDown.current);
            setRemainingTime(null);
        }
    }, [plant, dispatch, id]);


/** For styling of tiles */
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
                className="popover_btn"
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
                className="popover_btn"
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
                className="popover_btn"
                onClick={onRemoveClick}
            >
                Remove
            </Button>
        )
    }

    const Harvest = () => {
        return (
            <>
                <div className="harvest_actions">
                    <Button 
                        variant="primary" 
                        className="popover_btn"
                        onClick={onHarvestClick}
                    >
                        Harvest
                    </Button>
                    <Button 
                        variant="secondary" 
                        className="popover_btn"
                        onClick={onRemoveClick}
                    >
                        Remove
                    </Button>
                </div>
            </>
        )
    }

/** Will render button based on the status of the tile */
    const renderButton = {
        [TILE.EMPTY]      : <Empty />,
        [TILE.TILLED]     : <Tilled />,
        [TILE.HAS_PLANT]  : <HasPlant />,
        [TILE.HARVEST]    : <Harvest />
    };

    const popover = (
        <Popover>
            <Popover.Body className="popover">
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
            rootClose
        >
            <div className={`tile ${statusStyles[status]}`}>
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

export default Tile;