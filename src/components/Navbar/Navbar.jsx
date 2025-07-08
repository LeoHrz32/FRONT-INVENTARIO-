import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RiMenuLine } from 'react-icons/ri';
import FEPIlogo from '../Image/Inicio/FEPIlogo.png';
import FEPI from '../../assets/images/FEPI.png'
import Nv from './Navbar.module.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    document.body.classList.add(Nv.BodyNvbr);
    return () => {
      document.body.classList.remove(Nv.BodyNvbr);
    };
  }, []);

  return (
    <header className={Nv.headerNv}>
      <div className={Nv.navbar}>
        <div className={Nv.logo}><a href='/Inicio'><img src={FEPI} alt="LOGO" /><img src={FEPIlogo} alt="FEPI" /></a></div>
        <ul className={Nv.links}>
          <li className={Nv.navItem}><Link to="/Inicio">Inicio</Link></li>
          <li className={Nv.navItem}><Link to="/Nosotros">Nosotros</Link></li>
          {/* <li className={Nv.navItem}><Link to="/Cursos">Cursos</Link></li> */}
          <li className={Nv.navItem}><Link to="/Alquileres">Alquileres</Link></li>
          <li className={Nv.navItem}><Link to="/Donaciones">Donaciones</Link></li>
          <li className={Nv.navItem}><Link to="/Contactanos">Contactanos</Link></li>
        </ul>
        <a href='/login' className={Nv.action_btn}>Login</a>
        <div className={Nv.toggle_btn} onClick={toggleMenu}>
          <i><RiMenuLine /></i>
        </div>
        <div className={`${Nv.dropdown_menu} ${isOpen ? Nv.open : ''}`}>
          <li className={Nv.navItem}><Link to="/Inicio">Inicio</Link></li>
          <li className={Nv.navItem}><Link to="/Nosotros">Nosotros</Link></li>
          {/* <li className={Nv.navItem}><Link to="/Cursos">Cursos</Link></li> */}
          <li className={Nv.navItem}><Link to="/Alquileres">Alquileres</Link></li>
          <li className={Nv.navItem}><Link to="/Donaciones">Donaciones</Link></li>
          <li className={Nv.navItem}><Link to="/Contactanos">Contactanos</Link></li>
          <li className={Nv.navItem}><Link to="/login" className={Nv.action_btn_responsible}>Login</Link></li>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
