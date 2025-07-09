import React, { useEffect, useState } from "react";
import { useRegistros } from "../../context/registros/registrosContext";
import Table from "../../components/table/Table";
import TableHead from "../../components/table/TableHead";
import TableBody from "../../components/table/TableBody";
import TableRow from "../../components/table/TableRow";
import TableCell from "../../components/table/TableCell";
import Pagination from "../../components/table/Pagination";
import {
    CreateButton,
    SearchBar,
    ItemsPerPageSelect,
} from "../../components/table/TopBarElements";
import ModalCrearRegistro from "./registrosCreate";
import ModalEditarRegistro from "./registrosEdit";
import ModalViewRegistro from "./registrosView";
import { RiDeleteBin6Line, RiEdit2Line, RiEyeLine } from "react-icons/ri";

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
    } = useRegistros();

    // Local state
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [showModalCrear, setShowModalCrear] = useState(false);
    const [showModalEditar, setShowModalEditar] = useState(false);
    const [showModalView, setShowModalView] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");

    // Effect: update filteredData when registros or searchQuery changes
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

    // Load tablas on mount
    useEffect(() => {
        obtenerTablas();
    }, []);

    // Load registros when tablaSeleccionada changes
    useEffect(() => {
        if (tablaSeleccionada) {
            obtenerRegistros(tablaSeleccionada);
        }
    }, [tablaSeleccionada]);

    // Handle messages and errors
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

    // Pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="pb-4 overflow-y-auto">
            <div className="flex flex-col lg:flex-row justify-between items-center mb-4 gap-4">
                {/* Selector de tabla */}
                <select
                    value={tablaSeleccionada || ""}
                    onChange={(e) => setTablaSeleccionada(e.target.value)}
                    className="form-select w-auto"
                >
                    <option value="">-- Elige tabla --</option>
                    {tablas.map((t) => (
                        <option key={t} value={t}>{t}</option>
                    ))}
                </select>

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
                        {Object.keys(currentData[0]).map((col) => (
                            <TableCell key={col}>{col}</TableCell>
                        ))}
                        <TableCell>Acciones</TableCell>
                    </TableHead>
                    <TableBody>
                        {currentData.map((fila, idx) => (
                            <TableRow key={idx}>
                                {Object.values(fila).map((val, j) => (
                                    <TableCell key={j}>{val}</TableCell>
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
                    tabla={tablaSeleccionada}
                    onClose={() => setShowModalCrear(false)}
                    onSave={(data) => crearRegistro(tablaSeleccionada, data)}
                />
            )}

            {showModalEditar && (
                <ModalEditarRegistro
                    tabla={tablaSeleccionada}
                    registro={registroSeleccionado}
                    onClose={() => setShowModalEditar(false)}
                    onSave={(data) => actualizarRegistro(tablaSeleccionada, registroSeleccionado.id, data)}
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
