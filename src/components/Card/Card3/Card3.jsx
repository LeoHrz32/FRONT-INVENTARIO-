import C3 from"./Card3.module.css";

const Card3 = ({ Icon, title, text }) => {
    return (
        <div className={C3.card3}>
        <div className={C3.inner}>
            <div className={C3.front}>
                <div className={C3.icon}>
                    <Icon size={38} />
                </div>
                <h3 className={C3.title3}>{title}</h3>
            </div>
            <div className={C3.back}>
                <p className={C3.text}>{text}</p>
            </div>
        </div>
    </div>
    );
};

export default Card3;
