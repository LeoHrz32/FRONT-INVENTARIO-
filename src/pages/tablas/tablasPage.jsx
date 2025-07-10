import React, { useState, useEffect } from 'react';
import Table from '../../components/table/Table';
import TableHead from '../../components/table/TableHead';
import TableBody from '../../components/table/TableBody';
import TableRow from '../../components/table/TableRow';
import TableCell from '../../components/table/TableCell';
import Pagination from '../../components/table/Pagination';
import { CreateButton, SearchBar, ItemsPerPageSelect } from '../../components/table/TopBarElements';
import { RiDeleteBin6Line, RiEdit2Line, RiEyeLine } from 'react-icons/ri';
import { useTablas } from '../../context/tablas/tablasContext';
import ModalTablaCreateForm from './tablasCreate';
import ModalTablaEditForm from './tablasEdit';
import ModalTablaView from './tablasView';
import LoadingScreen from '../../components/LoadingScreen';
import { show_alert } from '../../components/alertFunctions';

const DynamicTableView = () => {
    const {
        tablas,
        columns,
        getAllTablas,
        getColumnasTabla,
        createTabla,
        updateTabla,
        deleteTabla,
        errors,
        messages,
        clearErrors,
        clearMessages
    } = useTablas();

    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedTable, setSelectedTable] = useState(null);
    const [loading, setLoading] = useState(false);

    // Inicializar datos
    useEffect(() => {
        getAllTablas();
    }, []);

    // Manejo de mensajes
    useEffect(() => {
        if (messages.length) {
            show_alert(messages[0], 'success');
            clearMessages();
        }
        if (errors.length) {
            show_alert(errors[0], 'error');
            clearErrors();
        }
    }, [messages, errors]);

    // Filtrado por búsqueda
    useEffect(() => {
        const filtered = tablas.filter(t =>
            t.nombre_tabla?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(filtered);
        setCurrentPage(1);
    }, [searchQuery, tablas]);

    // Paginación
    const handlePageChange = page => setCurrentPage(page);

    const handleItemsPerPageChange = perPage => {
        setItemsPerPage(perPage);
        setCurrentPage(1);
    };
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = filteredData.slice(startIndex, startIndex + itemsPerPage);

    // Acciones
    const handleCreateClick = () => setShowCreateModal(true);
    const handleEditClick = table => {
        setSelectedTable(table);
        setShowEditModal(true);
    };
    const handleViewClick = table => {
        setSelectedTable(table);
        getColumnasTabla(table.nombre_tabla);
        setShowViewModal(true);
    };
    const handleDeleteClick = table => deleteTabla(table.nombre_tabla);

    return (
        <div className="pb-4 overflow-y-auto">
            <div className="flex lg:flex-row justify-between items-center mb-1 gap-4">
                <div className="flex">
                    <CreateButton onClick={handleCreateClick} />
                </div>
                <div className="flex">
                    <SearchBar onSearch={setSearchQuery} />
                    <ItemsPerPageSelect value={itemsPerPage} onChange={handleItemsPerPageChange} />
                </div>
            </div>
            {currentItems.length === 0 ? (
                <p className="text-center">No hay tablas disponibles</p>
            ) : (
                <Table>
                    <TableHead>
                        <TableCell>Nombre de Tabla</TableCell>
                        <TableCell>Fecha de Creación</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableHead>
                    <TableBody>
                        {currentItems.map((table, idx) => (
                            <TableRow key={idx}>
                                <TableCell>{table.nombre_tabla}</TableCell>
                                <TableCell>{new Date(table.fecha_creacion).toLocaleString()}</TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleViewClick(table)} className="rounded-lg transition-colors text-white bg-secondary-100 hover:bg-secondary-500 p-2">
                                            <RiEyeLine />
                                        </button>
                                        <button onClick={() => handleEditClick(table)} className="rounded-lg transition-colors text-white bg-secondary-100 hover:bg-secondary-500 p-2">
                                            <RiEdit2Line />
                                        </button>
                                        <button onClick={() => handleDeleteClick(table)} className="p-2 rounded bg-red-500 text-white">
                                            <RiDeleteBin6Line />
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <Pagination
                        totalItems={filteredData.length}
                        itemsPerPage={5}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                    />
                </Table>
            )}

            {/* Modales */}
            {showCreateModal && (
                <ModalTablaCreateForm onClose={() => setShowCreateModal(false)} />
            )}
            {showEditModal && (
                <ModalTablaEditForm tabla={selectedTable} onClose={() => setShowEditModal(false)} />
            )}
            {showViewModal && (
                <ModalTablaView tabla={selectedTable} columnas={columns} onClose={() => setShowViewModal(false)} />
            )}

            {loading && <LoadingScreen />}
        </div>
    );
};

export default DynamicTableView;
