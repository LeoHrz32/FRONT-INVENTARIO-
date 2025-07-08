import CH from './CardHover.module.css'
const CardHover = ({Imagen, title, description}) => {
    return (
        <div className={CH.card}>
            <div className={CH.image-box}>
                <img src={Imagen} />
            </div>
            <div className={CH.content1}>
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default CardHover