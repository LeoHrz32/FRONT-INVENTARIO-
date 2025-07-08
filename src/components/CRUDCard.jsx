import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from './table/Pagination';
import { CreateButton, ExportButton, SearchBar } from './table/TopBarElements';
import FormModal from './FormModal';
import ViewModal from './ViewModal';
import { RiDeleteBin6Line, RiEdit2Line, RiEyeLine, RiMore2Fill } from 'react-icons/ri';
import Switch from './form/Switch';

function CRUDCard({ data }) {
    const sortDataByState = (data) => {
        return data.slice().sort((a, b) => b.state - a.state);
    };

    const [filteredData, setFilteredData] = useState(sortDataByState(data));
    const [currentPage, setCurrentPage] = useState(1);
    const [showFormModal, setShowFormModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleCreateClick = () => {
        setShowFormModal(true);
    };

    const handleSearch = (query) => {
        const filtered = data.filter(item =>
            item.id.includes(query) ||
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase()) ||
            item.status.toLowerCase().includes(query.toLowerCase()) 
        );

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

    const viewModalLayout = [
        ['name'],
        ['name', 'description'],
        ['name', 'state'],
        ['name', 'description', 'status'],
        ['state'],
    ];
    
    const startIndex = (currentPage - 1) * 6;
    const currentData = filteredData.slice(startIndex, startIndex + 6);

    return (
        <div>
            <div className="flex flex-col lg:flex-row justify-between items-center mb-1 gap-4">
                <div className="flex items-center gap-2">
                    <CreateButton onClick={handleCreateClick} />
                </div>
                <div className=" md:flex">
                    <ExportButton onClick={handleExportPDF} type="pdf" />
                    <ExportButton onClick={handleExportExcel} type="excel" />
                    <SearchBar onSearch={handleSearch} />
                </div>
            </div>
            {filteredData.length === 0 ? (
                <p className="text-center">No hay registros disponibles</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentData.map((item, index) => (
                        <div key={index} className={`bg-secondary-100 p-6 rounded-xl h-48 ${item.state ? '' : 'bg-secondary-100/50'}`}>
                            <div className="flex items-center justify-between">
                                <div className={`text-white text-xl font-bold ${item.state ? '' : 'opacity-50'}`}>{item.name.split(' ')[1]}</div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleViewButtonClick(item)}
                                        className="rounded-lg transition-colors text-white bg-secondary-100 hover:bg-secondary-500 p-2"
                                    >
                                        <RiEyeLine />
                                    </button>
                                    <button
                                        onClick={() => handleEditButtonClick(item)}
                                        className={`rounded-lg transition-colors text-white bg-secondary-100 ${item.state ? 'hover:bg-secondary-500' : 'opacity-50'} p-2`}
                                        disabled={!item.state}
                                    >
                                        <RiEdit2Line />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteButtonClick(item.id)}
                                        className={`rounded-lg transition-colors text-white bg-red-500 ${item.state ? 'hover:bg-red-700' : 'opacity-50'} p-2`}
                                        disabled={!item.state}
                                    >
                                        <RiDeleteBin6Line />
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-center h-full">
                                <p className={`text-gray-200 mb-2 text-center ${item.state ? '' : 'opacity-50'}`}>{item.description}</p>
                                <div className={`py-1 px-2 ${item.status === 'Abierto' ? 'bg-green-500/10 text-green-500' : item.status === 'En proceso' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'} ${item.state ? '' : 'opacity-50'} rounded-lg mb-2 text-center`}>{item.status}</div>
                                <Switch
                                        name="state"
                                        checked={item.state}
                                        onChange={(e) => handleSwitchChange(item.id, e.target.checked)}
                                    />
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <Pagination
                totalItems={filteredData.length}
                itemsPerPage={6}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
            />
            {showFormModal && (
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-50">
                    <FormModal onClose={() => setShowFormModal(false)} />
                </div>
            )}
            {showViewModal && selectedItem && (
                <ViewModal item={selectedItem} onClose={() => setShowViewModal(false)} viewModalLayout={viewModalLayout} />
            )}
        </div>
    );
}

export default CRUDCard;