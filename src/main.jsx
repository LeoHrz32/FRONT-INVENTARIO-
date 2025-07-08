import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserProvider } from './context/users/usersContext';
import { TeacherProvider } from './context/teachers/teachersContext';
import { TablaProvider } from './context/tablas/tablasContext';
import { SocketProvider } from './context/socketContext';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './Stores/Index';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
    <TablaProvider>
      <TeacherProvider>
        <ReduxProvider store={store}>
          <SocketProvider>
            <App />
          </SocketProvider>
        </ReduxProvider>
      </TeacherProvider>
    </TablaProvider>
  </UserProvider>
);
