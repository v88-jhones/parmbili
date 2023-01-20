import "./plant.scss";

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
            className={`plant ${active ? "active" : ''} ${disabled ? "disabled" : ''}`}
            onClick={clickHandler}
        >
            <img src={require(`../../../assets/images/plants/${image}`)} alt={name} />
            <p>{time_to_harvest}s / {cost}$ / {reward}$</p>
        </div>
    )
}

export default Plant