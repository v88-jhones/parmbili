import styles from "./plant.module.scss";

const Plant = (props) => {

    const {
        plant, 
        active = false, 
        disabled = false,
        onClick = () => {}
    } = props;

    const {
        name, 
        time_to_harvest, 
        cost, 
        reward, 
        image,
        id
    } = plant;

    const clickHandler = () => {
        if(!disabled){
            onClick(id);
        }
    }

    return (
        <div 
            className={`${styles.plant} ${active ? styles.active : ''} ${disabled ? styles.disabled : ''}`}
            onClick={clickHandler}
        >
            <img src={require(`../../../assets/images/plants/${image}`)} alt={name} />
            <p>{time_to_harvest}s / {cost}$ / {reward}$</p>
        </div>
    )
}

export default Plant