import styles from "./plant.module.scss";

const Plant = (props) => {

    const {
        plant, 
        active = false, 
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

    return (
        <div 
            className={`${styles.plant} ${active ? styles.active : ''}`}
            onClick={() => onClick(id)}
        >
            <img src={require(`../../../assets/images/plants/${image}`)} alt={name} />
            <p>{time_to_harvest}s / {cost}$ / {reward}$</p>
        </div>
    )
}

export default Plant