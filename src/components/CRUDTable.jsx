import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Table from './table/Table';
import TableHead from './table/TableHead';
import TableBody from './table/TableBody';
import TableRow from './table/TableRow';
import TableCell from './table/TableCell';
import Pagination from './table/Pagination';
import { CreateButton, ExportButton, SearchBar, ItemsPerPageSelect } from './table/TopBarElements';
import FormModal from './FormModal';
import ViewModal from './ViewModal';
import { RiDeleteBin6Line, RiEdit2Line, RiEyeLine } from 'react-icons/ri';
import Switch from './form/Switch';

function CRUDTable({ data }) {
    const sortDataByState = (data) => {
        return data.slice().sort((a, b) => b.state - a.state);
    };

    const [filteredData, setFilteredData] = useState(sortDataByState(data));    
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [showModalForm, setShowModalForm] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleCreateClick = () => {
        setShowModalForm(true);
    };

    const handleSearch = (query) => {
        const filtered = data.filter(item =>
            item.id.includes(query) ||
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase()) ||
            item.status.toLowerCase().includes(query.toLowerCase())
        );
ViewModal
        setFilteredData(sortDataByState(filtered));
        setCurrentPage(1);
    };

    const handleExportPDF = () => {
        // Lógica para exportar a PDF
    };

    const handleExportExcel = () => {
        // Lógica para exportar a Excel
    };

    const handleEditButtonClick = (item) => {
        // Lógica para editar el item
        console.log("Edit clicked", item);
    };

    const handleDeleteButtonClick = (id) => {
        // Lógica para eliminar el item
        console.log("Delete clicked", id);
    };

    const handleViewButtonClick = (item) => {
        setSelectedItem(item);
        setShowViewModal(true);
    };

    const handleSwitchChange = (id, checked) => {
        const updatedData = filteredData.map(item =>
            item.id === id ? { ...item, state: checked } : item
        );
        setFilteredData(sortDataByState(updatedData));
    };

    const handleItemsPerPageChange = (newValue) => {
        setItemsPerPage(newValue);
        setCurrentPage(1);
    };

    const viewModalLayout = [
        ['name'],
        ['name', 'description'],
        ['name', 'state'],
        ['name', 'description', 'status'],
        ['state'],
    ];

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className='pb-4 overflow-y-auto'>
            <div className="flex lg:flex-row justify-between items-center mb-1 gap-4">
                <div className="flex">
                    <CreateButton onClick={handleCreateClick} />
                </div> 
                <div className="flex">
                    <ExportButton onClick={handleExportPDF} type="pdf" />
                    <ExportButton onClick={handleExportExcel} type="excel" />
                    <SearchBar onSearch={handleSearch} />
                    <ItemsPerPageSelect value={itemsPerPage} onChange={handleItemsPerPageChange} />
                </div>
            </div>
            {filteredData.length === 0 ? (
                <p className="text-center">No hay registros disponibles</p>
            ) : (
                <>
                    <Table>
                        <TableHead>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell>Estatus</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableHead>
                        <TableBody>
                            {currentData.map((item, index) => (
                                <TableRow key={index} isActive={item.state}>
                                    <TableCell label="ID" className={`${item.state === true ? '' : 'opacity-50'}`}>{item.id}</TableCell>
                                    <TableCell label="Nombre" className={`${item.state === true ? '' : 'opacity-50'}`}>{item.name}</TableCell>
                                    <TableCell label="Descripción" className={`${item.state === true ? '' : 'opacity-50'}`} truncate>{item.description}</TableCell>
                                    <TableCell label="Estatus" className={`py-1 px-2 ${item.status === 'Abierto' ? 'bg-green-500/10 text-green-500' : item.status === 'En proceso' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'} ${item.state === true ? '' : 'opacity-50'} rounded-lg`}>
                                        {item.status}
                                    </TableCell>
                                    <TableCell label="Estado">
                                        <Switch
                                            name="state"
                                            checked={item.state}
                                            onChange={(e) => handleSwitchChange(item.id, e.target.checked)}
                                        />
                                    </TableCell>
                                    <TableCell label="Acciones">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleViewButtonClick(item)}
                                                className="rounded-lg transition-colors text-white bg-secondary-100 hover:bg-secondary-500 p-2"
                                            >
                                                <RiEyeLine />
                                            </button>
                                            <button
                                                onClick={() => handleEditButtonClick(item)}
                                                className={`rounded-lg transition-colors text-white bg-secondary-100 ${item.state === true ? 'hover:bg-secondary-500' : 'text-white/50 bg-secondary-100/50'} p-2`}
                                                disabled={!item.state}
                                            >
                                                <RiEdit2Line />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteButtonClick(item.id)}
                                                className={`rounded-lg transition-colors text-white bg-red-500 ${item.state === true ? 'hover:bg-red-700' : 'text-white/50 bg-red-500/50'} p-2`}
                                                disabled={!item.state}
                                            >
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
                        onPageChange={setCurrentPage}
                    /> 
                    </Table>
                </>
            )}
            {showModalForm && (
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-50">
                    <FormModal onClose={() => setShowModalForm(false)} />
                </div>
            )}
            {showViewModal && selectedItem && (
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-50">
                    <ViewModal item={selectedItem} onClose={() => setShowViewModal(false)} viewModalLayout={viewModalLayout} />
                </div>
            )}
        </div>
    );
}

export default CRUDTable;
