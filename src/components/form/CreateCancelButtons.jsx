import React from "react";
import FormButton from "./FormButton";

const CreateCancelButtons = ({ name, onCreate, onCancel }) => {
  return (
    <div className="flex space-x-4">
      <FormButton
        text={name}
        type="button"
        className="bg-primary text-white hover:bg-green-700"
        onClick={onCreate}
      />
      <FormButton
        text="Cancelar"
        type="button"
        className="bg-red-500 text-white hover:bg-red-700"
        onClick={onCancel}
      />
    </div>
  );
};

export default CreateCancelButtons;