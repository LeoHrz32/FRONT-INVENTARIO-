import React, { useState, useEffect } from 'react';
import { RiCloseLine, RiAddLine, RiPencilLine } from 'react-icons/ri';
import InputField from '../../components/form/InputField';
import CreateCancelButtons from '../../components/form/CreateCancelButtons';
import Heading from '../../components/form/Heading';
import Form from '../../components/form/Form';
import { useTablas } from '../../context/tablas/tablasContext';
import LoadingScreen from '../../components/LoadingScreen';
import { show_alert } from '../../components/alertFunctions';

const ModalTablaEditForm = ({ tabla, onClose }) => {
  const { updateTabla, columns } = useTablas();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ campos_add: [], campos_rename: [] });
  const [errors, setErrors] = useState({});

  console.log('📥 ModalTablaEditForm: tabla seleccionada:', tabla);
  console.log('📥 Columnas del contexto:', columns);

  useEffect(() => {
    if (tabla && Array.isArray(columns) && columns.length > 0) {
      console.log('✅ Inicializando campos de renombrado con columnas:', columns);
      setFormData({
        campos_add: [],
        campos_rename: columns.map(c => ({ antiguo: c.name, nuevo: c.name }))
      });
      setErrors({});
    }
  }, [tabla, columns]);

  const validateRename = (nuevo) => {
    if (!nuevo.trim()) return 'El nombre no puede estar vacío.';
    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(nuevo)) return 'Solo letras, números y guion bajo.';
    return '';
  };

  const validateAdd = (campo) => {
    if (!campo.trim()) return 'El nombre es obligatorio.';
    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(campo)) return 'Solo letras, números y guion bajo.';
    return '';
  };

  const setFieldError = (key, msg) => setErrors(prev => ({ ...prev, [key]: msg }));
  const clearFieldError = (key) => setErrors(prev => { const e = { ...prev }; delete e[key]; return e; });

  const handleAddCampo = () => {
    console.log('➕ Añadiendo campo vacío');
    setFormData(prev => ({ ...prev, campos_add: [...prev.campos_add, ''] }));
  };

  const handleCampoAddChange = (idx, value) => {
    const arr = [...formData.campos_add];
    arr[idx] = value;
    setFormData(prev => ({ ...prev, campos_add: arr }));
    const err = validateAdd(value);
    err ? setFieldError(`add_${idx}`, err) : clearFieldError(`add_${idx}`);
  };

  const handleRemoveCampoAdd = (idx) => {
    console.log('❌ Eliminando campo nuevo en índice', idx);
    setFormData(prev => ({ ...prev, campos_add: prev.campos_add.filter((_, i) => i !== idx) }));
    clearFieldError(`add_${idx}`);
  };

  const handleRenameChange = (idx, value) => {
    const arr = [...formData.campos_rename];
    arr[idx].nuevo = value;
    setFormData(prev => ({ ...prev, campos_rename: arr }));
    const err = validateRename(value);
    err ? setFieldError(`rename_${idx}`, err) : clearFieldError(`rename_${idx}`);
  };

  const hasErrors = () => Object.keys(errors).length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('📤 Enviando formData:', formData);
    if (hasErrors()) {
      show_alert('Corrige los errores antes de guardar.', 'error');
      console.log('❌ Errores en el formulario:', errors);
      return;
    }
    const payload = {
      nombre_tabla: tabla.nombre_tabla,
      campos_add: formData.campos_add.map(nombre => ({ nombre })),
      campos_rename: formData.campos_rename.filter(r => r.antiguo !== r.nuevo)
    };
    try {
      setLoading(true);
      await updateTabla(tabla.nombre_tabla, payload);
      show_alert(`Tabla actualizada correctamente.`, 'success');
      console.log('✅ Tabla actualizada con éxito');
      onClose();
    } catch (err) {
      console.error('🚨 Error al actualizar tabla:', err);
      show_alert('Error al actualizar la tabla.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    console.log('🛑 Cancelando edición');
    show_alert('Edición cancelada.', 'info');
    onClose();
  };

  if (!tabla) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-secondary-100 rounded-xl p-6 w-full max-w-lg overflow-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-4">
          <Heading level={1}>Editar <span className="text-primary">{tabla.nombre_tabla}</span></Heading>
          <button onClick={handleCancel} className="text-gray-400 hover:text-white">
            <RiCloseLine size={24} />
          </button>
        </div>
        <Form onSubmit={handleSubmit}>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Agregar Campos</span>
              <button type="button" onClick={handleAddCampo} className="text-green-500">
                <RiAddLine size={20} />
              </button>
            </div>
            {formData.campos_add.map((campo, idx) => (
              <div key={idx} className="flex items-center mb-2">
                <InputField
                  placeholder="nuevo_campo"
                  value={campo}
                  onChange={e => handleCampoAddChange(idx, e.target.value)}
                  icon={RiAddLine}
                />
                <button type="button" onClick={() => handleRemoveCampoAdd(idx)} className="ml-2 text-red-500">
                  <RiCloseLine size={20} />
                </button>
                {errors[`add_${idx}`] && <p className="text-red-500 ml-2">{errors[`add_${idx}`]}</p>}
              </div>
            ))}
          </div>

          <div className="mb-6">
            <span className="font-medium">Renombrar Campos</span>
            {formData.campos_rename.map((r, idx) => (
              <div key={idx} className="flex items-center mb-2">
                <span className="mr-2 font-mono bg-gray-200 px-2 py-1 rounded">{r.antiguo}</span>
                <InputField
                  value={r.nuevo}
                  onChange={e => handleRenameChange(idx, e.target.value)}
                  placeholder="nuevo_nombre"
                  icon={RiPencilLine}
                />
                {errors[`rename_${idx}`] && <p className="text-red-500 ml-2">{errors[`rename_${idx}`]}</p>}
              </div>
            ))}
          </div>

          <CreateCancelButtons
            name="Guardar Cambios"
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
