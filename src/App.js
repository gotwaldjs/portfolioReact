import React from 'react';
import { Content, Theme } from '@carbon/react';
import MastHead from './components/Header';
import { Route, Routes } from 'react-router-dom'; 
import Home from './content/home/Home';

function App() {
  return (
    <>
      <Theme theme="g100">
        <MastHead />
        <Content>
          <Routes> 
            <Route path="/" element={<Home />} /> 
          </Routes>
        </Content>
      </Theme>
    </>
  );
}

export default App;
