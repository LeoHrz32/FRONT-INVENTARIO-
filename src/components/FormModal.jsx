import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiSearchLine, RiSortDesc, RiPriceTag2Line, RiNumbersLine, RiCalendar2Line, RiCheckDoubleLine, RiFontColor, RiCalendarEventLine, RiTimeLine, RiPhoneLine } from 'react-icons/ri';
import InputField from './form/InputField';
import TextArea from './form/TextArea';
import FormLabel from './form/FormLabel';
import CreateCancelButtons from './form/CreateCancelButtons';
import Heading from './form/Heading';
import DivForm1 from './form/DivForm1';
import DivForm2 from './form/DivForm2';
import UnifiedInputSelect from './form/UnifiedInputSelect';
import Form from './form/Form';
import SelectForm from './form/SelectForm';
import VerticalTabs from './form/VerticalTabs'; // Importa los componentes de pestañas verticales

const FormModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState(1);
  const [formData, setFormData] = useState({
    nombre: '',
    cantidad: '',
    telefono: '',
    descripcion: '',
    semana: '',
    mes: '',
    fecha: '',
    hora: '',
    fechaHora: '',
    check1: false,
    check2: false,
    check3: false,
    rango: '',
    color: '',
    archivo: '',
    select1: '',
    select2: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleCreate = () => {
    console.log("Create button clicked");
    // Lógica para crear algo
  };

  return (
    <div className="fixed inset-0 justify-center items-center z-50 w-max-[90%] bg-gray-900 bg-opacity-50 overflow-auto">
      <div>
        <DivForm1>
          <div className="flex">
            <VerticalTabs
              tabs={[
                { id: 1, title: "Detalles" },
                { id: 2, title: "Opciones" },
                { id: 3, title: "Preferencias" },
                { id: 4, title: "Checkboxes" },
              ]}
              activeTab={activeTab}
              onTabClick={(tabId) => setActiveTab(tabId)}
            />
            <DivForm2>
              <Heading level={1}>
                Crear <span className="text-primary">Algo</span>
              </Heading>
              <Form>
                {activeTab === 1 && (
                  <>
                    <FormLabel label="Nombre">
                      <InputField type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" icon={RiPriceTag2Line} />
                    </FormLabel>
                    <FormLabel label="Cantidad">
                      <InputField type="number" name="cantidad" value={formData.cantidad} onChange={handleChange} placeholder="Cantidad" icon={RiNumbersLine} />
                    </FormLabel>
                    <FormLabel label="Teléfono">
                      <InputField type="tel" name="telefono" value={formData.telefono} onChange={handleChange} placeholder="Teléfono" icon={RiPhoneLine} />
                    </FormLabel>
                    <FormLabel label="Descripción">
                      <TextArea name="descripcion" value={formData.descripcion} onChange={handleChange} placeholder="Descripción" icon={RiSortDesc} />
                    </FormLabel>
                  </>
                )}
                {activeTab === 2 && (
                  <>
                    <FormLabel label="Semana">
                      <InputField type="week" name="semana" value={formData.semana} onChange={handleChange} icon={RiCalendarEventLine} />
                    </FormLabel>
                    <FormLabel label="Mes">
                      <InputField type="month" name="mes" value={formData.mes} onChange={handleChange} icon={RiCalendarEventLine} />
                    </FormLabel>
                    <FormLabel label="Fecha">
                      <InputField type="date" name="fecha" value={formData.fecha} onChange={handleChange} icon={RiCalendar2Line} />
                    </FormLabel>
                    <FormLabel label="Hora">
                      <InputField type="time" name="hora" value={formData.hora} onChange={handleChange} icon={RiTimeLine} />
                    </FormLabel>
                    <FormLabel label="Fecha y hora">
                      <InputField type="datetime-local" name="fechaHora" value={formData.fechaHora} onChange={handleChange} icon={RiCalendarEventLine} />
                    </FormLabel>
                  </>
                )}
                {activeTab === 3 && (
                  <>
                    <FormLabel label="Check">
                      <InputField type="checkbox" name="check1" checked={formData.check1} onChange={handleChange} icon={RiCheckDoubleLine} />
                      <InputField type="checkbox" name="check2" checked={formData.check2} onChange={handleChange} icon={RiCheckDoubleLine} />
                      <InputField type="checkbox" name="check3" checked={formData.check3} onChange={handleChange} icon={RiCheckDoubleLine} />
                    </FormLabel>
                    <FormLabel label="Rango">
                      <InputField type="range" name="rango" value={formData.rango} onChange={handleChange} />
                    </FormLabel>
                    <FormLabel label="Color">
                      <InputField type="color" name="color" value={formData.color} onChange={handleChange} icon={RiFontColor} />
                    </FormLabel>
                    <FormLabel label="Archivo">
                      <InputField type="file" name="archivo" value={formData.archivo} onChange={handleChange} />
                    </FormLabel>
                  </>
                )}
                {activeTab ===
                  4 && (
                    <>
                      <FormLabel label="Select">
                        <SelectForm
                          options={[
                            { value: 'option1', label: 'Option 1' },
                            { value: 'option2', label: 'Option 2' },
                            { value: 'option3', label: 'Option 3' },
                          ]}
                          placeholder="Seleccione una opción"
                          icon={RiSearchLine}
                          onChange={handleChange} // optional: only needed if you want to control the selected value
                        />
                      </FormLabel>
                      <FormLabel label="Select">
                        <UnifiedInputSelect
                          options={[
                            { value: 'text', label: 'Valentina' },
                            { value: 'number', label: 'es una' },
                            { value: 'email', label: 'bandida' },
                          ]}
                          placeholderSelect="Select an option"
                          placeholderInput="Cantidad o lo que sea"
                          inputType="number"
                        />
                      </FormLabel>
                    </>
                  )}
                <CreateCancelButtons
                  name={activeTab === 4 ? 'Crear' : 'Continuar'}
                  onCreate={activeTab === 4 ? handleCreate : () => setActiveTab(activeTab + 1)}
                  onCancel={onClose}
                />
              </Form>
              <span className="flex items-center justify-center gap-2">
                Así como cuando se te olvida el pasguor{' '}
                <Link to="/login" className="text-primary hover:text-gray-100 transition-colors">
                  LA URL
                </Link>
              </span>
            </DivForm2>
          </div>
        </DivForm1>
      </div>
    </div>
  );
};

export default FormModal;