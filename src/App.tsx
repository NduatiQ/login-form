import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Registration from './components/registration';
import EmailBanner from './components/welcome';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';


const App: React.FC = () => {
  return (
    <MantineProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/welcome" element={<EmailBanner />}/>
      </Routes>
    </Router>
    </MantineProvider>
  );
};

export default App;