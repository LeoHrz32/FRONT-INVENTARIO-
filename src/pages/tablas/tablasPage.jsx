import React, { useState, useEffect } from 'react';
import Table from '../../components/table/Table';
import TableHead from '../../components/table/TableHead';
import TableBody from '../../components/table/TableBody';
import TableRow from '../../components/table/TableRow';
import TableCell from '../../components/table/TableCell';
import Pagination from '../../components/table/Pagination';
import { CreateButton, SearchBar, ItemsPerPageSelect } from '../../components/table/TopBarElements';
import { RiDeleteBin6Line, RiEdit2Line, RiEyeLine } from 'react-icons/ri';
import { useTablas } from "../../context/tablas/tablasContext";

import ModalTablaCreateForm from './tablasCreate';
import ModalTablaEditForm from './tablasEdit';
import ModalTablaView from './tablasView';
import LoadingScreen from '../../components/LoadingScreen';

function DynamicTableView() {
    const {
        tablas,
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
        clearErrors,
        clearMessages
    } = useTablas();

    const [filteredData, setFilteredData] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showColumnsModal, setShowColumnsModal] = useState(false);
    const [selectedTable, setSelectedTable] = useState(null);
    const [loading, setLoading] = useState(false);

    // Load tablas
    useEffect(() => {
        getAllTablas();
    }, []);

    useEffect(() => {
        setFilteredData(tablas);
    }, [tablas]);

    useEffect(() => {
        if (messages.length) clearMessages();
        if (errors.length) clearErrors();
    }, [messages, errors]);

    const handleSearch = (query) => {
        searchTablas(query);
    };

    const handlePageChange = (page) => {
        getPaginatedTablas(page, itemsPerPage);
    };

    const handleItemsPerPageChange = (perPage) => {
        setItemsPerPage(perPage);
        getPaginatedTablas(1, perPage);
    };

    const handleCreate = () => {
        setShowCreateModal(true);
    };

    const handleEdit = (table) => {
        setSelectedTable(table);
        setShowEditModal(true);
    };

    const handleViewColumns = (table) => {
        setSelectedTable(table);
        getColumnasTabla(table.nombre_tabla);
        setShowColumnsModal(true);
    };

    const handleDelete = (table) => {
        deleteTabla(table.nombre_tabla);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="pb-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-2 gap-4">
                <CreateButton onClick={handleCreate} />
                <div className="flex gap-2">
                    <SearchBar onSearch={handleSearch} value={searchQuery} />
                    <ItemsPerPageSelect value={itemsPerPage} onChange={handleItemsPerPageChange} />
                </div>
            </div>

            {currentData.length === 0 ? (
                <p className="text-center">No hay tablas disponibles</p>
            ) : (
                <Table>
                    <TableHead>
                        <TableCell>Nombre de Tabla</TableCell>
                        <TableCell>Fecha de Creación</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableHead>
                    <TableBody>
                        {currentData.map((table, idx) => (
                            <TableRow key={idx}>
                                <TableCell>{table.nombre_tabla}</TableCell>
                                <TableCell>{new Date(table.fecha_creacion).toLocaleString()}</TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleViewColumns(table)} className="p-2 rounded bg-blue-500 text-white">
                                            <RiEyeLine />
                                        </button>
                                        <button onClick={() => handleEdit(table)} className="p-2 rounded bg-yellow-500 text-white">
                                            <RiEdit2Line />
                                        </button>
                                        <button onClick={() => handleDelete(table)} className="p-2 rounded bg-red-500 text-white">
                                            <RiDeleteBin6Line />
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <Pagination
                        totalItems={filteredData.length}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </Table>
            )}

            {/* Modales */}
            {showCreateModal && (
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-50">
                    <ModalTablaCreateForm onClose={() => setShowCreateModal(false)} />
                </div>
            )}

            {showEditModal && (
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-50">
                    <ModalTablaEditForm table={selectedTable} onClose={() => setShowEditModal(false)} />
                </div>
            )}

            {showColumnsModal && (
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-50">
                    <ModalTablaView tabla={selectedTable} columnas={columns} onClose={() => setShowColumnsModal(false)} />
                </div>
            )}

            {loading && <LoadingScreen />}
        </div>
    );
}

export default DynamicTableView;
