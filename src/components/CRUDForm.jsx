import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiSearchLine, RiMailLine, RiUserLine, RiDraftLine, RiSortAsc, RiNumbersLine, RiPriceTag2Line, RiSortDesc, RiCalendar2Line, RiCheckDoubleLine, RiFontColor, RiCalendarEventLine, RiTimeLine, RiPhoneLine } from "react-icons/ri";
import InputField from "./form/InputField";
import TextArea from "./form/TextArea";
import FormLabel from "./form/FormLabel";
import CreateCancelButtons from "./form/CreateCancelButtons";
import Heading from "./form/Heading";
import DivForm1 from "./form/DivForm1";
import DivForm2 from "./form/DivForm2";
import Form from "./form/Form";
import SelectForm from "./form/SelectForm";
import Switch from "./form/Switch";

const CRUDForm = () => {
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
    switch1: false,
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
    console.log("Create button clicked", formData);
    // Lógica para crear algo
  };

  const handleCancel = () => {
    console.log("Cancel button clicked");
    // Lógica para cancelar la acción
  };

  return (
    <DivForm1>
      <DivForm2>
        <Heading level={1}>
          Crear <span className="text-primary">Algo</span>
        </Heading>
        <Form>
          <FormLabel label="Nombre">
            <InputField type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre EJ: Sapo" icon={RiPriceTag2Line} />
          </FormLabel>
          <FormLabel label="Cantidad">
            <InputField type="number" name="cantidad" value={formData.cantidad} onChange={handleChange} placeholder="Ponga un número ome Sapo" icon={RiNumbersLine} />
          </FormLabel>
          <FormLabel label="Teléfono">
            <InputField type="tel" name="telefono" value={formData.telefono} onChange={handleChange} placeholder="Ponga su número ome Sapo" icon={RiPhoneLine} />
          </FormLabel>
          <FormLabel label="Descripción">
            <TextArea name="descripcion" value={formData.descripcion} onChange={handleChange} placeholder="Describa una descripción..." icon={RiSortDesc} />
          </FormLabel>
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
          <FormLabel label="Switch">
            <Switch name="switch1" checked={formData.switch1} onChange={handleChange} />
          </FormLabel>

          <CreateCancelButtons name="Crear o Editar" onCreate={handleCreate} onCancel={handleCancel} />
        </Form>
        <span className="flex items-center justify-center gap-2">
          Así como cuando se te olvida el pasguor{" "}
          <Link to="/login" className="text-primary hover:text-gray-100 transition-colors">
            LA URL
          </Link>
        </span>
      </DivForm2>
    </DivForm1>
  );
};

export default CRUDForm;
