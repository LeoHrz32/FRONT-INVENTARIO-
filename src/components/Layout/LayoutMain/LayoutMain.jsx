import { Outlet } from 'react-router-dom';
import Navbar from "../../Navbar/Navbar";
import Footer from '../../Footer/Footer';

function MainLayout() {
  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: '#fff' }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
