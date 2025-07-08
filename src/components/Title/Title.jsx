import React from 'react';
import Tt from './Title.module.css';

const Title = ({ title }) => {
  return (
    <div className={Tt.titlecontainer}>
      <div className={Tt.titlecontent}>
        <h3>{title}</h3>
      </div>
    </div>
  );
};

export default Title;
