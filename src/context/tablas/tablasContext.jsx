import React, { createContext, useContext, useState, useEffect } from "react";
import {
    getAllTableNamesRequest,
    getTableMetadataRequest,
    getTableColumnsRequest,
    createDynamicTableRequest,
    updateDynamicTableRequest,
    deleteDynamicTableRequest,
    getPaginatedTablesRequest,
    searchTablesRequest,
} from "../../api/tablasDeRegistroApi/tablasApi"; // Ajusta según tu estructura

export const TablaContext = createContext();

export const useTablas = () => {
    const context = useContext(TablaContext);
    if (!context) {
        throw new Error("useTablas debe usarse dentro de un TablaProvider");
    }
    return context;
};

export const TablaProvider = ({ children }) => {
    const [tablas, setTablas] = useState([]);
    const [selectedTabla, setSelectedTabla] = useState(null);
    const [columns, setColumns] = useState([]);
    const [errors, setErrors] = useState([]);
    const [messages, setMessages] = useState([]);
    const [tablasUpdated, setTablasUpdated] = useState(false);

    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    const handleError = (error) => {
        const message = error.response?.data?.detail || "Error inesperado";
        setErrors([message]);
    };

    // Obtener todas las tablas (metadata)
    const getAllTablas = async () => {
        try {
            const res = await getTableMetadataRequest();
            setTablas(res.data.tablas || []);
        } catch (error) {
            handleError(error);
        }
    };

    // Obtener columnas de una tabla específica
    const getColumnasTabla = async (nombre) => {
        try {
            const res = await getTableColumnsRequest(nombre);
            setColumns(res.data);
        } catch (error) {
            handleError(error);
        }
    };

    // Crear nueva tabla dinámica
    const createTabla = async (data) => {
        try {
            const res = await createDynamicTableRequest(data);
            setMessages([res.data.message]);
            setTablasUpdated(true);
        } catch (error) {
            handleError(error);
        }
    };

    // Actualizar estructura de una tabla
    const updateTabla = async (nombre, cambios) => {
        try {
            const res = await updateDynamicTableRequest(nombre, cambios);
            setMessages([res.data.message]);
            setTablasUpdated(true);
        } catch (error) {
            handleError(error);
        }
    };

    // Eliminar tabla
    const deleteTabla = async (nombre) => {
        try {
            await deleteDynamicTableRequest(nombre);
            setMessages([`Tabla ${nombre} eliminada correctamente`]);
            setTablasUpdated(true);
        } catch (error) {
            handleError(error);
        }
    };

    // Obtener paginación
    const getPaginatedTablas = async (page = 1, perPage = 5) => {
        try {
            const res = await getPaginatedTablesRequest(page, perPage);
            setTablas(res.data.tablas || []);
            setTotalPages(res.data.total_pages || 1);
            setCurrentPage(page);
        } catch (error) {
            handleError(error);
        }
    };

    // Buscar tabla por nombre
    const searchTablas = async (query) => {
        try {
            const res = await searchTablesRequest(query);
            setTablas(res.data.tablas || []);
            setSearchQuery(query);
            setTotalPages(1);
        } catch (error) {
            handleError(error);
        }
    };

    // Efectos
    useEffect(() => {
        getAllTablas();
    }, []);

    useEffect(() => {
        if (tablasUpdated) {
            getAllTablas();
            setTablasUpdated(false);
        }
    }, [tablasUpdated]);

    useEffect(() => {
        if (errors.length > 0) {
            const t = setTimeout(() => setErrors([]), 3000);
            return () => clearTimeout(t);
        }
    }, [errors]);

    const clearMessages = () => setMessages([]);
    const clearErrors = () => setErrors([]);

    return (
        <TablaContext.Provider value={{
            tablas,
            selectedTabla,
            setSelectedTabla,
            columns,
            getAllTablas,
            getColumnasTabla,
            createTabla,
            updateTabla,
            deleteTabla,
            getPaginatedTablas,
            searchTablas,
            totalPages,
            currentPage,
            searchQuery,
            errors,
            messages,
            clearMessages,
            clearErrors
        }}>
            {children}
        </TablaContext.Provider>
    );
};
