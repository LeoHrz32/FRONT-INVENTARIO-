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
import ModalUserCreateForm from './userCreate';
import ModalUserEditForm from './userEdit';
import ModalUserView from './userView';
import { useUsers } from '../../context/users/usersContext';
import LoadingScreen from '../../components/LoadingScreen';
import { RiDeleteBin6Line, RiEdit2Line, RiEyeLine } from 'react-icons/ri';

// import Switch from '../../components/form/Switch';
import { showAlert, show_alert } from '../../components/alertFunctions';

function UserTable() {

    const sortDataByState = (arr) => {
        if (!Array.isArray(arr)) return [];
        return arr.slice().sort((a, b) => {
            if (!a.state && b.state) return 1;
            if (a.state && !b.state) return -1;
            return 0;
        });
    };


    const { users, deleteUser, getUsers, messages,
        clearMessages, clearErrors, errors } = useUsers();
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [showModalForm, setShowModalForm] = useState(false);
    const [showModalView, setShowModalView] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setFilteredData(sortDataByState(users));
    }, [users]);

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
        ['str_name_user', 'str_email'],
        ['str_password']
    ];

    const handleViewButtonClick = (user) => {
        setSelectedUser(user);
        setShowModalView(true);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    useEffect(() => {
        if (!Array.isArray(users)) {
            console.error("❌ users no es un array:", users);
            return;
        }

        const filtered = users.filter(user =>
            user.str_name_user?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.str_email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.str_password?.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setFilteredData(sortDataByState(filtered));
    }, [searchQuery, users]);


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



    const handleEditButtonClick = (user) => {
        if (user) {
            setSelectedUser(user);
            setShowModalForm(true);
            setIsCreating(false);
        }
    };


    const handleDeleteButtonClick = async (id) => {
        try {
            showAlert({
                title: '¿Seguro de eliminar el usuario?',
                icon: 'question',
                text: 'No se podrá dar marcha atrás',
                showCancelButton: true,
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            },
                async () => {
                    try {
                        await deleteUser(id);
                        show_alert('Usuario eliminado correctamente', 'success');
                    } catch (error) {
                        console.error("Error al eliminar Usuario:", error);
                        show_alert('Error al eliminar el Usuario', 'error');
                    }
                },
                () => {
                    show_alert('El Usuario NO fue eliminado', 'error');
                });
        } catch (error) {
            console.error("Error en handleDeleteButtonClick:", error);
            show_alert('Ocurrió un error al intentar eliminar el Usuario', 'error');
        }
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
            {!Array.isArray(users) || currentData.length === 0 ? (
                <p className="text-center">No hay registros disponibles</p>
            ) : (
                <Table>
                    <TableHead>
                        <TableCell>Nombre del usuario</TableCell>
                        <TableCell>Correo</TableCell>
                        <TableCell>Contraseña</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableHead>
                    <TableBody>
                        {currentData.map((user, index) => (
                            <TableRow key={index}>
                                <TableCell>{user.str_name_user}</TableCell>
                                <TableCell>{user.str_email}</TableCell>
                                <TableCell>{user.str_password}</TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleViewButtonClick(user)}
                                            className="rounded-lg transition-colors text-white bg-secondary-100 hover:bg-secondary-500 p-2"
                                        >
                                            <RiEyeLine />
                                        </button>
                                        <button
                                            onClick={() => handleEditButtonClick(user)}
                                            className="rounded-lg transition-colors text-white bg-secondary-100 hover:bg-secondary-500 p-2">
                                            <RiEdit2Line />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteButtonClick(user.id)}
                                            className={`rounded-lg transition-colors text-white bg-red-500  p-2`}
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
                        <ModalUserCreateForm onClose={() => setShowModalForm(false)} />
                    ) : (
                        <ModalUserEditForm user={selectedUser} onClose={() => setShowModalForm(false)} />
                    )}
                </div>
            )}
            {showModalView && (
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-50">
                    <ModalUserView user={selectedUser} onClose={() => setShowModalView(false)} viewModalLayout={viewModalLayout} />
                </div>
            )}
            {loading && <LoadingScreen />}

        </div>
    );
}

export default UserTable;