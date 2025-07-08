import Fter from "./Footer.module.css"; 
import fb from "../Image/Iconos/facebook.png";
import insta from "../Image/Iconos/instagram.png";
import wa from "../Image/Iconos/whatsapp.png";
import yt from "../Image/Iconos/youtube.png";

const Footer = () => {
    return (
        <body style={{ backgroundColor: '#fff' }}>
        <div className={Fter.Footer}>
            <div className={`${Fter.Sb_Footer} ${Fter.SectionPadding}`}>
                <div className={Fter.FooterLinks}>
                    <div className={Fter.FooterLinksDiv}>
                        <h4>Para Empresas</h4>
                        <a href="/empresa"><p>Empresas</p></a>
                        <a href="/soluciones"><p>Soluciones</p></a>
                        <a href="/contacto"><p>Contacto</p></a>
                    </div>

                    <div className={Fter.FooterLinksDiv}>
                        <h4>Recursos</h4>
                        <a href="/documentos"><p>Documentos</p></a>
                        <a href="/tutoriales"><p>Tutoriales</p></a>
                        <a href="/guia"><p>Guía</p></a>
                    </div>

                    <div className={Fter.FooterLinksDiv}>
                        <h4>Socios</h4>
                        <a href="/colaboradores"><p>Colaboradores</p></a>
                        <a href="/aliados"><p>Aliados</p></a>
                        <a href="/patrocinadores"><p>Patrocinadores</p></a>
                    </div>

                    <div className={Fter.FooterLinksDiv}>
                        <h4>Compañia</h4>
                        <a href="/Inicio"><p>Inicio</p></a>
                        <a href="/Nosotros"><p>Nosotros</p></a>
                        <a href="/Alquileres"><p>Alquileres</p></a>
                        <a href="/Donaciones"><p>Donaciones</p></a>
                        <a href="/Contactanos"><p>Contactanos</p></a>
                    </div>

                    <div className={Fter.FooterLinksDiv}>
                        <h4>Próximamente en</h4>
                        <div className={Fter.SocialMedia}>
                            <p><img src={fb} alt="Facebook" /></p>
                            <p><img src={insta} alt="Instagram" /></p>
                            <p><img src={wa} alt="WhatsApp" /></p>
                            <p><img src={yt} alt="YouTube" /></p>
                        </div>
                    </div>
                </div>

                <hr />

                <div className={Fter.FooterBelow}>
                    <div className={Fter.FooterCopyright}>
                        <p>@{new Date().getFullYear()} CodeInn. Todos los derechos reservados.</p>
                    </div>
                    <div className={Fter.FooterBelowLinks}>
                        <a href="/terminos"><p>Términos y condiciones</p></a>
                        <a href="/privacidad"><p>Privacidad</p></a>
                        <a href="/seguridad"><p>Seguridad</p></a>
                        <a href="/cookies"><p>Declaración de cookies</p></a>
                    </div>
                </div>
            </div>
        </div>
        </body>
    );
}

export default Footer;
