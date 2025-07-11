// Importación de React y funciones para hacer peticiones al backend relacionadas con registros de tablas
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

// Se crea el contexto para compartir el estado relacionado con registros entre componentes
export const RegistrosContext = createContext();

// Hook personalizado para consumir el contexto de forma segura
export const useRegistros = () => {
    const context = useContext(RegistrosContext);
    if (!context) {
        throw new Error("useRegistros debe usarse dentro de un RegistrosProvider");
    }
    return context;
};

// Componente Provider que administra y expone el estado y funciones relacionadas con registros dinámicos
export const RegistrosProvider = ({ children }) => {
    // Estados principales:
    const [tablas, setTablas] = useState([]);               // Lista de tablas disponibles
    const [registros, setRegistros] = useState([]);         // Registros de la tabla seleccionada
    const [tablaSeleccionada, setTablaSeleccionada] = useState(null);  // Nombre de la tabla actualmente seleccionada
    const [registroSeleccionado, setRegistroSeleccionado] = useState(null);  // Registro actual para edición o vista
    const [schema, setSchema] = useState([]);               // Columnas de la tabla seleccionada
    const [errores, setErrores] = useState([]);             // Errores capturados desde el backend
    const [mensajes, setMensajes] = useState([]);           // Mensajes informativos desde el backend
    const [actualizado, setActualizado] = useState(false);  // Bandera para recargar datos después de un cambio

    // Función para manejar errores de las peticiones
    const manejarError = (error) => {
        const detalle = error?.response?.data?.detail;
        const mensaje = typeof detalle === "object" ? detalle.message : detalle || "Error en la operación";
        setErrores([mensaje]);
    };

    // Obtiene todas las tablas disponibles desde el backend
    const obtenerTablas = async () => {
        try {
            const res = await getAvailableTablesRequest();
            setTablas(res.data);
        } catch (error) {
            manejarError(error);
        }
    };

    // Obtiene todos los registros de una tabla específica
    const obtenerRegistros = async (nombreTabla) => {
        try {
            const res = await getTableRecordsRequest(nombreTabla);
            setTablaSeleccionada(nombreTabla);
            setRegistros(res.data);
        } catch (error) {
            manejarError(error);
        }
    };

    // Obtiene un solo registro por su ID para mostrarlo o editarlo
    const obtenerRegistroPorId = async (nombreTabla, id) => {
        try {
            const res = await getSingleRecordRequest(nombreTabla, id);
            setRegistroSeleccionado(res.data.data);
        } catch (error) {
            manejarError(error);
        }
    };

    // Crea un registro nuevo
    const crearRegistro = async (nombreTabla, datos) => {
        try {
            const res = await createRecordRequest(nombreTabla, datos);
            if (res.data?.message) {
                setMensajes([res.data.message]);
            }
            setActualizado(true);
        } catch (error) {
            manejarError(error);
        }
    };

    // Actualiza un registro existente
    const actualizarRegistro = async (nombreTabla, id, datos) => {
        try {
            const res = await updateRecordRequest(nombreTabla, id, datos);
            if (res.data?.message) {
                setMensajes([res.data.message]);
            }
            setActualizado(true);
        } catch (error) {
            manejarError(error);
        }
    };

    // Elimina un registro por su ID
    const eliminarRegistro = async (nombreTabla, id) => {
        try {
            const res = await deleteRecordRequest(nombreTabla, id);
            setMensajes([res.data.message]);
            setActualizado(true);
        } catch (error) {
            manejarError(error);
        }
    };

    // Obtiene las columnas (estructura) de la tabla seleccionada
    const obtenerColumnas = async (nombreTabla) => {
        try {
            const res = await getTableColumnsRequest(nombreTabla);
            setSchema(res.data);
        } catch (error) {
            manejarError(error);
        }
    };

    // Funciones utilitarias para limpiar errores, mensajes o registro seleccionado
    const limpiarErrores = () => setErrores([]);
    const limpiarMensajes = () => setMensajes([]);
    const limpiarRegistroSeleccionado = () => setRegistroSeleccionado(null);

    // Efecto que se ejecuta al montar el componente para cargar las tablas
    useEffect(() => {
        obtenerTablas();
    }, []);

    // Efecto que se ejecuta cuando cambia la tabla seleccionada para recargar registros y columnas
    useEffect(() => {
        if (tablaSeleccionada) {
            obtenerRegistros(tablaSeleccionada);
            obtenerColumnas(tablaSeleccionada);
            setActualizado(false);
        }
    }, [tablaSeleccionada]);

    // Efecto que recarga registros si se realizó alguna actualización (crear, actualizar, eliminar)
    useEffect(() => {
        if (actualizado && tablaSeleccionada) {
            obtenerRegistros(tablaSeleccionada);
            setActualizado(false);
        }
    }, [actualizado]);

    // Efecto que limpia los errores automáticamente después de 3 segundos
    useEffect(() => {
        if (errores.length > 0) {
            const timer = setTimeout(() => setErrores([]), 3000);
            return () => clearTimeout(timer);
        }
    }, [errores]);

    // El valor que estará disponible para todos los componentes que usen el contexto
    return (
        <RegistrosContext.Provider
            value={{
                tablas,
                tablaSeleccionada,
                setTablaSeleccionada,
                schema,
                registros,
                obtenerTablas,
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
                limpiarRegistroSeleccionado,
            }}
        >
            {children}
        </RegistrosContext.Provider>
    );
};
