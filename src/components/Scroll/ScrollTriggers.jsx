import React, { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Box from "@mui/material/Box";
import nosotros from "../Image/Nosotros/nuevologo.png"
import historia from "../Image/Nosotros/historia.png"
import mision from "../Image/Nosotros/mision.png"
import vision from "../Image/Nosotros/vision.png"
import objetivos from "../Image/Nosotros/objetivos.png"
import objetivosS from "../Image/Nosotros/objetivosS.png"
import proposito from "../Image/Nosotros/proposito.png"
import estrategias from "../Image/Nosotros/estrategias.png"
import politicas from "../Image/Nosotros/politicas.png"

gsap.registerPlugin(ScrollTrigger);

const sections = [
    {
        title: "NOSOTROS",
        height: "150vh",
        imgSrc: nosotros,
        imgAlt: "img-1",
        align: "left",
        subtitle: "Dos fundamentos son claves en todo el accionar de FEPI:",
        text1: "FEPI, jurídicamente es una fundación creada por el padre Federico Carrasquilla, junto con habitantes del barrio Popular 1(Comuna 1) de la ciudad de Medellín, con personería jurídica de noviembre 15 de 1983, integrada por hombres y mujeres (Amas de casa, trabajadores, líderes, comerciantes, estudiantes) en la cual se busca mejorar la calidad de vida a nivel personal y grupal a través de procesos de iniciativas económicas de la economía popular, procesos culturales y artísticos, procesos de empoderamiento de las mujeres y la participación comunitaria para el desarrollo y la gestión local.",
        listItems: [
            "Todos los procesos con niños, niñas, jóvenes, mujeres, están en el marco de la educación Popular y este da sentido a todas las acciones que se puedan desarrollar como actividades de tipo cultural y artístico, recreativo, trabajo formativo con las mujeres, semana cultural, red barrial Popular 1 construyendo ciudadanía y demás actividades de desarrollo cultural para el barrio. En general actividades que contribuyen a la criticidad del contexto y a la búsqueda de mejores condiciones de vida. En este mismo sentido la participación como búsqueda por un mejor desarrollo y gestión local.",
            "Fomento de iniciativas económicas de hombres y mujeres para el mejoramiento de su calidad de vida. Entre ellas están la economía popular, social, solidaria y feminista las cuales apuntan a sostener y mejorar la vida. Su ideal es la reproducción de la vida y no la acumulación de capital."
        ]
    },
    {
        title: "HISTORIA",
        height: "90vh",
        imgSrc: historia,
        imgAlt: "img-2",
        align: "left",
        text1: "El barrio Popular #1, ubicado en el sector Nororiental de Medellín, tiene sus orígenes en la década de 1930 cuando Enrique Salazar, un campesino, comenzó a cultivar tierras en la zona. Con el tiempo, estas tierras fueron ocupadas por familias desplazadas que buscaban un lugar donde construir sus viviendas. A lo largo de las décadas, el barrio creció a través de luchas legales, invasiones de tierras, y el esfuerzo colectivo de sus habitantes para obtener servicios básicos y construir infraestructura.",
        text2: "La comunidad se organizó para enfrentar problemas comunes como la falta de agua potable, energía eléctrica, y vías de acceso, formando la Acción Comunal, que jugó un papel crucial en la mejora del barrio. A pesar de las dificultades, la solidaridad y la perseverancia de sus residentes permitieron el desarrollo de un barrio que, aunque humilde, está lleno de historia y sentido de pertenencia.",
        text3: "El barrio también ha sido testigo de una fuerte influencia religiosa, con figuras como el Padre Federico Carrasquilla, quien fue un líder espiritual y social, promoviendo la unión comunitaria y la construcción de la parroquia La Divina Providencia. Su legado sigue vivo en la memoria colectiva del barrio, que ha superado numerosos obstáculos para convertirse en un hogar para miles de personas.",
    },
    {
        title: "MISIÓN",
        height: "90vh",
        imgSrc: mision,
        imgAlt: "img-3",
        align: "left",
        text1: "FEPI es una fundación integrada por habitantes del barrio Popular Nª 1, que busca mejorar las condiciones de vida de niños, niñas, jóvenes y mujeres cabezas de familia de la comuna 1 a través del desarrollo cultural y artístico, capacitación técnica para el empleo, empoderamiento personal y fomento de la autoestima, la participación comunitaria y ejecución de ideas de negocio para la sostenibilidad.",
    },
    {
        title: "VISIÓN",
        height: "90vh",
        imgSrc: vision,
        imgAlt: "img-4",
        align: "right",
        text: "FEPI en el 2030 habrá consolidado los proyectos de generación de ingresos dignos a través de procesos administrativos claros y eficaces, aportando así al mejoramiento de la convivencia y las relaciones intrafamiliares de los participantes de los procesos socio- culturales.",
    },
    {
        title: "OBJETIVOS",
        height: "150vh",
        imgSrc: objetivos,
        imgAlt: "img-5",
        align: "right",
        subtitle1: "General",
        text1: "Potenciar las propuestas de emprendimiento de negocios que contribuyan a la generación de ingresos dignos y la sostenibilidad de los programas sociales de la Fundación logrando así una mayor sostenibilidad económica, social y cultural.",
        subtitle2: "Específicos",
        listItems: [
            "Potenciar la consolidación de semilleros participativos infantiles en áreas lúdicas y culturales como estrategias de prevención en la violencia, mejoramiento de la autoestima y mejoramiento de las relaciones interpersonales.",
            "Dinamizar procesos culturales que faciliten la participación de niños, niñas, jóvenes y mujeres adultas como espacios de formación para la convivencia, cultura de paz y proyección del talento humano.",
            "Consolidar ideas de negocios en el mediano y largo plazo que le permitan a la fundación la sostenibilidad de los programas sociales y la generación de ingresos dignos.",
            "Promover la realización de eventos culturales en los cuales se socialice y proyecten las actividades artísticas y los resultados de impactos logrados."
        ]
    },
    {
        title: "OBJETIVOS SOCIALES",
        height: "180vh",
        imgSrc: objetivosS,
        imgAlt: "img-6",
        align: "right",
        subtitle: "",
        listItems: [
            "Servir de medio educativo para la formación familiar y social del individuo que le capacite para desempeñar un trabajo útil y cumplir sus deberes familiares y sociales.",
            "Promover el empleo organizado hacia pequeñas industrias que faciliten un nivel de vida decoroso y la satisfacción de las necesidades vitales.",
            "Ayudar a la organización de grupos de trabajo en forma solidaria y de ayuda mutua.",
            "Propender por un mejoramiento integral tanto económico como cultural y social de los socios y beneficiarios de la Fundación.",
            "Impulsar la formación humanística, social, política y técnica del individuo, mediante la construcción y aplicación de un modelo pedagógico que aborde diferentes aspectos, como el psicológico, el sociopolítico, el económico y el cultural, que capacite a los sujetos para pensar críticamente, asumir compromisos sociales y desempeñar un trabajo digno.",
            "Aportar al impulso y desarrollo de los procesos organizativos de la comunidad, mediante dinámicas grupales con niños, niñas, jóvenes y mujeres, en diversas áreas y propender por el conocimiento y divulgación de los derechos humanos, haciendo énfasis en los sectores más desfavorecidos: mujeres, jóvenes, niños y niñas.",
            "Difundir el accionar de FEPI, la ampliación de la participación de la comunidad en los procesos y finalidades de FEPI y el establecimiento de una estrategia comunicativa.",
            "Promover y ejecutar con niños, niñas, jóvenes, mujeres y población adulta proyectos en las áreas de recreación y deportes, fomento artístico y cultural, acciones para el cuidado y fomento de una cultura ambiental, cultura de paz y convivencia, derechos humanos, empoderamiento de las mujeres, emprendimiento empresarial y todos aquellos que apunten al desarrollo local y mejoramiento de la calidad de vida.",
            "Promover unidades productivas con el fin de generar ingresos para el auto sostenimiento económico de la organización."
        ]
    },
    {
        title: "PROPOSITOS",
        height: "90vh",
        imgSrc: proposito,
        imgAlt: "img-7",
        align: "left",
        listItems: [
            " Formar individuos capaces de reconocer y desarrollarse integralmente, fomentando la autonomía, el pensamiento crítico y la responsabilidad social.",
            "Promovemos valores fundamentales como la solidaridad, la ayuda mutua, la tolerancia, el respeto por la vida, el compromiso, la responsabilidad, el trabajo en equipo, la honestidad, la equidad y la participación activa en la construcción de una sociedad más justa y cohesionada."
        ]
    },
    {
        title: "ESTRATEGIAS",
        height: "90vh",
        imgSrc: estrategias,
        imgAlt: "img-8",
        align: "left",
        listItems: [
            "Formación cultural y artística.",
            "Formación de semilleros infantiles para la prevención y la convivencia.",
            "Consolidación de ideas de negocios para la sostenibilidad.",
            "La autofinanciación de los programas sociales.",
            "Innovación e informática.",
            "Gestión de recursos.",
            "Gestión administrativa."
        ]
    },
    {
        title: "POLÍTICAS",
        height: "100vh",
        imgSrc: politicas,
        imgAlt: "img-9",
        align: "left",
        listItems: [
            "Actividades de proyección a la comunidad.",
            "Conocimiento y divulgación de los derechos de mujeres, jóvenes, niños y niñas.",
            "Conocimiento permanente de FEPI.",
            "Criterio de autonomía.",
            "Educación técnica unido a formación humanística.",
            "La prevención como estrategia educativa.",
            "Potenciación de la educación.",
            "Participación en espacios de ciudad.",
            "Participación en campañas de noviolencia, construcción de confianzas y reconciliación.",
            "Sistematización permanente.",
            "Todos los procesos educativos realizados en la fundación están atravesados por la perspectiva de género."
        ]
    }
];

function ServiceType() {
    useEffect(() => {
        let ctx = gsap.context(() => {

            gsap.set(".photo-group-1:not(:first-child)", { opacity: 0, scale: 0.5 });
            const animation1 = gsap.to(".photo-group-1:not(:first-child)", {
                opacity: 1,
                scale: 1,
                duration: 1,
                stagger: 1,
                scrollTrigger: {
                    trigger: ".first-group",
                    start: "top top",
                    end: "bottom bottom",
                    pin: ".rightblock",
                    scrub: true,
                    markers: false,
                }
            });

            gsap.set(".photo-group-2:not(:first-child)", { opacity: 0, scale: 0.5 });
            const animation2 = gsap.to(".photo-group-2:not(:first-child)", {
                opacity: 1,
                scale: 1,
                duration: 1,
                stagger: 1,
                scrollTrigger: {
                    trigger: ".second-group",
                    start: "top top",
                    end: "bottom bottom",
                    pin: ".leftblock",
                    scrub: true,
                    markers: false,
                }
            });

            gsap.set(".photo-group-3:not(:first-child)", { opacity: 0, scale: 0.5 });
            const animation3 = gsap.to(".photo-group-3:not(:first-child)", {
                opacity: 1,
                scale: 1,
                duration: 1,
                stagger: 1,
                scrollTrigger: {
                    trigger: ".third-group",
                    start: "top top",
                    end: "bottom bottom",
                    pin: ".rightblock-3",
                    scrub: true,
                    markers: false,
                }
            });

            ScrollTrigger.create({
                trigger: ".first-group",
                start: "bottom top",
                end: "bottom bottom",
                pin: ".rightblock .photo:last-child",
                pinSpacing: false,
                markers: false,
            });

            ScrollTrigger.create({
                trigger: ".second-group",
                start: "bottom top",
                end: "bottom bottom",
                pin: ".leftblock .photo:last-child",
                pinSpacing: false,
                markers: false,
            });

        });
        return () => ctx.revert();
    }, []);

    return (
        <React.Fragment>
            <Box className="gallery">
                {/* Secciones 1 a 3 */}
                <Box className="first-group" sx={{ display: "flex", width: "100%" }}>
                    <Box className="left" sx={{
                        width: "50%",
                        marginLeft: "auto",
                        "& .details": {
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            width: "40vw",
                            marginLeft: "100px",
                            color: "#000",
                            fontSize: "3rem",
                            fontWeight: 900,
                        },
                        "& .details p": {
                            marginTop: "0.5rem",
                            color: "#333",
                            fontSize: "1rem",
                            fontWeight: 400,
                            lineHeight: "1.5",
                        },
                        "& .details ul": {
                            fontSize: "1.1rem",
                            lineHeight: "1.6",
                            marginBottom: "20px",
                            marginLeft: "20px",
                            marginTop: "0.5rem",
                            color: "#000",
                        },
                        "& .details li": {
                            marginTop: "0.5rem",
                            color: "#333",
                            fontSize: "1rem",
                            fontWeight: 400,
                            lineHeight: "1.5",
                            marginBottom: "10px",
                            listStyleType: "disc",
                        },
                        "& .details h6": {
                            color: "#000",
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                            marginBottom: "5px",
                            fontFamily: "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif",
                            marginTop: "20px"
                        },
                        "& .details h2": {
                            color: "#00aa4d",
                            fontSize: "3.5rem",
                            fontWeight: "bold",
                            marginBottom: "5px",
                            fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
                        },
                    }}>
                        {sections.slice(0, 3).map((section, index) => (
                            <Box key={index} className="details" style={{ height: section.height }}>
                                <Box >
                                    <h2>{section.title}</h2>
                                    <p>{section.text1}</p>
                                    <p>{section.text2}</p>
                                    <p>{section.text3}</p>
                                    <h6>{section.subtitle}</h6>
                                    {section.listItems && (
                                        <ul>
                                            {section.listItems.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    )}
                                    {section.title === "HISTORIA" && (
                                        <a href="/public/Historia del barrio Popular 1.doc" download="Historia_del_barrio_Popular_1.doc">
                                            <button style={{ marginTop: '12px', padding: '10px 10px', backgroundColor: '#00aa4d', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer', fontSize: '0.875rem' }}>
                                                Descargar historia completa
                                            </button>
                                        </a>
                                    )}
                                </Box>
                            </Box>
                        ))}
                    </Box>
                    <Box className="rightblock" sx={{
                        width: "50%",
                        height: "100vh",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}>
                        <Box sx={{
                            width: "40vw",
                            height: "40vw",
                            position: "relative",
                            "& .photo": {
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                                marginLeft: "30px",
                                "& img": {
                                    height: "100%",
                                    width: "100%",
                                }
                            }
                        }}>
                            {sections.slice(0, 3).map((section, index) => (
                                <Box key={index} className="photo photo-group-1">
                                    <img
                                        src={section.imgSrc}
                                        alt={section.imgAlt}
                                    />
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>


                {/* Secciones 4 a 6 */}
                <Box className="second-group" sx={{ display: "flex", width: "100%" }}>
                    <Box className="leftblock" sx={{
                        width: "50%",
                        height: "100vh",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        padding: "20px",
                    }}>
                        <Box sx={{
                            width: "40vw",
                            height: "40vw",
                            position: "relative",
                            "& .photo": {
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                                marginLeft: "70px",
                                "& img": {
                                    height: "100%",
                                    width: "100%",
                                }
                            }
                        }}>
                            {sections.slice(3, 6).map((section, index) => (
                                <Box key={index} className="photo photo-group-2">
                                    <img
                                        src={section.imgSrc}
                                        alt={section.imgAlt}
                                    />
                                </Box>
                            ))}
                        </Box>
                    </Box>
                    <Box className="right" sx={{
                        width: "50%",
                        marginLeft: "auto",
                        "& .details": {
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            width: "40vw",
                            marginLeft: "30px",
                            color: "#000",
                            fontSize: "3rem",
                            fontWeight: 900,
                        },
                        "& .details p": {
                            marginTop: "0.5rem",
                            color: "#333",
                            fontSize: "1rem",
                            fontWeight: 400,
                            lineHeight: "1.5",
                        },
                        "& .details ul": {
                            fontSize: "1.1rem",
                            lineHeight: "1.6",
                            marginBottom: "20px",
                            marginLeft: "20px",
                            marginTop: "0.5rem",
                            color: "#000",
                        },
                        "& .details li": {
                            marginTop: "0.5rem",
                            color: "#333",
                            fontSize: "1rem",
                            fontWeight: 400,
                            lineHeight: "1.5",
                            marginBottom: "10px",
                            listStyleType: "disc",
                        },
                        "& .details h6": {
                            color: "#000",
                            fontSize: "2.2rem",
                            fontWeight: "bold",
                            marginBottom: "5px",
                            fontFamily: "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif",
                            marginTop: "20px"
                        },
                        "& .details h2": {
                            color: "#00aa4d",
                            fontSize: "3.5rem",
                            fontWeight: "bold",
                            marginBottom: "5px",
                            fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
                        },
                    }}>
                        {sections.slice(3, 6).map((section, index) => (
                            <Box key={index} className="details" style={{ height: section.height }}>
                                <Box >
                                    <h2>{section.title}</h2>
                                    <p>{section.text}</p>
                                    <h6>{section.subtitle}</h6>
                                    <h6>{section.subtitle1}</h6>
                                    <p>{section.text1}</p>
                                    <h6>{section.subtitle2}</h6>
                                    {section.listItems && (
                                        <ul>
                                            {section.listItems.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    )}
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>

                {/* Secciones 7 a 9 */}
                <Box className="third-group" sx={{ display: "flex", width: "100%" }}>
                    <Box className="left" sx={{
                        width: "50%",
                        marginLeft: "auto",
                        "& .details": {
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            width: "40vw",
                            marginLeft: "100px",
                            color: "#000",
                            fontSize: "3rem",
                            fontWeight: 900,
                        },
                        "& .details p": {
                            marginTop: "0.5rem",
                            color: "#333",
                            fontSize: "1rem",
                            fontWeight: 400,
                            lineHeight: "1.5",
                        },
                        "& .details ul": {
                            fontSize: "1.1rem",
                            lineHeight: "1.6",
                            marginBottom: "20px",
                            marginLeft: "20px",
                            marginTop: "0.5rem",
                            color: "#000",
                        },
                        "& .details li": {
                            marginTop: "0.5rem",
                            color: "#333",
                            fontSize: "1rem",
                            fontWeight: 400,
                            lineHeight: "1.5",
                            marginBottom: "10px",
                            listStyleType: "disc",
                        },
                        "& .details h6": {
                            color: "#000",
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                            marginBottom: "5px",
                            fontFamily: "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"
                        },
                        "& .details h2": {
                            color: "#00aa4d",
                            fontSize: "3.5rem",
                            fontWeight: "bold",
                            marginBottom: "5px",
                            fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
                        },
                    }}>
                        {sections.slice(6, 9).map((section, index) => (
                            <Box key={index} className="details" style={{ height: section.height }}>
                                <Box >
                                    <h2>{section.title}</h2>
                                    <p>{section.text}</p>
                                    <h6>{section.subtitle}</h6>
                                    {section.listItems && (
                                        <ul>
                                            {section.listItems.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    )}
                                </Box>
                            </Box>
                        ))}
                    </Box>
                    <Box className="rightblock-3" sx={{
                        width: "50%",
                        height: "100vh",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}>
                        <Box sx={{
                            width: "40vw",
                            height: "40vw",
                            position: "relative",
                            "& .photo": {
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                                marginLeft: "30px",
                                "& img": {
                                    height: "100%",
                                    width: "100%",
                                }
                            }
                        }}>
                            {sections.slice(6, 9).map((section, index) => (
                                <Box key={index} className="photo photo-group-3">
                                    <img
                                        src={section.imgSrc}
                                        alt={section.imgAlt}
                                    />
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </React.Fragment>
    );
}

export default ServiceType;