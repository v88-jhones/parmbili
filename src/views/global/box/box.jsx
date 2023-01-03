import styles from "./box.module.scss";

const Box = ({children, className}) => {

    return (
        <div className={`${styles.box} ${className}`}>{children}</div>
    )
}

export default Box