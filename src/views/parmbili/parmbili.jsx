import { useSelector, useDispatch } from "react-redux";
import { expandLand } from "../../redux/tile/tile_slice";
import { Button } from "react-bootstrap";
import Tile from "./tile/tile"
import { EXPAND_LAND_COST, DEFAULT } from "../../config/constants";
import styles from "./parmbili.module.scss";

const Parmbili = () => {

    const { tiles, earnings, land_square } = useSelector(state => state.tiles);
    const dispatch = useDispatch();

    const onExpandClick = () => {
        dispatch(expandLand());
    }

    const dimensionStyle = {
        4: "x4",
        5: "x5",
        6: "x6",
        7: "x7",
        8: "x8"
    };

    return (
        <div className={styles.parmbili_container}>
            <div className={styles.parmbili}>
                <div className={`${styles.tiles_container} ${styles[dimensionStyle[land_square]]}`}>
                    {tiles.map(tile => <Tile key={tile.id} tile={tile} />)}
                </div>
                <p className={styles.earnings}>Total Earnings: {earnings}$</p>
                {
                    (DEFAULT.MAX_LAND_SQUARE > land_square )
                    ? (
                        <Button 
                            className={styles.expand_btn} 
                            disabled={earnings < EXPAND_LAND_COST[land_square + 1]}
                            onClick={onExpandClick}
                        >
                            <p>Expand Land to {land_square + 1} x {land_square + 1}</p>
                            <p>{EXPAND_LAND_COST[land_square + 1]}$</p>
                        </Button> 
                    )
                    : null
                }
            </div>
        </div>
    )
}

export default Parmbili