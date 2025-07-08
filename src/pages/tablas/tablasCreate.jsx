import React, { useState } from 'react';
import { RiTableLine, RiAddLine, RiCloseLine } from "react-icons/ri";
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

// Modal para crear una tabla dinámica
const ModalTablaCreateForm = ({ onClose }) => {
  const { createTabla } = useTablas();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nombre_tabla: '',
    campos: ['']
  });
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    if (name === 'nombre_tabla') {
      if (!value.trim()) return 'El nombre de tabla es obligatorio.';
      if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(value)) return 'Nombre inválido.';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleCampoChange = (index, value) => {
    const nuevos = [...formData.campos];
    nuevos[index] = value;
    setFormData({ ...formData, campos: nuevos });
  };

  const addCampo = () => {
    setFormData(prev => ({ ...prev, campos: [...prev.campos, ''] }));
  };

  const removeCampo = (index) => {
    const nuevos = formData.campos.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, campos: nuevos }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const tempErrors = {};

    // Validar nombre_tabla
    const errName = validateField('nombre_tabla', formData.nombre_tabla);
    if (errName) tempErrors.nombre_tabla = errName;

    // Validar campos
    formData.campos.forEach((campo, idx) => {
      if (!campo.trim()) tempErrors[`campo_${idx}`] = 'El nombre de campo es obligatorio.';
      else if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(campo)) tempErrors[`campo_${idx}`] = 'Nombre inválido.';
    });

    setErrors(tempErrors);
    if (Object.keys(tempErrors).length) return;

    setLoading(true);
    try {
      const payload = {
        nombre_tabla: formData.nombre_tabla,
        campos: formData.campos.map(nombre => ({ nombre }))
      };
      await createTabla(payload);
      show_alert(`Tabla ${formData.nombre_tabla} creada correctamente.`, 'success');
      onClose();
    } catch {
      // createTabla ya maneja errores
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    show_alert('Creación cancelada.', 'error');
    onClose();
  };

  return (
    <>
      <div className="absolute inset-0 flex justify-center items-center z-50 bg-gray-900 bg-opacity-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-lg">
          <div className="flex justify-between items-center mb-4">
            <Heading level={1}>Crear <span className="text-primary">Tabla</span></Heading>
            <button onClick={handleCancel} className="text-gray-400 hover:text-black">
              <RiCloseLine size={24} />
            </button>
          </div>
          <Form onSubmit={handleCreate}>
            <FormLabel label={<span>Nombre de Tabla <span className="text-red-500">*</span></span>}>
              <InputField
                type="text"
                name="nombre_tabla"
                placeholder="e.g. inventario_equipos"
                value={formData.nombre_tabla}
                onChange={handleChange}
                icon={RiTableLine}
              />
              {errors.nombre_tabla && <p className="text-red-500">{errors.nombre_tabla}</p>}
            </FormLabel>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Campos <span className="text-red-500">*</span></span>
                <button type="button" onClick={addCampo} className="text-green-500">
                  <RiAddLine size={20} />
                </button>
              </div>
              {formData.campos.map((campo, idx) => (
                <div key={idx} className="flex items-center mb-2">
                  <InputField
                    type="text"
                    name={`campo_${idx}`}
                    placeholder="nombre_campo"
                    value={campo}
                    onChange={e => handleCampoChange(idx, e.target.value)}
                    icon={RiUserLine}
                  />
                  <button type="button" onClick={() => removeCampo(idx)} className="ml-2 text-red-500">
                    <RiCloseLine size={20} />
                  </button>
                  {errors[`campo_${idx}`] && <p className="text-red-500 ml-2">{errors[`campo_${idx}`]}</p>}
                </div>
              ))}
            </div>

            <CreateCancelButtons name='Crear Tabla' onCreate={handleCreate} onCancel={handleCancel} />
          </Form>
        </div>
      </div>
      {loading && <LoadingScreen />}
    </>
  );
};

export default ModalTablaCreateForm;
