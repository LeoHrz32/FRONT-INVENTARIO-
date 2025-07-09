import React, { createContext, useContext, useEffect, useState } from "react";
import {
    getAvailableTablesRequest,
    getTableRecordsRequest,
    getSingleRecordRequest,
    createRecordRequest,
    updateRecordRequest,
    deleteRecordRequest,
    getTableColumnsRequest
} from "../../api/registrosTablasApi/registroApi";

export const RegistrosContext = createContext();

export const useRegistros = () => {
    const context = useContext(RegistrosContext);
    if (!context) {
        throw new Error("useRegistros debe usarse dentro de un RegistrosProvider");
    }
    return context;
};

export const RegistrosProvider = ({ children }) => {
    const [tablas, setTablas] = useState([]);
    const [registros, setRegistros] = useState([]);
    const [tablaSeleccionada, setTablaSeleccionada] = useState(null);
    const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
    const [schema, setSchema] = useState([]);
    const [errores, setErrores] = useState([]);
    const [mensajes, setMensajes] = useState([]);
    const [actualizado, setActualizado] = useState(false);

    const manejarError = (error) => {
        const detalle = error?.response?.data?.detail;
        const mensaje = typeof detalle === "object" ? detalle.message : detalle || "Error en la operación";
        setErrores([mensaje]);
    };

    const obtenerTablas = async () => {
        try {
            const res = await getAvailableTablesRequest();
            setTablas(res.data);
        } catch (error) {
            manejarError(error);
        }
    };

    const obtenerRegistros = async (nombreTabla) => {
        try {
            const res = await getTableRecordsRequest(nombreTabla);
            setTablaSeleccionada(nombreTabla);
            setRegistros(res.data);   // Ajuste: el API devuelve lista directamente
        } catch (error) {
            manejarError(error);
        }
    };

    const obtenerRegistroPorId = async (nombreTabla, id) => {
        try {
            const res = await getSingleRecordRequest(nombreTabla, id);
            setRegistroSeleccionado(res.data);
        } catch (error) {
            manejarError(error);
        }
    };

    const crearRegistro = async (nombreTabla, datos) => {
        try {
            const res = await createRecordRequest(nombreTabla, datos);
            setMensajes([res.data.message]);
            setActualizado(true);
        } catch (error) {
            manejarError(error);
        }
    };

    const actualizarRegistro = async (nombreTabla, campoPk, valorPk, datos) => {
        try {
            const res = await updateRecordRequest(nombreTabla, campoPk, valorPk, datos);
            setMensajes([res.data.message]);
            setActualizado(true);
        } catch (error) {
            manejarError(error);
        }
    };

    const eliminarRegistro = async (nombreTabla, id) => {
        try {
            const res = await deleteRecordRequest(nombreTabla, id);
            setMensajes([res.data.message]);
            setActualizado(true);
        } catch (error) {
            manejarError(error);
        }
    };

    const obtenerColumnas = async (nombreTabla) => {
        try {
            const res = await getTableColumnsRequest(nombreTabla);
            setSchema(res.data);
        } catch (error) {
            manejarError(error);
        }
    };

    const limpiarErrores = () => setErrores([]);
    const limpiarMensajes = () => setMensajes([]);

    useEffect(() => {
        obtenerTablas();
    }, []);

    useEffect(() => {
        if (tablaSeleccionada) {
            obtenerRegistros(tablaSeleccionada);
            obtenerColumnas(tablaSeleccionada);
            setActualizado(false);
        }
    }, [tablaSeleccionada]);

    useEffect(() => {
        if (actualizado && tablaSeleccionada) {
            obtenerRegistros(tablaSeleccionada);
            setActualizado(false);
        }
    }, [actualizado]);

    useEffect(() => {
        if (errores.length > 0) {
            const timer = setTimeout(() => setErrores([]), 3000);
            return () => clearTimeout(timer);
        }
    }, [errores]);

    return (
        <RegistrosContext.Provider
            value={{
                tablas,
                tablaSeleccionada,
                setTablaSeleccionada,
                schema,
                registros,
                obtenerTablas,           // 👈 FALTABA ESTO
                obtenerRegistros,
                registroSeleccionado,
                obtenerRegistroPorId,
                crearRegistro,
                actualizarRegistro,
                eliminarRegistro,
                errores,
                mensajes,
                limpiarErrores,
                limpiarMensajes,
            }}
        >
            {children}
        </RegistrosContext.Provider>
    );
};
