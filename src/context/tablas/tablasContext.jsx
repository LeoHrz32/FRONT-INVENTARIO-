// src/context/tablas/tablasContext.jsx

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
} from "../../api/tablasDeRegistroApi/tablasApi";

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

    // Opcional: estos dos ya no se usan para client‑side pagination
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    const handleError = (error) => {
        const message = error.response?.data?.detail || "Error inesperado";
        setErrors([message]);
    };

    // 1️⃣ Obtener todas las tablas (nombre + fecha)
    const getAllTablas = async () => {
        try {
            const res = await getTableMetadataRequest();
            setTablas(res.data.tablas || []);
        } catch (error) {
            handleError(error);
        }
    };

    // 2️⃣ Obtener columnas de una tabla específica
    const getColumnasTabla = async (nombre) => {
        try {
            const res = await getTableColumnsRequest(nombre);
            setColumns(res.data);
        } catch (error) {
            handleError(error);
        }
    };

    // 3️⃣ Crear nueva tabla
    const createTabla = async (data) => {
        try {
            const res = await createDynamicTableRequest(data);
            setMessages([res.data.message]);
            setTablasUpdated(true);
        } catch (error) {
            handleError(error);
        }
    };

    // 4️⃣ Actualizar tabla
    const updateTabla = async (nombre, cambios) => {
        try {
            const res = await updateDynamicTableRequest(nombre, cambios);
            setMessages([res.data.message]);
            setTablasUpdated(true);
        } catch (error) {
            handleError(error);
        }
    };

    // 5️⃣ Eliminar tabla
    const deleteTabla = async (nombre) => {
        try {
            await deleteDynamicTableRequest(nombre);
            setMessages([`Tabla ${nombre} eliminada correctamente`]);
            setTablasUpdated(true);
        } catch (error) {
            handleError(error);
        }
    };

    // 6️⃣ (Ya no necesario para client‑side) Paginación via API
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

    // 7️⃣ (Ya no necesario para client‑side) Búsqueda via API
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

    // Efecto inicial y para refrescar tras cambios
    useEffect(() => {
        getAllTablas();
    }, []);

    useEffect(() => {
        if (tablasUpdated) {
            getAllTablas();
            setTablasUpdated(false);
        }
    }, [tablasUpdated]);

    // Limpieza automática de errores
    useEffect(() => {
        if (errors.length > 0) {
            const t = setTimeout(() => setErrors([]), 3000);
            return () => clearTimeout(t);
        }
    }, [errors]);

    const clearMessages = () => setMessages([]);
    const clearErrors = () => setErrors([]);

    return (
        <TablaContext.Provider
            value={{
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
                clearErrors,
            }}
        >
            {children}
        </TablaContext.Provider>
    );
};
