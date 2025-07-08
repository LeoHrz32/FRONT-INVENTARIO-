// Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Layout = () => {
  const statusTabCart = useSelector(store => store.cart.statusTab);

  return (
    <div>
      <main className={`w-[1200px] max-w-full m-auto p-1 transform transition-transform duration-500
        ${statusTabCart ? "-translate-x-56" : ""}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
