import React, { useState, useEffect } from 'react';
import { RiCloseLine, RiAddLine, RiPencilLine } from 'react-icons/ri';
import InputField from '../../components/form/InputField';
import FormLabel from '../../components/form/FormLabel';
import CreateCancelButtons from '../../components/form/CreateCancelButtons';
import Heading from '../../components/form/Heading';
import DivForm1 from '../../components/form/DivForm1';
import DivForm2 from '../../components/form/DivForm2';
import Form from '../../components/form/Form';
import { useTablas } from "../../context/tablas/tablasContext";

import LoadingScreen from '../../components/LoadingScreen';
import { show_alert } from '../../components/alertFunctions';

// Modal para editar una tabla dinámica
const ModalTablaEditForm = ({ onClose, tabla, onSave }) => {
  const { updateTabla } = useTablas();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ campos_add: [''], campos_drop: [], campos_rename: [] });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (tabla) {
      // Inicialización de formData basado en tabla existente
      setFormData({ campos_add: [], campos_drop: [], campos_rename: tabla.columns.map(c => ({ antiguo: c.name, nuevo: c.name })) });
    }
  }, [tabla]);

  // Agregar nuevo campo
  const handleAddCampo = () => setFormData(prev => ({ ...prev, campos_add: [...prev.campos_add, ''] }));
  const handleCampoAddChange = (idx, value) => {
    const arr = [...formData.campos_add];
    arr[idx] = value;
    setFormData(prev => ({ ...prev, campos_add: arr }));
  };
  const handleRemoveCampoAdd = (idx) => setFormData(prev => ({ ...prev, campos_add: prev.campos_add.filter((_, i) => i !== idx) }));

  // Marcar/desmarcar campo para eliminar
  const handleDropChange = (columnName, checked) => {
    const arr = checked
      ? [...formData.campos_drop, columnName]
      : formData.campos_drop.filter(c => c !== columnName);
    setFormData(prev => ({ ...prev, campos_drop: arr }));
  };

  // Cambiar nombre de campo
  const handleRenameChange = (idx, value) => {
    const arr = [...formData.campos_rename];
    arr[idx].nuevo = value;
    setFormData(prev => ({ ...prev, campos_rename: arr }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateTabla(tabla.nombre_tabla, formData);
      show_alert(`Tabla ${tabla.nombre_tabla} actualizada correctamente.`, 'success');
      onSave();
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    show_alert('Edición de tabla cancelada.', 'info');
    onClose();
  };

  if (!tabla) return null;

  return (
    <div className="absolute inset-0 flex justify-center items-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <Heading level={1}>Editar <span className="text-primary">{tabla.nombre_tabla}</span></Heading>
          <button onClick={handleCancel} className="text-gray-400 hover:text-black">
            <RiCloseLine size={24} />
          </button>
        </div>
        <Form onSubmit={handleSubmit}>
          {/* Sección: Agregar Campos */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Agregar Campos</span>
              <button type="button" onClick={handleAddCampo} className="text-green-500"><RiAddLine size={20} /></button>
            </div>
            {formData.campos_add.map((campo, idx) => (
              <div key={idx} className="flex items-center mb-2">
                <InputField
                  value={campo}
                  onChange={e => handleCampoAddChange(idx, e.target.value)}
                  placeholder="nuevo_campo"
                />
                <button onClick={() => handleRemoveCampoAdd(idx)} className="ml-2 text-red-500"><RiCloseLine size={20} /></button>
              </div>
            ))}
          </div>

          {/* Sección: Eliminar Campos */}
          <div className="mb-4">
            <span className="font-medium">Eliminar Campos</span>
            {tabla.columns.map((c, idx) => (
              <div key={idx} className="flex items-center">
                <input
                  type="checkbox"
                  onChange={e => handleDropChange(c.name, e.target.checked)}
                />
                <label className="ml-2">{c.name}</label>
              </div>
            ))}
          </div>

          {/* Sección: Renombrar Campos */}
          <div className="mb-4">
            <span className="font-medium">Renombrar Campos</span>
            {formData.campos_rename.map((r, idx) => (
              <div key={idx} className="flex items-center mb-2">
                <span className="mr-2">{r.antiguo}</span>
                <InputField
                  value={r.nuevo}
                  onChange={e => handleRenameChange(idx, e.target.value)}
                  placeholder="nuevo_nombre"
                />
              </div>
            ))}
          </div>

          <CreateCancelButtons
            name='Guardar Cambios'
            onCreate={handleSubmit}
            onCancel={handleCancel}
          />
        </Form>
      </div>
      {loading && <LoadingScreen />}
    </div>
  );
};

export default ModalTablaEditForm;
