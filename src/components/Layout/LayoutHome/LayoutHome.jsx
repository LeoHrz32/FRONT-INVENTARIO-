import React from 'react';
import LYH from "./LayoutHome.module.css";
import Title from "../../Title/Title";
import { RiBookLine, RiBuildingLine, RiCommunityLine } from 'react-icons/ri';

const LayoutHome1 = ({ title, textgran, textn1, textn2, textn3 }) => {
    return (
        <div className={LYH.ContentH}>
            <div className={LYH.IzquierdoH}>
                <div className={LYH.ContGrandeH}>
                    <div className={LYH.TitleH}>
                        <Title title={title} />
                    </div>
                    <p className={LYH.TextGranH}>{textgran}</p>
                </div>
            </div>
            <div className={LYH.DerechoH}>
                <div className={LYH.ContListasH}>
                    <div className={LYH.cardHomeH}>
                        <div className={LYH.ListaH}>
                            <RiBookLine className={LYH.iconH} />
                            <p className={LYH.ListTextH}>{textn1}</p>
                        </div>
                    </div>
                    <div className={LYH.cardHomeH}>
                        <div className={LYH.ListaH}>
                            <RiBuildingLine className={LYH.iconH} />
                            <p className={LYH.ListTextH}>{textn2}</p>
                        </div>
                    </div>
                    <div className={LYH.cardHomeH}>
                        <div className={LYH.ListaH}>
                            <RiCommunityLine className={LYH.iconH} />
                            <p className={LYH.ListTextH}>{textn3}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LayoutHome1;
