import React from 'react';
import logo from './logo.svg';
import './App.css';
import ToDoList from './components/ViewTasks';
import 'bootstrap/dist/css/bootstrap.min.css';
import MenuAppBar from './components/Navbar/MenuAppBar';
import { StyledEngineProvider } from '@mui/material';
function App() {
  return (
    <StyledEngineProvider injectFirst>
      <MenuAppBar />
    </StyledEngineProvider>
  );
}

export default App;
