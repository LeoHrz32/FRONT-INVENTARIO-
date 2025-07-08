import Title from "../../Title/Title";
import LYD from "./LayoutDonaciones.module.css";

const LayoutD = ({ title, subtitle, texto, imgD, WidthD, align = "left" }) => {
    const isLeftAligned = align === "left";

    return (
        <div className={`${LYD.ContentD} ${isLeftAligned ? LYD.leftAlign : LYD.rightAlign}`}>
            <div className={`${LYD.IzquierdoD} ${isLeftAligned ? LYD.textLeft : LYD.textRight}`}>
                <div className={LYD.ContGrandeD}>
                    <div className={LYD.TitleContD}>
                        <Title title={title} />
                    </div>
                    <p className={LYD.subtitleD}>{subtitle}</p>
                    <p className={LYD.textoD}>{texto}</p>
                </div>
            </div>
            <div className={LYD.DerechoD}>
                <div className={LYD.ContectImgD}>
                    <img src={imgD} alt="Image Description" style={{ width: WidthD }} />
                </div>
            </div>
        </div>
    );
}

export default LayoutD;
