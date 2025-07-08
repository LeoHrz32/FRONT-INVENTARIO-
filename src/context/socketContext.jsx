// src/context/socketContext.js
import React, { createContext, useEffect, useContext } from 'react';
import { useTeachers } from './teachers/teachersContext';
import { useUsers } from './users/usersContext';

const SocketContext = createContext({});

export const SocketProvider = ({ children }) => {
    const { getTeachers } = useTeachers();
    const { getUsers } = useUsers();

    useEffect(() => {
        if (window.wsInitialized) return;
        window.wsInitialized = true;

        const ws = new WebSocket('ws://localhost:8200/ws');
        ws.onopen = () => console.log('✅ WS conectado a /ws');
        ws.onmessage = e => {
            console.log('📩 mensaje WS:', e.data);
            if (e.data === 'databaseChange') {
                getTeachers();
                getUsers();
            }
        };
        ws.onerror = err => console.error('❌ Error WebSocket:', err);
        ws.onclose = () => console.log('⏹ WS desconectado');

        return () => {
            ws.close();
            window.wsInitialized = false;
        };
    }, [getTeachers, getUsers]);

    return <SocketContext.Provider value={{}}>{children}</SocketContext.Provider>;
};

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) throw new Error('useSocket debe usarse dentro de <SocketProvider>');
    return context;
};
