import React, { useEffect, useState, useMemo } from "react";
import { useRegistros } from "../../context/registros/registrosContext";
import Table from "../../components/table/Table";
import TableHead from "../../components/table/TableHead";
import TableBody from "../../components/table/TableBody";
import TableRow from "../../components/table/TableRow";
import TableCell from "../../components/table/TableCell";
import Pagination from "../../components/table/Pagination";
import { CreateButton, SearchBar, ItemsPerPageSelect } from "../../components/table/TopBarElements";
import ModalCrearRegistro from "./registrosCreate";
import ModalEditarRegistro from "./registrosEdit";
import ModalViewRegistro from "./registrosView";
import { RiDeleteBin6Line, RiEdit2Line, RiEyeLine } from "react-icons/ri";
import SelectForm from "../../components/form/SelectForm";

const MAX_COLUMNAS_VISIBLES = 5;

const RegistrosPage = () => {
    const {
        tablas,
        tablaSeleccionada,
        setTablaSeleccionada,
        obtenerTablas,
        registros,
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
        schema,
    } = useRegistros();

    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [showModalCrear, setShowModalCrear] = useState(false);
    const [showModalEditar, setShowModalEditar] = useState(false);
    const [showModalView, setShowModalView] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const selectOptions = useMemo(
        () => tablas.map((t) => ({ label: t, value: t })),
        [tablas]
    );

    useEffect(() => {
        let data = Array.isArray(registros) ? registros : [];
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            data = data.filter((item) =>
                Object.values(item).some((val) =>
                    String(val).toLowerCase().includes(q)
                )
            );
        }
        setFilteredData(data);
        setCurrentPage(1);
    }, [registros, searchQuery]);

    useEffect(() => {
        obtenerTablas();
    }, []);

    useEffect(() => {
        if (mensajes.length) {
            alert(mensajes[0]);
            limpiarMensajes();
        }
        if (errores.length) {
            alert(errores[0]);
            limpiarErrores();
        }
    }, [mensajes, errores]);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    const columnas = currentData.length > 0 ? Object.keys(currentData[0]) : [];
    const columnasVisibles = columnas.slice(0, MAX_COLUMNAS_VISIBLES);

    const selectStyles = {
        control: (base) => ({
            ...base,
            backgroundColor: '#1f1f1f',
            color: '#ffffff',
            border: 'none',
            boxShadow: 'none',
            '&:hover': { borderColor: '#009a44' },
            '&:focus-within': { outline: 'none', boxShadow: 'none' },
        }),
        singleValue: (base) => ({ ...base, color: '#ffffff' }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? '#009a44' : '#1f1f1f',
            color: '#ffffff',
            cursor: 'pointer',
        }),
    };

    return (
        <div className="pb-4 overflow-y-auto">
            <div className="flex flex-col lg:flex-row justify-between items-center mb-4 gap-4">
                {tablas.length > 0 && (
                    <div className="w-full lg:w-1/3">
                        <SelectForm
                            key={tablas.length}
                            options={selectOptions}
                            placeholder="-- Elige tabla --"
                            value={
                                tablaSeleccionada
                                    ? { label: tablaSeleccionada, value: tablaSeleccionada }
                                    : null
                            }
                            onChange={(op) => setTablaSeleccionada(op.value)}
                            bgColor="#00aa4d"
                            isDisabled={tablas.length === 0}
                            menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
                            menuPosition="fixed"
                            styles={{ ...selectStyles, menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                        />
                    </div>
                )}

                <div className="flex gap-2">
                    <CreateButton onClick={() => setShowModalCrear(true)} disabled={!tablaSeleccionada} />
                    <SearchBar onSearch={(q) => setSearchQuery(q)} />
                    <ItemsPerPageSelect value={itemsPerPage} onChange={(v) => setItemsPerPage(v)} />
                </div>
            </div>

            {!tablaSeleccionada ? (
                <p className="text-center">Selecciona una tabla para ver sus registros.</p>
            ) : currentData.length === 0 ? (
                <p className="text-center">No hay registros disponibles.</p>
            ) : (
                <Table>
                    <TableHead>
                        {columnasVisibles.map((col) => (
                            <TableCell key={col}>{col}</TableCell>
                        ))}
                        <TableCell>Acciones</TableCell>
                    </TableHead>
                    <TableBody>
                        {currentData.map((fila, idx) => (
                            <TableRow key={idx}>
                                {columnasVisibles.map((col, j) => (
                                    <TableCell key={j}>{fila[col]}</TableCell>
                                ))}
                                <TableCell>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => {
                                                obtenerRegistroPorId(tablaSeleccionada, fila.id);
                                                setShowModalView(true);
                                            }}
                                            className="p-2 rounded bg-secondary-100 hover:bg-secondary-500 text-white"
                                        >
                                            <RiEyeLine />
                                        </button>
                                        <button
                                            onClick={() => {
                                                obtenerRegistroPorId(tablaSeleccionada, fila.id);
                                                setShowModalEditar(true);
                                            }}
                                            className="p-2 rounded bg-secondary-100 hover:bg-secondary-500 text-white"
                                        >
                                            <RiEdit2Line />
                                        </button>
                                        <button
                                            onClick={() => eliminarRegistro(tablaSeleccionada, fila.id)}
                                            className="p-2 rounded bg-red-500 text-white"
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
            )}

            {/* Modales */}
            {showModalCrear && (
                <ModalCrearRegistro
                    tableName={tablaSeleccionada}
                    schema={schema}
                    onClose={() => setShowModalCrear(false)}
                    onSave={(data) => crearRegistro(tablaSeleccionada, data)}
                />
            )}

            {showModalEditar && (
                <ModalRegistroEditForm
                    tableName={tableName}
                    schema={schema}
                    registro={registroSeleccionado}
                    onClose={onClose}
                />
            )}

            {showModalView && (
                <ModalViewRegistro
                    registro={registroSeleccionado}
                    onClose={() => setShowModalView(false)}
                />
            )}
        </div>
    );
};

export default RegistrosPage;
