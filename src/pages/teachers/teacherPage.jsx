import React, { useState, useEffect } from 'react';
import Table from '../../components/table/Table';
import TableHead from '../../components/table/TableHead';
import TableBody from '../../components/table/TableBody';
import TableRow from '../../components/table/TableRow';
import TableCell from '../../components/table/TableCell';
import Pagination from '../../components/table/Pagination';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import 'jspdf-autotable';
import { CreateButton, ExportButton, SearchBar, ItemsPerPageSelect } from '../../components/table/TopBarElements';
import ModalTeacherCreateForm from './teacherCreate';
import ModalTeacherEditForm from './teacherEdit';
import ModalTeacherView from './teacherView';
import { useTeachers } from '../../context/teachers/teachersContext';
import LoadingScreen from '../../components/LoadingScreen';
import { RiDeleteBin6Line, RiEdit2Line, RiEyeLine } from 'react-icons/ri';

import Switch from '../../components/form/Switch';
import { showAlert, show_alert } from '../../components/alertFunctions';

function TeacherTable() {
    const sortDataByState = (teachers) => {
        return teachers.slice().sort((a, b) => {
            if (!a.state && b.state) return 1;
            if (a.state && !b.state) return -1;
            return 0;
        });
    };

    const { teachers, deleteTeacher, toggleTeacherStatus, getTeachers, messages,
        clearMessages, clearErrors, errors } = useTeachers();
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [showModalForm, setShowModalForm] = useState(false);
    const [showModalView, setShowModalView] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setFilteredData(sortDataByState(teachers));
    }, [teachers]);

    const handleCreateClick = () => {
        setShowModalForm(true);
        setIsCreating(true);
    };


    useEffect(() => {
        if (messages.length > 0) {
            show_alert(messages[0], 'success');
            clearMessages();
        }
        if (errors.length > 0) {
            show_alert(errors[0], 'error');
            clearErrors();
        }
    }, [messages, errors, clearMessages, clearErrors]);


    const viewModalLayout = [
        ['documentType', 'documentNumber'],
        ['firstName', 'lastName'],
        ['location', 'phoneNumber'],
        ['profession', 'area'],
        ['thematic', 'state']
    ];

    const handleViewButtonClick = (teacher) => {
        setSelectedTeacher(teacher);
        setShowModalView(true);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    useEffect(() => {
        const filtered = teachers.filter(teacher =>
            teacher.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            teacher.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            teacher.profession.toLowerCase().includes(searchQuery.toLowerCase()) ||
            teacher.documentNumber.toString().includes(searchQuery) ||
            teacher.phoneNumber.toString().includes(searchQuery)
        );
        setFilteredData(sortDataByState(filtered));
    }, [searchQuery, teachers]);

    const handleExportPDF = () => {
        const doc = new jsPDF();

        // Títulos de las columnas
        const columns = [
            { header: 'Documento', dataKey: 'documentNumber' },
            { header: 'Nombres y Apellidos', dataKey: 'fullName' },
            { header: 'Profesión', dataKey: 'profession' },
            { header: 'Teléfono', dataKey: 'phoneNumber' },
            { header: 'Ubicación', dataKey: 'location' },
            { header: 'Tipo de Documento', dataKey: 'documentType' },
            { header: 'Estado', dataKey: 'state' },
            { header: 'Área', dataKey: 'area' },
            { header: 'Temática', dataKey: 'thematic' },
        ];

        // Prepara los datos para el PDF
        const exportData = teachers.map(({
            documentNumber,
            firstName,
            lastName,
            profession,
            phoneNumber,
            location,
            documentType,
            state,
            area,
            thematic,
        }) => ({
            documentNumber,
            fullName: `${firstName} ${lastName}`,
            profession,
            phoneNumber,
            location,
            documentType,
            state: state ? 'Activo' : 'Inactivo', // Mostrar como Activo/Inactivo
            area,
            thematic,
        }));

        // Genera la tabla en el PDF
        autoTable(doc, {
            head: [columns.map(col => col.header)],
            body: exportData.map(row => columns.map(col => row[col.dataKey])),
        });

        // Guarda el PDF
        doc.save('Profesores.pdf');
    };

    const handleExportExcel = () => {
        const exportData = teachers.map(({
            documentNumber,
            firstName,
            lastName,
            profession,
            phoneNumber,
            location,
            documentType,
            state, // true o false
            area,
            thematic,
        }) => ({
            Documento: documentNumber,
            'Nombres y Apellidos': `${firstName} ${lastName}`,
            Profesión: profession,
            Teléfono: phoneNumber,
            Ubicación: location,
            'Tipo de Documento': documentType,
            Estado: state ? 'Activo' : 'Inactivo', // Mostrar el estado como Activo/Inactivo
            Área: area,
            Temática: thematic,
        }));

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Profesores');
        XLSX.writeFile(workbook, 'Profesores.xlsx');
    };



    const handleEditButtonClick = (teacher) => {
        if (teacher.state === true) {
            setSelectedTeacher(teacher);
            setShowModalForm(true);
            setIsCreating(false);
        }
    };


    const handleDeleteButtonClick = async (id) => {
        try {
            showAlert({
                title: '¿Seguro de eliminar el profesor?',
                icon: 'question',
                text: 'No se podrá dar marcha atrás',
                showCancelButton: true,
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            },
                async () => {
                    try {
                        await deleteTeacher(id);
                        show_alert('Profesor eliminado correctamente', 'success');
                    } catch (error) {
                        console.error("Error al eliminar Profesor:", error);
                        show_alert('Error al eliminar el Profesor', 'error');
                    }
                },
                () => {
                    show_alert('El Profesor NO fue eliminado', 'error');
                });
        } catch (error) {
            console.error("Error en handleDeleteButtonClick:", error);
            show_alert('Ocurrió un error al intentar eliminar el Profesor', 'error');
        }
    };

    const handleSwitchChange = async (id, isChecked) => {
        const newState = isChecked ? true : false;

        showAlert({
            title: '¿Seguro de cambiar el estado?',
            text: `El estado será cambiado a ${newState}.`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, cambiar',
            cancelButtonText: 'Cancelar'
        },
            async () => {
                try {
                    await toggleTeacherStatus(id, newState);
                    const updatedData = teachers.map(teacher =>
                        teacher._id === id ? { ...teacher, state: newState } : teacher
                    );
                    setFilteredData(sortDataByState(updatedData));
                    show_alert(`Estado cambiado a ${newState}`, 'success');
                    show_alert('Estado del instructor cambiado correctamente', 'success');
                } catch (error) {
                    show_alert('El estado no ha sido cambiado', 'info');
                }
            },
            () => {
                show_alert('El estado no ha sido cambiado', 'info');
            });
    };

    const handleItemsPerPageChange = (newValue) => {
        setItemsPerPage(newValue);
        setCurrentPage(1);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className='pb-4 overflow-y-auto'>
            <div className="flex lg:flex-row justify-between items-center mb-1 gap-4">
                <div className="flex">
                    <CreateButton onClick={() => handleCreateClick()} />
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
                <Table>
                    <TableHead>
                        <TableCell>Documento</TableCell>
                        <TableCell>Nombres y Apellidos</TableCell>
                        <TableCell>Profesión</TableCell>
                        <TableCell>Teléfono</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableHead>
                    <TableBody>
                        {currentData.map((teacher, index) => (
                            <TableRow key={index} isActive={teacher.state === true}>
                                <TableCell className={`${teacher.state === true ? '' : 'opacity-50'}`}>{teacher.documentNumber}</TableCell>
                                <TableCell className={`${teacher.state === true ? '' : 'opacity-50'}`}>{`${teacher.firstName} ${teacher.lastName}`}</TableCell>
                                <TableCell className={`${teacher.state === true ? '' : 'opacity-50'}`} truncate>{teacher.profession}</TableCell>
                                <TableCell className={`${teacher.state === true ? '' : 'opacity-50'}`}>{teacher.phoneNumber}</TableCell>
                                <TableCell>
                                    <Switch
                                        checked={teacher.state === true}
                                        onChange={(e) => handleSwitchChange(teacher._id, e.target.checked)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <button

                                            onClick={() => handleViewButtonClick(teacher)}
                                            className="rounded-lg transition-colors text-white bg-secondary-100 hover:bg-secondary-500 p-2"
                                        >
                                            <RiEyeLine />
                                        </button>
                                        <button
                                            onClick={() => handleEditButtonClick(teacher)}
                                            className={`rounded-lg transition-colors text-white bg-secondary-100 ${teacher.state === true ? 'hover:bg-secondary-500' : 'bg-secondary-100/50 opacity-50'} p-2`}
                                            disabled={teacher.state === false}
                                        >
                                            <RiEdit2Line />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteButtonClick(teacher._id)}
                                            className={`rounded-lg transition-colors text-white bg-red-500 ${teacher.state === true ? 'hover:bg-red-700' : 'opacity-50'} p-2`}
                                            disabled={teacher.state === false}
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
                        itemsPerPage={5}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                    />
                </Table>
            )}
            {showModalForm && (
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-50">
                    {isCreating ? (
                        <ModalTeacherCreateForm onClose={() => setShowModalForm(false)} />
                    ) : (
                        <ModalTeacherEditForm teacher={selectedTeacher} onClose={() => setShowModalForm(false)} />
                    )}
                </div>
            )}
            {showModalView && (
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-50">
                    <ModalTeacherView teacher={selectedTeacher} onClose={() => setShowModalView(false)} viewModalLayout={viewModalLayout} />
                </div>
            )}
            {loading && <LoadingScreen />}

        </div>
    );
}

export default TeacherTable;